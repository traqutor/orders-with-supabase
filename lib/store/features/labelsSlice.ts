import { createSlice, nanoid } from '@reduxjs/toolkit';
import { Label } from '@/lib/db/schema';


interface LabelsState {
  loading: boolean;
  labels: Label[];
}

interface PayloadAction {
  payload: Label;
}

const labelsSlice = createSlice({
  name: 'labels',
  initialState: {
    loading: false,
    labels: []
  } satisfies LabelsState as LabelsState,
  reducers: (create) => ({
    deleteLabel: create.reducer<number>((state, action) => {
      state.labels.splice(action.payload, 1);
    }),
    addLabel: create.preparedReducer(
      (title: string, color_hex: string, icon_name: string): PayloadAction => {
        const id = nanoid();
        return { payload: { id, title, color_hex, icon_name } };
      },

      (state, action: PayloadAction) => {
        state.labels.push(action.payload);
      }
    ),
    fetchLabels: create.asyncThunk(

      async (id: string, thunkApi) => {
        const res = await fetch(`myApi/todos?id=${id}`);
        return (await res.json()) as Label;
      },

      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
        },
        fulfilled: (state, action: PayloadAction) => {
          state.loading = false;
          state.labels.push(action.payload);
        }
      }
    )
  })
});

export const { deleteLabel, addLabel, fetchLabels } = labelsSlice.actions;