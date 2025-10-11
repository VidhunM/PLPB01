// import Appointmentssect from "../components/appointmentssect";

// const Appointments = () => <Appointmentssect />;

// export default Appointments; 
import { Helmet } from "react-helmet-async";
import Appointmentssect from "../components/appointmentssect";

const Appointments = () => {
  return (
    <>
      <Helmet>
        <title>PLPB Group: Book a Visit Today</title>
        <meta
          name="description"
          content="Schedule your appointment with PLPB Group for expert project guidance and personalised consultations."
        />
        <meta
          name="keywords"
          content="plpb appointments, book plpb appointment"
        />
        <link rel="canonical" href="https://plpb.in/appointments" />
      </Helmet>

      <Appointmentssect />
    </>
  );
};

export default Appointments;
