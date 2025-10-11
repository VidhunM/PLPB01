import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - PLPB Group</title>
        <meta
          name="description"
          content="Learn about PLPB Group's privacy policy and how we protect your personal information."
        />
        <meta
          name="keywords"
          content="privacy policy, plpb privacy, data protection, personal information"
        />
        <link rel="canonical" href="https://plpb.in/privacy-policy" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20" style={{ backgroundColor: '#132c51' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mt-20 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#9f944a]">
                Privacy Policy
              </h1>
              <p className="text-xl text-white">
                Your privacy is important to us. This policy explains how we collect, use, and protect your information.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <p className="text-gray-600 mb-6">
                    <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>

                  <p className="text-gray-700 mb-6">
                    At PLPB (which includes our subsidiaries, affiliates, joint ventures, associate companies, parent company and its subsidiaries) we respect and value your privacy. This policy explains how we handle the personal information you share with us, how we collect it, and how it is used and safeguarded. By visiting or using our websites and mobile applications, you agree to the terms described in this policy.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Information We Collect</h2>
                  <p className="text-gray-700 mb-4">
                    We may gather your personal data in several ways:
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Information you provide directly</h3>
                  <p className="text-gray-700 mb-4">
                    This may include details you share when you fill out forms on our sites, submit your CV, correspond with us by phone or email, or interact with our business partners. Typical information may include your name, address, phone number, email, CV details, or any other data relevant to your enquiry.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Information we collect automatically</h3>
                  <p className="text-gray-700 mb-4">
                    When you use our sites, we may collect technical details such as your IP address, browser type, login information, time zone, device type, browsing history on our sites, the pages you view, and how you interact with content.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Information from third parties</h3>
                  <p className="text-gray-700 mb-6">
                    We may also receive data about you from trusted third parties, including business partners, service providers, advertising networks, analytics firms, search providers, payment gateways, or credit reference agencies.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-4">How We Use Your Information</h2>
                  <p className="text-gray-700 mb-4">
                    We may use your personal information for the following purposes:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mb-4">
                    <li>To fulfil commitments under contracts with you or provide requested services.</li>
                    <li>To share information about projects, schemes, or offerings that are similar to your previous enquiries or purchases.</li>
                    <li>To suggest other projects or services from us or trusted third parties that may interest you.</li>
                    <li>To manage and improve our websites, including research, analysis, surveys, and troubleshooting.</li>
                    <li>To make sure our websites display content effectively across devices.</li>
                    <li>To keep your browsing experience secure.</li>
                    <li>To measure advertising effectiveness and provide relevant marketing.</li>
                    <li>To comply with applicable laws and regulations.</li>
                    <li>To improve customer service and support.</li>
                  </ul>
                  <p className="text-gray-700 mb-6">
                    If you are already our customer, we may contact you by your preferred method (email, SMS, or phone) with details of similar offerings. If you are a new customer, we or our partners will only contact you if you have given your consent.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Sharing of Information</h2>
                  <p className="text-gray-700 mb-4">
                    Your personal data may be shared in the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mb-4">
                    <li>Within the PLPB group of companies.</li>
                    <li>With selected business partners, suppliers, estate agents, sales agents, and advisors working with us to deliver services.</li>
                    <li>With advertisers, analytics providers, or search engines that support our marketing and site optimisation.</li>
                    <li>With third parties in the event of a merger, sale, or acquisition of our business or assets.</li>
                    <li>Where required by law, or in order to protect the rights, property, or safety of PLPB, our customers, or others.</li>
                  </ul>
                  <p className="text-gray-700 mb-6">
                    We may share certain non-sales related information such as cookies, phone numbers, or email addresses with third parties. However, we do not share sensitive details such as PAN numbers, card information, or financial preferences with outside parties.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Storage and Security</h2>
                  <p className="text-gray-700 mb-6">
                    Your personal data may be transferred or stored outside your location if needed, and processed by staff working for us or our partners. We take reasonable technical and organisational steps to keep your information secure and protected from unauthorised access. While we strive to safeguard your data, no transmission over the internet is entirely secure, and you share information at your own risk.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Cookies</h2>
                  <p className="text-gray-700 mb-6">
                    Our sites may use cookies to distinguish you from other visitors, improve your browsing experience, and help us optimise our services. Third parties may also use cookies, over which we do not have control.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Links to Other Websites</h2>
                  <p className="text-gray-700 mb-6">
                    Our websites may contain links to third-party websites. We are not responsible for their privacy practices, content, or any damage that may result from visiting such websites. We encourage you to read their privacy policies before sharing any personal data.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Retention of Data</h2>
                  <p className="text-gray-700 mb-6">
                    We keep your data for as long as necessary to fulfil the purposes set out in this policy, or to comply with legal and regulatory requirements. Once your data is no longer required, we will take reasonable steps to delete it or make it permanently anonymous.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Updates to This Policy</h2>
                  <p className="text-gray-700 mb-6">
                    PLPB reserves the right to update this privacy policy from time to time without prior notice. The revised version will be posted on our website, and your continued use of our services will signify acceptance of the updated terms.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-4"></h2>
                  <p className="text-gray-700 mb-4">
                    For any queries regarding this privacy policy, please contact us through the details available on our official website.
                  </p>
                  
                  <div className="bg-white-50 p-4 rounded-lg border-l-4 border-white-500">
                    <p className="text-gray-700 font-semibold">
                      RERA Registration No. for The Wellness City: PBRERA-PTL65-PR1095
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;
