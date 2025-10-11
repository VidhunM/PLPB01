import React, { useState, useEffect } from "react";

import press from "/assets/Images/Edited images-03.jpg";
import NewsBanner from "/assets/Images/newsbanner.jpeg";

import news1 from "/assets/Images/Group 13.png";
import news2 from "/assets/Images/Group 33.png";
import news3 from "/assets/Images/Group 21.png";
import news4 from "/assets/Images/grp-22.png";
import news5 from "/assets/Images/Group 23.png";
import news6 from "/assets/Images/Group 24.png";
import news7 from "/assets/Images/Group 34.png";
import news8 from "/assets/Images/Group 27.png";
import news9 from "/assets/Images/Group 25.png";
import news10 from "/assets/Images/image 58.png";
import news11 from "/assets/Images/Group 30.png";
import news12 from "/assets/Images/Group 14.png";
import news01 from "/assets/Images/new01.jpg";
import news02 from "/assets/Images/new02.jpg";
import news03 from "/assets/Images/new03.jpg";
import news04 from "/assets/Images/new04.jpg";
import news05 from "/assets/Images/new05.jpg";
import news06 from "/assets/Images/new06.jpg";

interface NewsItem {
  id: number;
  date: string;
  title: string;
  image: string;
  category: string;
}

const PLPBPressPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // ✅ Scroll to top on mount
  }, []);

  const newsData: NewsItem[] = [
    {
      id: 1,
      date: "July 9, 2025",
      title: "PLPB Leads the Way in Senior Living with Future-Ready Communities",
      image: news1,
      category: "Sustainability",
    },
    {
      id: 2,
      date: "July 10, 2025",
      title: "Timeless PLPB: State of The Art Infrastructure to Support Senior Living",
      image: news2,
      category: "Senior Living",
    },
    {
      id: 3,
      date: "July 14, 2025",
      title: "PLPB is Continuously Working Towards Eco-friendly Developments",
      image: news3,
      category: "Infrastructure",
    },
    {
      id: 4,
      date: "July 5, 2025",
      title: "The Wellness City: Built for Life",
      image: news4,
      category: "Environment",
    },
    {
      id: 5,
      date: "April 6, 2025",
      title: "Sumit Singla: PLPB Creates Spaces that Respect the Earth",
      image: news5,
      category: "Wellness",
    },
    {
      id: 6,
      date: "March 31, 2025",
      title: "Sumit Singla on Infra Boost on Patiala Road",
      image: news6,
      category: "Leadership",
    },
    {
      id: 7,
      date: "April 6, 2025",
      title: "Sumit Singla, CEO, PLPB Group, Recognised with Iconic Sustainable Township Developer",
      image: news7,
      category: "Infrastructure",
    },
    {
      id: 8,
      date: "May 9, 2025",
      title: "Lohit Bansal, MD, PLPB Group Comments on Futuristic Infrastructure",
      image: news8,
      category: "Awards",
    },
    {
      id: 9,
      date: "March 28, 2025",
      title: "Setting Infrastructure Standards with Artelia at IndusPark",
      image: news9,
      category: "Leadership",
    },
    {
      id: 10,
      date: "Nov 10, 2024",
      title: "The Wellness City: India's First Bioclimatic Township",
      image: news10,
      category: "Infrastructure",
    },
    {
      id: 11,
      date: "Feb 20, 2025",
      title: "PLPB Partners with Surbana Jurong to Develop Induspark",
      image: news11,
      category: "Innovation",
    },
    {
      id: 12,
      date: "March 7,2025",
      title: "Punjab Government Awards PLPB Group License to Build India's First Bioclimatic Township",
      image: news12,
      category: "Partnership",
    },
    {
      id: 13,
      date: "Sep 01,2022",
      title: "Satsang held to signal start of construction of 'Art of Living Ashram '",
      image: news01,
      category: "Partnership",
    },
    {
      id: 14,
      date: "Aug 01,2022",
      title: "Glimpse Magazine - The Young Directors Prime Land Promoter & Builders PLPB",
      image: news02,
      category: "Partnership",
    },
    {
      id: 15,
      date: "July 26,2022",
      title: "'The Wellness City' on Patiala-Chandigarh Road to be in sync with bioclimatic architecture",
      image: news03,
      category: "Partnership",
    },
    {
      id: 16,
      date: "Sep 27,2022",
      title: "Architects adopt Bioclimatic Architecture to counter climate change & reverse 'environmental harm'",
      image: news04,
      category: "Partnership",
    },
    {
      id: 17,
      date: "July 21,2022",
      title: "Kamlesh Barwal of sri sri Yoga School to conduct session",
      image: news05,
      category: "Partnership",
    },
    {
      id: 18,
      date: "July 01,2022",
      title: "Punjab Government Awards PLPB Group License to Build India's First Bioclimatic Township",
      image: news06,
      category: "World Environment Day: Plantation drive held at 'The Wellness City'",
    },
  ];

  const featuredNews: NewsItem = newsData[0];
  const [activeTab, setActiveTab] = useState("news");
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState<string>("");

  const openImageModal = (image: string) => {
    setModalImage(image);
    setShowModal(true);
  };

  const tabs = [
    { key: "news", label: "News" },
    { key: "videos", label: "Videos" },
    { key: "press", label: "Press" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tabs */}
      <div className="container mx-auto px-4 relative border-b-2 border-[#1C3260]/20 bg-black">
        <div className="flex flex-wrap gap-4 absolute left-1/2 -translate-x-1/2" style={{ top: "100px" }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 border-2 min-w-[120px] text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ${
                activeTab === tab.key
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white border-white hover:bg-white hover:text-black"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${press})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-xl md:text-6xl font-semibold mb-4"></h1>
        </div>
      </section>

      {/* Feature */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div
            className="rounded-lg shadow-lg h-[456px]"
            style={{
              backgroundImage: `url(${NewsBanner})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div>
            <div className="text-sm text-gray-600 mb-2 uppercase">July 13, 2025</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 uppercase leading-tight">
              Bioclimatic Townships: A Paradigm Shift in Sustainable Urban Living
            </h2>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsData.map((news) => (
              <div
                key={news.id}
                className="border border-gray-300 overflow-hidden bg-white cursor-pointer group"
                onClick={() => openImageModal(news.image)}
              >
                <div className="h-[500px] overflow-hidden flex items-center justify-center bg-white">
                  <img
                    src={news.image}
                    alt={news.title}
                    className={`w-full h-full transition-transform duration-300 group-hover:scale-105 ${
                      [13, 16, 18].includes(news.id)
                        ? "object-contain p-4"
                        : "object-cover"
                    }`}
                  />
                </div>
                <div className="px-4 py-3">
                  <p className="text-sm text-gray-500 uppercase">{news.date}</p>
                  <p className="font-bold text-base text-gray-900 uppercase mt-1">{news.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-xl p-4 max-w-4xl w-full">
            <img
              src={modalImage}
              alt="News Full View"
              className="w-full rounded-lg max-h-[90vh] object-contain"
            />
           <button
  className="absolute top-2 right-2 text-black bg-white rounded-full p-1 shadow hover:bg-gray-100 text-xl"
  onClick={() => setShowModal(false)}
>
  ✕
</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PLPBPressPage;
