import { useEffect, useState } from 'react';
import { getData } from '@/utils/helpers';
import { CustomerItem, CustomersResponse } from '@/app/api/customers/route';


export function useCustomers() {

  const [customers, setCustomers] = useState<CustomerItem[]>([]);

  useEffect(() => {
    fetchCustomers().then();

  }, []);

  const fetchCustomers = async (): Promise<CustomerItem[]> => {
    const { data } = await getData<CustomersResponse<CustomerItem[]>>({ url: '/api/customers' });

    setCustomers(data);
    return data;
  };

  return {
    customers,
    fetchCustomers
  };

}
