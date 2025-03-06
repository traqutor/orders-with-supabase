import { useEffect, useState } from 'react';
import { deleteData, getData, postData, putData } from '@/utils/helpers';
import { Label, NewLabel } from '@/lib/db/schema';


export function useLabels() {
  const url = '/api/labels';
  const [labels, setLabels] = useState<Label[]>([]);

  useEffect(() => {
    fetchLabels().then();

  }, []);

  const fetchLabels = async () => {
    const response = await getData<Label[]>({ url });

    if (response.status !== 'success') throw new Error(`Get list of Labels Error: ${JSON.stringify(response)}`);

    setLabels(response.data);
  };

  const createLabel = async (label: NewLabel) => {
    const response = await postData({ url, data: label });

    if (response.status !== 'success') throw new Error(`Create Label: ${label} Error: ${JSON.stringify(response)}`);

    return response.data;
  };


  const updateLabel = async (label: Label) => {
    const response = await putData({ url, data: label });

    if (response.status !== 'success') throw new Error(`Update Label: ${label} Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  const deleteLabel = async (label: Label) => {
    const response = await deleteData({ url, data: label });

    if (response.status !== 'success') throw new Error(`Delete Label: ${label} Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  return {
    labels,
    createLabel,
    fetchLabels,
    updateLabel,
    deleteLabel
  };

}
