import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import type { IconType } from "react-icons/lib";

type Link = {
  href: string;
  icon: IconType;
};

const Footer = () => {
  const links: Link[] = [
    {
      href: "https://github.com/clakr",
      icon: FaGithub,
    },
    {
      href: "https://www.linkedin.com/in/clark-tolosa/",
      icon: FaLinkedin,
    },
  ];

  return (
    <footer className="flex items-center justify-center gap-4 pt-4 text-xs lg:pt-8">
      <h1>Clark Kenneth C. Tolosa</h1>
      <span>•</span>
      <h2>Web Developer</h2>
      <span>•</span>
      <ul className="flex items-center gap-2 text-base">
        {links.map(({ href, icon: Icon }, index) => (
          <li key={index}>
            <Link href={href} target="_blank">
              <Icon />
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
