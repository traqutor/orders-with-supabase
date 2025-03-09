import { deleteData, getData, postData, putData } from '@/utils/helpers';
import { Label, NewLabel } from '@/lib/db/schema';


export function useLabels() {
  const url = '/api/dashboard/labels';

  const fetchLabels = async () => {
    const response = await getData<Label[]>({ url });

    if (response.error) throw new Error(`Get list of Labels Error: ${JSON.stringify(response)}`);


  };

  const createLabel = async (label: NewLabel) => {
    const response = await postData({ url, data: label });

    if (response.error) throw new Error(`Create Label: ${label} Error: ${JSON.stringify(response)}`);

    return response.data;
  };


  const updateLabel = async (label: Label) => {
    const response = await putData({ url, data: label });

    if (response.error) throw new Error(`Update Label: ${label} Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  const deleteLabel = async (label: Label) => {
    const response = await deleteData({ url, data: label });

    if (response.error) throw new Error(`Delete Label: ${label} Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  return {
    createLabel,
    fetchLabels,
    updateLabel,
    deleteLabel
  };

}
