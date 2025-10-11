import { useState, FormEvent } from 'react';
import { Header } from './Header';
import { useNavigate } from 'react-router-dom';

const Appointmentssect = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    person: '',
    purpose: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://naturesunshine.co/plpb/Api/booking_request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/thankyou');
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          person: '',
          purpose: '',
        });
      } else {
        alert('Failed to book appointment.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while booking the appointment.');
    }
  };

  return (
    <div>
      <Header />
      {/* Banner */}
      <div style={{ width: '100%', height: '450px', overflow: 'hidden', position: 'relative' }}>
        <img
          src="/assets/Images/appmt.png"
          alt="Appointments Banner"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      {/* Content Section */}
      <div style={{ background: '#fbf9f6', minHeight: '60vh', padding: '3rem 0' }}>
        <h1
          className="appt-heading"
          style={{
            fontSize: '2.5rem',
            fontWeight: 500,
            marginBottom: '2.5rem',
            color: '#222',
            textAlign: 'left',
            marginLeft: '8%',
          }}
        >
          Book Appointments
        </h1>

        <form
          className="appt-form"
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem 2%',
          }}
          onSubmit={handleSubmit}
        >
          <input name="name" type="text" placeholder="Name" value={formData.name} onChange={handleChange} style={inputStyle} className="appt-input"  required/>
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} style={inputStyle} className="appt-input"  required/>
          <input name="phone" type="text" placeholder="Phone Number" value={formData.phone} onChange={handleChange} style={inputStyle} className="appt-input"  required/>
          <input name="date" type="date" value={formData.date} onChange={handleChange} style={inputStyle} className="appt-input" required/>
          <input name="time" type="time" value={formData.time} onChange={handleChange} style={inputStyle} className="appt-input" required/>
          <select name="person" value={formData.person} onChange={handleChange} style={inputStyle} className="appt-input" required>
            <option value="">Person to Meet</option>
            <option value="Mr. Sanjiv Singla">Mr. Sanjiv Singla</option>
            <option value="Mr. Sumit Singla">Mr. Sumit Singla</option>
            <option value="Mr. Lohit Bansal">Mr. Lohit Bansal</option>
            <option value="Front Desk">Front Desk</option>
          </select>
          <input
            name="purpose"
            type="text"
            placeholder="Purpose"
            value={formData.purpose}
            onChange={handleChange}
            style={{ ...inputStyle, flex: '1 1 94%' }}
            className="appt-input"
          />

          <button
            type="submit"
            className="appt-button"
            style={{
              background: '#b2a557',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '0.9rem 2.5rem',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: '1.5rem',
              alignSelf: 'flex-start',
            }}
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  flex: '1 1 45%',
  minWidth: 250,
  padding: '1rem',
  marginBottom: '1.5rem',
  border: 'none',
  borderRadius: 4,
  background: '#ece9e2',
  fontSize: '1.1rem',
};

export default Appointmentssect;