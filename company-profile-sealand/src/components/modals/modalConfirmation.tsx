import XIcon from "@/icon/x-icon";
type confirmationProps = {
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
};

export const ModalConfirmation = ({
  title,
  message,
  onClose,
  onConfirm,
isLoading = false,
}: confirmationProps) => {
  return (
    <div className="transition-transform duration-300 ease-in-out  fixed z-50 h-full bg-black/30 inset-0 w-full flex items-center justify-center p-4 font-montserrat">
      <div
        className="relative w-full bg-white rounded-lg max-w-md p-6"
      >
        <XIcon
          className=" text-primary absolute top-5 right-5 z-20 size-5"
          onClick={() => onClose()}
        />
        <div className="flex flex-col gap-5 items-center">
         <h3 className="text-h3 font-semibold text-primary">
           {title}
         </h3>
         <p className="text-body-l text-center text-neutral-black">{message}</p>
       </div>

       <div className="w-full flex gap-3 mt-5 ">
         <button onClick={onClose} className="bg-red-600 flex-1 py-2 px-4 rounded-lg text-white" disabled={isLoading}>
           Tidak
         </button>
         <button onClick={onConfirm} className="bg-green-600 flex-1 py-2 px-4 rounded-lg text-white" disabled={isLoading}>
              {isLoading ? 'Memproses...' : 'Ya'}
         </button>
       </div>
      </div>
    </div>
  );
};
