import { useEffect, useState } from 'react';
import { Tables } from '@/types_db';
import { getLabels } from '@/lib/db/labels';

export type Label = Tables<'labels'>;

export function useLabels() {

  const [labels, setLabels] = useState<Label[]>([]);


  useEffect(() => {
    fetchLabels().then();

  }, []);

  const fetchLabels = async () => {
    const { data, error } = await getLabels();

    if (error) throw new Error(`Get list of Labels error: ${JSON.stringify(error)}`);

    setLabels(data);
  };

  return {

    labels,
    getLabels
  };

}
