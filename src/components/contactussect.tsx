import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactUsSect = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    interest: '',
    message: '',
    captcha: '',
  });

  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [ipAddress, setIpAddress] = useState('');
  const [leadSource, setLeadSource] = useState('Website');
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ prevent double click

  function generateCaptcha() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let cap = '';
    for (let i = 0; i < 4; i++) {
      cap += chars[Math.floor(Math.random() * chars.length)];
    }
    return cap;
  }

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setFormData((prev) => ({ ...prev, captcha: '' }));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getLeadSource = () => {
    const ref = document.referrer;
    if (ref.includes('google')) return 'Google';
    if (ref.includes('bing')) return 'Bing';
    if (ref.includes('facebook')) return 'Facebook';
    if (ref) return new URL(ref).hostname;
    return 'Direct / Website';
  };

  useEffect(() => {
    setLeadSource(getLeadSource());

    fetch('https://api.ipify.org/?format=json')
      .then((res) => res.json())
      .then((data) => setIpAddress(data.ip || 'N/A'))
      .catch(() => setIpAddress('N/A'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // ✅ prevent multiple clicks
    setIsSubmitting(true);

    if (formData.captcha.toLowerCase() !== captcha.toLowerCase()) {
      alert('❌ Captcha is incorrect.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://email-send-l0vm.onrender.com/send-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          interestedIn: formData.interest,
          message: formData.message,
          ip: ipAddress,
          source: leadSource,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert('✅ Message sent successfully!');
        window.location.reload(); // ✅ reload to reset form & button
      } else {
        alert('❌ Failed to send message.');
        setIsSubmitting(false);
      }
    } catch (error) {
      alert('⚠️ Error occurred while sending the message.');
      setIsSubmitting(false);
    }
  };

  const contactCards = [
    {
      label: 'Call Us',
      icon: <Phone size={32} color="#222" />,
      value: '‪+91-92094-93094‬',
    },
    {
      label: 'Email Us',
      icon: <Mail size={32} color="#222" />,
      value: 'contact@plpbinfra.com',
    },
    {
      label: 'Address',
      icon: <MapPin size={32} color="#222" />,
      value: (
        <p style={{
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          lineHeight: '1.2',
          fontSize: '1rem',
          maxWidth: '270px',
          color: '#222',
          fontWeight: 400,
        }}>
          Prime Land Promoter & Builders, 2nd Floor, SCO 10, Airport Road, Sector 80, Sahibzada Ajit Singh Nagar, Punjab
        </p>
      ),
    },
  ];

  const mobileStyles = `
    @media (max-width: 640px) {
      .contact-card {
        flex-direction: column !important;
        align-items: flex-start !important;
        height: auto !important;
        padding: 1.5rem !important;
      }
      .contact-card-icon {
        margin-bottom: 1rem;
      }
      .form-row {
        flex-direction: column !important;
        gap: 1rem !important;
      }
      .form-row input {
        width: 100% !important;
      }
      .contact-form h2 {
        font-size: 2rem !important;
        text-align: center;
      }
      .contact-form button {
        width: 100% !important;
        text-align: center;
      }
    }
  `;

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: mobileStyles }} />

      {/* Banner Section */}
      <div
        style={{
          width: '100%',
          backgroundImage: "url('/assets/Images/contact.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: 450,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      ></div>

      <div style={{ height: 40 }} />

      {/* Contact Cards */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '2.5rem',
        padding: '2rem 0',
        flexWrap: 'wrap',
        background: '#fff',
        fontFamily: 'Segoe UI, Arial, sans-serif',
      }}>
        {contactCards.map((card) => (
          <div
            key={card.label}
            className="contact-card"
            style={{
              background: '#fff',
              borderRadius: 12,
              border: '1.5px solid #ececec',
              padding: '2rem 2.5rem',
              minWidth: 320,
              maxWidth: 370,
              flex: 1,
              display: 'flex',
              gap: 24,
              height: 180,
            }}
          >
            <div className="contact-card-icon" style={{ minWidth: 44, display: 'flex', alignItems: 'center' }}>
              {card.icon}
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#bfa046', fontSize: '1.3rem', marginBottom: 12 }}>{card.label}</div>
              <div style={{ color: '#222', fontSize: '1.08rem', fontWeight: 400 }}>{card.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Appointment Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem', marginBottom: '3rem' }}>
        <button
          style={{
            background: '#bfa046',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '0.75rem 2rem',
            fontSize: '1.1rem',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
          onClick={() => navigate('/appointment')}
        >
          Book Appointment
        </button>
      </div>

      {/* Contact Form */}
      <div className="contact-form" style={{
        maxWidth: 1100,
        margin: '0 auto',
        background: '#fdfbf4',
        borderRadius: 8,
        padding: '2.5rem 1rem',
        marginBottom: '3rem',
      }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 500, marginBottom: '2.5rem', color: '#222' }}>
          Send Your Message To Us
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="form-row" style={{ display: 'flex', gap: '2%' }}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" style={inputStyle} required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" style={inputStyle} required />
          </div>
          <div className="form-row" style={{ display: 'flex', gap: '2%' }}>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" style={inputStyle} />
            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" style={inputStyle} />
          </div>
          <select name="interest" value={formData.interest} onChange={handleChange} style={inputStyle}>
            <option value="">Interested In</option>
            <option value="Project 1">Residential Plots</option>
            <option value="Project 2">Commercial Plots</option>
            {/* <option value="Project 3">Project 3</option> */}
          </select>
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your message" style={{ ...inputStyle, minHeight: '120px' }} />
          <div>
            <label style={{ fontSize: '1rem', color: '#222', marginBottom: 8, display: 'block' }}>Solve the captcha below:</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ background: '#ece9e2', padding: '0.5rem 1.5rem', fontSize: '1.5rem', letterSpacing: '0.5rem', borderRadius: 4, fontFamily: 'monospace' }}>{captcha}</div>
              <span style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={refreshCaptcha}>&#8635;</span>
            </div>
            <input type="text" name="captcha" value={formData.captcha} onChange={handleChange} placeholder="Enter Captcha" style={{ ...inputStyle, width: 220 }} />
          </div>
          <button
            type="submit"
            disabled={isSubmitting} // ✅ disable button after click
            style={{
              background: isSubmitting ? '#aaa' : '#bfa046',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '0.9rem 2.5rem',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              marginTop: '1.5rem',
              alignSelf: 'flex-start',
            }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      {/* Google Map */}
      <div style={{
        width: '100%',
        background: '#fdfbf4',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '4rem',
      }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '100%', height: '400px' }}>
          <iframe
            title="PLPB Sales Office Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.476941402627!2d76.7219976!3d30.6772737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feb48e48d91c3%3A0x89890d6417449652!2sPLPB%20Sales%20Office!5e0!3m2!1sen!2sin!4v1722107600000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  flex: 1,
  padding: '1rem',
  border: 'none',
  borderRadius: 4,
  background: '#ece9e2',
  fontSize: '1.1rem',
};

export default ContactUsSect;
