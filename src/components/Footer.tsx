import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import type { IconType } from "react-icons/lib";

type Link = {
  href: string;
  icon: IconType;
  alt: string;
};

const Footer = () => {
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
  ];

  return (
    <footer className="flex items-center justify-center gap-4 pt-4 text-xs lg:pt-8">
      <h1>Clark Kenneth C. Tolosa</h1>
      <span>•</span>
      <h2>Web Developer</h2>
      <span>•</span>
      <ul className="flex items-center text-base">
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
