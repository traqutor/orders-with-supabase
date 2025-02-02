import React, { forwardRef } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Delete } from 'lucide-react';

interface ConfirmDialogProps {
}

export interface ConfirmDialogRef {
  triggerLabel: string;
  title: string;
  triggerIcon?: React.ReactNode;
  description: string;
  cancelLabel?: string;
  submitLabel?: string;

  onClickSubmit: () => void;
}


const ConfirmDialog = forwardRef<ConfirmDialogProps, ConfirmDialogRef>((props, ref) => {
  const { title, description, triggerLabel, triggerIcon, cancelLabel, submitLabel, onClickSubmit } = props;

  const handleOnClick = () => {

    onClickSubmit();
  };


  return <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <button
        className="group relative flex gap-2 h-[35px] font-medium select-none items-center rounded text-[13px] leading-none cursor-pointer outline-none hover:text-green-800 ">
        {triggerIcon ? triggerIcon : <Delete />} {triggerLabel}
      </button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
      <AlertDialog.Content
        className="fixed bg-card border left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md p-[25px] shadow-xl focus:outline-none data-[state=open]:animate-contentShow">
        <AlertDialog.Title className="m-0 text-[17px] font-medium text-mauve12">
          {title}
        </AlertDialog.Title>
        <AlertDialog.Description className="mb-5 mt-[15px] text-[15px] leading-normal text-mauve11">
          {description}
        </AlertDialog.Description>
        <div className="flex justify-end gap-[25px]">
          <AlertDialog.Cancel asChild>
            <button
              className="inline-flex h-[35px] items-center justify-center rounded bg-mauve4 px-[15px] font-medium leading-none text-mauve11 outline-none outline-offset-1 hover:bg-mauve5 focus-visible:outline-2 focus-visible:outline-mauve7 select-none">
              {cancelLabel || 'Cancel'}
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button
              onClick={handleOnClick}
              className="inline-flex h-[35px] items-center justify-center rounded bg-red-400 px-[15px] font-medium leading-none text-red-50 outline-none outline-offset-1 hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-red-700 select-none">
              {submitLabel || 'Ok'}
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>;
});

export default ConfirmDialog;
