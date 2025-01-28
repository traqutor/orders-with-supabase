import { useEffect, useState } from 'react';
import { Tables } from '@/types_db';
import { getLabels } from '@/lib/db/labels';

export type Label = Tables<'labels'>;

export function useLabels() {

  const [labels, setLabels] = useState<Label[]>([]);


  useEffect(() => {
    fetchLabels().then();

    return () => {
      console.log('Labels clean up', labels);
    };
  }, []);

  const fetchLabels = async () => {
    const { data, error } = await getLabels();

    if (error) throw new Error(`Get list of Labels error:`, error);

    setLabels(data);
  };

  return {

    labels,
    getLabels
  };

}
