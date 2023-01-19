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

const AsideAdmin = () => {
  return (
    <Panel
      element="aside"
      className="col-span-1 flex w-[65px] min-w-[65px] flex-col py-6"
    >
      <div className="flex-grow space-y-6">
        <LinkAside
          goTo="about"
          icon={IoMdInformationCircleOutline}
          activeIcon={IoMdInformationCircle}
        />
        <LinkAside
          goTo="contacts"
          icon={RiContactsBook2Line}
          activeIcon={RiContactsBook2Fill}
        />
        <LinkAside
          goTo="organizations"
          icon={MdOutlineGroups}
          activeIcon={MdGroups}
        />
        <LinkAside
          goTo="educations"
          icon={MdOutlineSchool}
          activeIcon={MdSchool}
        />
        <LinkAside
          goTo="experiences"
          icon={RiSuitcaseLine}
          activeIcon={RiSuitcaseFill}
        />
        <LinkAside
          goTo="leaderships"
          icon={AiOutlineStar}
          activeIcon={AiFillStar}
        />
        <LinkAside
          goTo="miscellaneous"
          icon={HiOutlineCog}
          activeIcon={HiCog}
        />
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
          <BiLogOut size={24} />
        </button>
      </div>
    </Panel>
  );
};

type LinkAsideProps = {
  goTo: string;
  icon: IconType;
  activeIcon: IconType;
};

const LinkAside = ({ goTo, icon, activeIcon }: LinkAsideProps) => {
  const router = useRouter();
  const isActive = router.asPath === `/a/${goTo}`;

  const Icon = isActive ? activeIcon : icon;

  return (
    <Link href={`/a/${goTo}`} className="grid place-items-center">
      <Icon size={24} />
    </Link>
  );
};

export default AsideAdmin;
