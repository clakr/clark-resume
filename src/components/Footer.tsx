import Link from "next/link";
import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import type { IconType } from "react-icons/lib";
import { SiFrontendmentor } from "react-icons/si";

type Link = {
  href: string;
  icon: IconType;
  alt: string;
};

const links: Link[] = [
  {
    href: "https://github.com/clakr",
    icon: FaGithub,
    alt: "Github Profile",
  },
  {
    href: "https://www.linkedin.com/in/clark-tolosa/",
    icon: FaLinkedin,
    alt: "LinkedIn Profile",
  },
  {
    href: "https://www.frontendmentor.io/profile/clakr",
    icon: SiFrontendmentor,
    alt: "Frontend Mentor Profile",
  },
];

const Footer = () => {
  const [year] = useState(new Date());

  return (
    <footer className="grid place-items-center gap-2 pt-4 text-xs md:grid-cols-2 md:gap-4 lg:pt-8">
      <span className="md:justify-self-end">
        &copy;{year.getFullYear()} Clark Kenneth C. Tolosa
      </span>
      <ul className="flex items-center justify-center md:justify-self-start">
        {links.map(({ href, icon: Icon, alt }, index) => (
          <li key={index}>
            <Link href={href} target="_blank" aria-label={alt}>
              <Icon className="h-12 w-12 p-3" />
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
