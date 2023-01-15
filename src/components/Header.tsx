import { Disclosure, Transition } from "@headlessui/react";
import type { Contact } from "@prisma/client";
import { FaChevronDown, FaEnvelope, FaHome, FaPhone } from "react-icons/fa";
import { useQueries } from "../pages";
import ContactItem from "./ContactItem";
import ContactList from "./ContactList";

const Header = () => {
  return (
    <Disclosure>
      {({ open }) => (
        <header className="sticky top-0 z-10 flex w-screen flex-col gap-4 bg-slate-200 p-6 pb-0 transition-all dark:bg-slate-800 dark:text-slate-50 lg:hidden">
          <article>
            <h1 className="text-3xl font-bold leading-6">
              Clark Kenneth C. Tolosa
            </h1>
            <h2 className="text-xl opacity-75">Web Developer</h2>
          </article>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform opacity-0"
            enterTo="transform opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform opacity-100"
            leaveTo="transform opacity-0"
          >
            <Disclosure.Panel className={`${open && "space-y-6"}`}>
              <Contacts />
              <Abouts />
            </Disclosure.Panel>
          </Transition>

          <Disclosure.Button
            className="grid place-items-center p-2"
            aria-label="Expand Button"
          >
            <FaChevronDown
              className={
                open ? "rotate-180 animate-pulse" : "rotate-0 animate-bounce"
              }
            />
          </Disclosure.Button>
        </header>
      )}
    </Disclosure>
  );
};

export default Header;

const Contacts = () => {
  const data = useQueries();

  let address: Contact | undefined = undefined,
    email: Contact | undefined = undefined,
    phone: Contact | undefined = undefined;

  if (data) {
    address = data?.contact.find(({ type }) => type === "ADDRESS");
    phone = data?.contact.find(({ type }) => type === "PHONE");
    email = data?.contact.find(({ type }) => type === "EMAIL");
  }

  return (
    <>
      {data && (
        <ContactItem title="Contact">
          <ul className="flex flex-col gap-2">
            {address && (
              <ContactList icon={<FaHome />} content={address.desc} />
            )}
            {email && (
              <ContactList icon={<FaEnvelope />} content={email.desc} />
            )}
            {phone && <ContactList icon={<FaPhone />} content={phone.desc} />}
          </ul>
        </ContactItem>
      )}
    </>
  );
};

const Abouts = () => {
  const data = useQueries();

  return (
    <>
      {data && (
        <ContactItem title="About">
          {data.about.map(({ id, desc }) => (
            <p key={id}>{desc}</p>
          ))}
        </ContactItem>
      )}
    </>
  );
};
