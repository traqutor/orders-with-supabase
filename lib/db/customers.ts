import { createClient } from '@/utils/supabase/client';
import { Customer } from '@/lib/db/schema';


const supabase = createClient();


async function getCustomerById(
  customerId: string
): Promise<{ customer: Customer }> {
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


export { getCustomerById };
