import { useEffect, useState } from 'react';
import { Tables } from '@/types_db';
import { getListQuery } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/client';

export type Label = Tables<'labels'>;

export function useLabels() {

  const [labels, setLabels] = useState<Label[]>([]);


  useEffect(() => {
    getLabels();

    return () => {
      console.log('cleanup');

    };
  }, []);

  const getLabels = async () => {
    const db = createClient();
    const labels = await getListQuery(db, 'labels') as Label[];

    setLabels(labels);
  };

  return {

    labels,
    getLabels
  };

}
