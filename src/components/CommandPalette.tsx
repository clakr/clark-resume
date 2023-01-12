import { Dialog, Transition } from "@headlessui/react";
import type { ForwardedRef } from "react";
import { Fragment, forwardRef, useEffect, useRef, useState } from "react";
import { FaFileExport, FaGithub, FaInfoCircle, FaMoon } from "react-icons/fa";
import type { IconType } from "react-icons/lib";
import { MdOutlineClose } from "react-icons/md";

type Button = {
  text: string;
  icon: IconType;
  isFocused?: boolean;
};

const buttons: Button[] = [
  {
    icon: FaMoon,
    text: "Dark Mode",
  },
  {
    icon: FaFileExport,
    text: "Export to PDF",
  },
  {
    icon: FaInfoCircle,
    text: "Project Information",
  },
  {
    icon: FaGithub,
    text: "Sign in with GitHub",
    isFocused: true,
  },
];

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const initialFocusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/") {
        setIsOpen((prevState) => !prevState);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [setIsOpen]);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="text-slate-900"
        as="div"
        initialFocus={initialFocusRef}
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
                    Command Palette
                  </Dialog.Title>

                  <button
                    type="button"
                    className="opacity-75"
                    onClick={() => setIsOpen(false)}
                  >
                    <MdOutlineClose className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {buttons.map(({ text, icon, isFocused }, index) => (
                    <Button
                      key={index}
                      text={text}
                      icon={icon}
                      ref={isFocused ? initialFocusRef : null}
                    />
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const Button = forwardRef(
  ({ text, icon: Icon }: Button, ref: ForwardedRef<HTMLButtonElement>) => (
    <button
      className="flex items-center gap-2 rounded-lg bg-slate-800 p-4 hover:bg-slate-700 focus:bg-slate-700"
      ref={ref}
    >
      <Icon className="h-6 w-6" />
      <span className="flex-1">{text}</span>
    </button>
  )
);

Button.displayName = "Button";

export default CommandPalette;
