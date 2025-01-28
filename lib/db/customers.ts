import { createClient } from '@/utils/supabase/client';
import { PRODUCTS_PER_PAGE } from '@/lib/utils';
import { QueryData } from '@supabase/supabase-js';
import { Tables } from '@/types_db';

const supabase = createClient();


const customersListQuery = (offset: number, limit: number = PRODUCTS_PER_PAGE, search?: string) =>
  search ? supabase
      .from('customers')
      .select(
        `*,
        customers_types(*)
       `
      )
      .textSearch('name', search)
      .order('name', { ascending: false })
      .range(offset, offset + limit - 1)
    :
    supabase
      .from('customers')
      .select(
        `*,
        customers_types(*)
       `
      )
      .order('name', { ascending: false })
      .range(offset, offset + limit - 1);


async function getCustomers(
  search: string,
  offset: number
): Promise<{ customers: any[]; newOffset: number; totalOrdersCounter: number }> {
  const { count } = await supabase
    .from('customers')
    .select(
      `*`, { count: 'exact', head: true }
    );

  const { data, error } = await customersListQuery(offset, 5, search);

  if (error) throw new Error(`Get list of Customers error:`, error);

  const customersList: any = data as QueryData<any>;

  if (data) {
    return {
      customers: customersList,
      newOffset: offset + PRODUCTS_PER_PAGE - 1,
      totalOrdersCounter: count || 0
    };
  }

  if (!data && offset === null) {
    return { customers: data, newOffset: 0, totalOrdersCounter: 0 };
  }

  const totalOrdersCounter = count || 0;
  const newOffset = offset + PRODUCTS_PER_PAGE;

  return {
    customers: data,
    newOffset,
    totalOrdersCounter
  };
}

async function getCustomerById(
  customerId: string
): Promise<{ customer: any }> {
  const { data, error } = await supabase
    .from('customers')
    .select(
      `*`
    ).eq('id', customerId)
    .single();


  if (error) throw new Error(`Get Customers by Id error:`, error);


  return {
    customer: data
  };

}

const postCustomer = async (payload: Tables<'customers'>) => {
  return supabase
    .from('customers')
    .insert(payload)
    .select();
};

const putCustomer = async (payload: Tables<'customers'>) => {
  console.log('update as:',payload);
  return supabase
    .from('customers')
    .update({...payload})
    .eq('id', payload.id)
    .select();
};

const deleteCustomer = async (payload: Tables<'customers'>) => {

  return supabase
    .from('customers')
    .delete()
    .eq('id', payload.id)
    .select();
};


export { getCustomers, getCustomerById, postCustomer, putCustomer, deleteCustomer };
