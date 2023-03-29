import { Contact } from "@prisma/client";
import { FaEnvelope, FaHome, FaPhone } from "react-icons/fa";
import { useQueries } from "../pages";
import ContactItem from "./ContactItem";
import ContactList from "./ContactList";

const Aside = () => {
  return (
    <aside className="fixed right-0 top-0 hidden h-screen flex-col justify-between bg-gray-200 p-12 pb-6 dark:bg-gray-800 lg:flex lg:w-[40vw] xl:w-[25vw]">
      <div className="flex flex-col gap-y-8">
        <Contact />
        <About />
      </div>
    </aside>
  );
};

export default Aside;

const Contact = () => {
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
          <ul className="flex flex-col gap-4">
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

const About = () => {
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
