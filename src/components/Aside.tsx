import { FaEnvelope, FaHome, FaPhone } from "react-icons/fa";
import { api } from "../utils/api";
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
  const { data } = api.contact.getAll.useQuery(),
    address = data?.find(({ type }) => type === "ADDRESS"),
    email = data?.find(({ type }) => type === "EMAIL"),
    phone = data?.find(({ type }) => type === "PHONE");

  return (
    <>
      {data && (
        <ContactItem title="Contact">
          <ul className="flex flex-col gap-4">
            {address && (
              <ContactList icon={<FaHome />} content={address.description} />
            )}
            {email && (
              <ContactList icon={<FaEnvelope />} content={email.description} />
            )}
            {phone && (
              <ContactList icon={<FaPhone />} content={phone.description} />
            )}
          </ul>
        </ContactItem>
      )}
    </>
  );
};

const About = () => {
  const { data } = api.about.getAll.useQuery();

  return (
    <>
      {data && (
        <ContactItem title="About">
          {data.map(({ id, description }) => (
            <p key={id}>{description}</p>
          ))}
        </ContactItem>
      )}
    </>
  );
};
