import { signIn, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import type { Dispatch, ForwardedRef, SetStateAction } from "react";
import { forwardRef, useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { FaFileExport, FaGithub, FaInfoCircle, FaMoon } from "react-icons/fa";
import type { IconType } from "react-icons/lib";
import { useQueries } from "../pages";
import usePalette from "../utils/usePalette";
import Modal from "./Modal";
import ProjectInformation from "./ProjectInformation";

type Button = {
  text: string;
  icon: IconType;
  isFocused?: boolean;
};

const buttons: Button[] = [
  {
    icon: FaMoon,
    text: "Dark Mode",
    isFocused: true,
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
  const paletteState = usePalette();
  const infoState = useState(false);
  const { data: session } = useSession();

  const initialFocusRef = useRef<HTMLButtonElement>(null);

  return (
    <Modal
      modalState={paletteState}
      initialFocus={initialFocusRef}
      title="Command Palette"
    >
      <div className="flex flex-col gap-2 opacity-75">
        {(session ? buttons.slice(0, 3) : buttons).map(
          ({ isFocused, ...rest }, index) => (
            <Button
              key={index}
              ref={isFocused ? initialFocusRef : null}
              infoState={infoState}
              {...rest}
            />
          )
        )}
      </div>

      <ProjectInformation state={infoState} />
    </Modal>
  );
};

const Button = forwardRef(
  (
    {
      text,
      icon: Icon,
      infoState: [, setIsInfoOpen],
    }: Button & { infoState: [boolean, Dispatch<SetStateAction<boolean>>] },
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const [isLoading, setIsLoading] = useState(false);
    let onClick: (() => void) | undefined = undefined;

    const { theme, setTheme, systemTheme } = useTheme();
    const data = useQueries();

    switch (text) {
      case "Dark Mode":
        onClick = () => {
          switch (theme) {
            case "system":
              if (systemTheme === "dark") {
                setTheme("light");
              } else {
                setTheme("dark");
              }
              break;

            case "dark":
              setTheme("light");
              break;

            case "light":
              setTheme("dark");
              break;

            default:
              setTheme("dark");
              break;
          }
        };
        break;

      case "Export to PDF":
        onClick = async () => {
          setIsLoading(true);

          await fetch("https://pdfgen.app/api/generate?templateId=e4514cc", {
            method: "POST",
            body: JSON.stringify({ data }),
            headers: {
              "Content-Type": "application/json",
              api_key: "oqO22WUBsqgc6Q1QVHzjV",
            },
          })
            .then((res) => res.blob())
            .then((blob) => {
              const fileUrl = window.URL.createObjectURL(blob);
              const aLink = document.createElement("a");
              aLink.href = fileUrl;
              aLink.download = "TOLOSA_Resume.pdf";
              aLink.click();
            })
            .finally(() => setIsLoading(false));
        };
        break;

      case "Project Information":
        onClick = () => setIsInfoOpen(true);

        break;

      case "Sign in with GitHub":
        onClick = () => {
          setIsLoading(true);
          signIn("github", {
            callbackUrl: "/a/about",
          });
        };
        break;

      default:
        break;
    }

    return (
      <button
        className={`dark:focus:bg-slate -700 flex items-center gap-2 rounded-xl bg-slate-200 p-4 hover:bg-slate-300 focus:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 ${
          isLoading && "opacity-50"
        }`}
        ref={ref}
        onClick={onClick}
        disabled={isLoading}
        type="button"
      >
        {isLoading ? (
          <AiOutlineLoading className="h-6 w-6 flex-1 animate-spin" />
        ) : (
          <>
            <Icon className="h-6 w-6" />
            <span className="flex-1">{text}</span>
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default CommandPalette;
