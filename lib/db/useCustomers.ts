import { useEffect, useState } from 'react';
import { Tables } from '@/types_db';
import { getAllCustomers } from '@/lib/db/customers';

export type Customer = Tables<'customers'>;

export function useCustomers() {

  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetchCustomers().then();

  }, []);

  const fetchCustomers = async ():Promise<Customer[]> => {
    const { customers } = await getAllCustomers();
    setCustomers(customers);

    return customers;
  };

  return {
    customers,
    fetchCustomers
  };

}
