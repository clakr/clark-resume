import { Dialog, Transition } from "@headlessui/react";
import type {
  Dispatch,
  PropsWithChildren,
  RefObject,
  SetStateAction,
} from "react";
import { Fragment } from "react";
import { MdOutlineClose } from "react-icons/md";

const Modal = ({
  children,
  state: [isOpen, setIsOpen],
  initialFocus,
  title,
}: PropsWithChildren<{
  state: [boolean, Dispatch<SetStateAction<boolean>>];
  initialFocus?: RefObject<HTMLButtonElement>;
  title: string;
}>) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="text-slate-900"
        as="div"
        initialFocus={initialFocus}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out dura/tion-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-10 bg-black bg-opacity-25 backdrop-blur" />
        </Transition.Child>

        <div className="fixed inset-0 z-20 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform space-y-4 rounded-2xl bg-slate-50 p-6 text-left align-middle shadow-xl transition-all dark:bg-slate-900 dark:text-slate-50">
                <div className="flex items-center justify-between pb-4">
                  <Dialog.Title
                    as="h2"
                    className="text-xl font-medium leading-6"
                  >
                    {title}
                  </Dialog.Title>

                  <button
                    type="button"
                    className="opacity-75"
                    onClick={() => setIsOpen(false)}
                  >
                    <MdOutlineClose className="h-6 w-6" />
                  </button>
                </div>

                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
