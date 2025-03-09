import { useEffect, useState } from 'react';
import { deleteData, getData, postData, putData } from '@/utils/helpers';
import { Customer } from '@/lib/db/schema';
import { CustomerItem } from '@/app/api/dashboard/customers/route';


export function useCustomers() {
  const url = '/api/dashboard/customers';
  const [customers, setCustomers] = useState<CustomerItem[] | undefined>([]);

  useEffect(() => {
    fetchCustomers();

  }, []);

  const fetchCustomers = async (): Promise<CustomerItem[]> => {
    const response = await getData<CustomerItem[]>({ url });

    if (response.error) throw new Error(`Get list of Customers Error: ${JSON.stringify(response)}`);

    setCustomers(response.data);

    return response.data || [];
  };

  const createCustomer = async (customer: Customer): Promise<Customer> => {
    const response = await postData({ url, data: customer });

    if (response.error) throw new Error(`Create Customer: ${customer} Error: ${JSON.stringify(response)}`);

    return response.data as Customer;
  };

  const updateCustomer = async (customer: Customer) => {
    const response = await putData({ url: `${url}/${customer.id}`, data: customer });

    if (response.error) throw new Error(`Update Customer: ${customer} Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  const deleteCustomer = async (customer: Customer) => {
    const response = await deleteData({ url: `${url}/${customer.id}` });

    if (response.error) throw new Error(`Delete Customer: ${customer} Error: ${JSON.stringify(response)}`);

    return response.data;
  };


  return {
    customers,
    createCustomer,
    deleteCustomer,
    fetchCustomers,
    updateCustomer
  };

}
