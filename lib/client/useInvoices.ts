import { useState } from 'react';
import { deleteData, getData, postData, putData } from '@/utils/helpers';
import { Invoice, NewInvoice, NewShipment, Shipment } from '@/lib/db/schema';


export function useInvoices() {
  const url = '/api/dashboard/invoices';
  const [items, setItems] = useState<Invoice[]>([]);


  const fetchInvoice = async (invoiceId: string) => {
    const response = await getData<Invoice[]>({ url: `${url}/${invoiceId}` });

    if (response.error) throw new Error(`Get list of Invoices Error: ${JSON.stringify(response)}`);

    setItems(response.data);

    return response.data[0];
  };

  const createInvoice = async (payload: NewInvoice): Promise<Invoice[]> => {
    const response = await postData({ url, data: payload });

    if (response.error) throw new Error(`Create Invoice: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data as unknown as Invoice[];
  };


  const updateInvoice = async (payload: Invoice) => {
    const response = await putData({ url: `${url}/${payload.id}`, data: payload });

    if (response.error) throw new Error(`Update Invoice: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  const deleteInvoice = async (payload: Invoice) => {
    const response = await deleteData({ url: `${url}/${payload.id}`, data: payload });

    if (response.error) throw new Error(`Delete Invoice: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data;
  };


  return {
    invoices: items,
    createInvoice,
    fetchInvoice,
    deleteInvoice,
    updateInvoice
  };

}
