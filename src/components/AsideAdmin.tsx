import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { HiCog, HiOutlineCog } from "react-icons/hi";
import {
  IoMdInformationCircle,
  IoMdInformationCircleOutline,
} from "react-icons/io";
import type { IconType } from "react-icons/lib";
import {
  MdGroups,
  MdOutlineGroups,
  MdOutlineSchool,
  MdSchool,
} from "react-icons/md";
import {
  RiContactsBook2Fill,
  RiContactsBook2Line,
  RiSuitcaseFill,
  RiSuitcaseLine,
} from "react-icons/ri";
import Panel from "./Panel";

type Links = {
  goTo: string;
  icon: IconType;
  activeIcon: IconType;
};

const links: Links[] = [
  {
    goTo: "about",
    icon: IoMdInformationCircleOutline,
    activeIcon: IoMdInformationCircle,
  },
  {
    goTo: "contact",
    icon: RiContactsBook2Line,
    activeIcon: RiContactsBook2Fill,
  },
  {
    goTo: "organization",
    icon: MdOutlineGroups,
    activeIcon: MdGroups,
  },
  {
    goTo: "education",
    icon: MdOutlineSchool,
    activeIcon: MdSchool,
  },
  {
    goTo: "experience",
    icon: RiSuitcaseLine,
    activeIcon: RiSuitcaseFill,
  },
  {
    goTo: "leadership",
    icon: AiOutlineStar,
    activeIcon: AiFillStar,
  },
  {
    goTo: "miscellaneous",
    icon: HiOutlineCog,
    activeIcon: HiCog,
  },
];

const AsideAdmin = () => {
  return (
    <Panel
      element="aside"
      className="col-span-1 flex w-[65px] min-w-[65px] flex-col py-6"
    >
      <div className="flex-grow space-y-6">
        {links.map((props, index) => (
          <LinkAside key={index} {...props} />
        ))}
      </div>
      <div className="flex-shrink space-y-6">
        {/* <button
          className="flex w-full items-center justify-center"
          onClick={handleOnClick}
        >
          {handleIcon()}
        </button> */}
        <button
          className="flex w-full items-center justify-center"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <BiLogOut className="h-6 w-6" />
        </button>
      </div>
    </Panel>
  );
};

const LinkAside = ({ goTo, icon, activeIcon }: Links) => {
  const router = useRouter();
  const isActive = router.asPath === `/a/${goTo}`;

  const Icon = isActive ? activeIcon : icon;

  return (
    <Link href={`/a/${goTo}`} className="grid place-items-center">
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default AsideAdmin;
