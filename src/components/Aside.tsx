import { Contact } from "@prisma/client";
import { FaEnvelope, FaHome, FaPhone } from "react-icons/fa";
import { useQueries } from "../pages";
import ContactItem from "./ContactItem";
import ContactList from "./ContactList";

const Aside = () => {
  return (
    <section className="hidden p-12 backdrop-invert-[.1] lg:col-span-2 lg:block xl:col-span-1">
      <div className="sticky top-12 flex flex-col gap-8">
        <Contact />
        <About />
      </div>
    </section>
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
