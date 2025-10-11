// import Contactussect from "../components/contactussect";
// const ContactUs = () => <Contactussect />;

// export default ContactUs;
import { Helmet } from "react-helmet-async";
import Contactussect from "../components/contactussect";

const ContactUs = () => {
  return (
    <>
      <Helmet>
        <title>PLPB Group: Connect With Us</title>
        <meta
          name="description"
          content="Get in touch with PLPB Group for inquiries, we’re here to assist you."
        />
        <meta
          name="keywords"
          content="plpb contact, contact of plpb, contact details plpb"
        />
        <link rel="canonical" href="https://plpb.in/contactus" />
      </Helmet>

      <Contactussect />
    </>
  );
};

export default ContactUs;
