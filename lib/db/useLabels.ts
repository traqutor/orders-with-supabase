import { useEffect, useState } from 'react';
import { Tables } from '@/types_db';
import { getLabels } from '@/lib/db/labels';
import { deleteData, getData, postData, putData } from '@/utils/helpers';
import { NewLabel } from '@/lib/db/schema';

export type Label = Tables<'labels'>;

export function useLabels() {
  const url = '/api/labels';
  const [labels, setLabels] = useState<Label[]>([]);

  useEffect(() => {
    fetchLabels().then();

  }, []);

  const fetchLabels = async () => {
    const { data, error } = await getData({ url });

    if (error) throw new Error(`Get list of Labels Error: ${JSON.stringify(error)}`);

    setLabels(data);
  };

  const createLabel = async (label: NewLabel) => {
    let { data, error } = await postData({ url, data: label });

    if (error) throw new Error(`Create Label: ${label} Error: ${JSON.stringify(error)}`);

    return data;
  };

  const updateLabel = async (label: Label) => {
    let { data, error } = await putData({ url, data: label });

    if (error) throw new Error(`Update Label: ${label} Error: ${JSON.stringify(error)}`);

    return data;
  };

  const deleteLabel = async (label: Label) => {
    let { data, error } = await deleteData({ url, data: label });

    if (error) throw new Error(`Delete Label: ${label} Error: ${JSON.stringify(error)}`);

    return data;
  };

  return {
    labels,
    createLabel,
    getLabels,
    updateLabel,
    deleteLabel,
  };

}
