import { Calendar, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Blog {
  id: string | number;
  title: string;
  category: string;
  date: string;
  description: string;
  image: string;
  readMore: string;
}

interface BlogCardProps {
  blog: Blog;
}

export const BlogCard = ({ blog }: BlogCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Scroll to top of page before navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(blog.readMore);
  };

  return (
    <div 
      className="bg-white overflow-hidden hover:shadow-lg transition-all duration-300 w-full max-w-sm sm:max-w-none cursor-pointer hover:scale-105" 
      style={{ 
        border: '1px solid #8B7B5B',
        width: '100%',
        maxWidth: '400px',
        height: 'auto',
        minHeight: '450px'
      }}
      onClick={handleCardClick}
    >
      {/* Blog Image with rounded corners */}
      <div className="relative h-40 sm:h-48 overflow-hidden mx-3 sm:mx-4 mt-3 sm:mt-4">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover rounded-lg"
        />
        
        {/* Category Tag positioned on image */}
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
          <span className="bg-white text-black px-2 sm:px-3 py-1 rounded-full text-xs font-medium shadow-sm">
            {blog.category}
          </span>
        </div>
      </div>

      {/* Blog Content with proper spacing */}
      <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-4 sm:pt-6 flex-1 flex flex-col">
        {/* Date */}
        <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3">
          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
          <span>{blog.date}</span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-normal text-gray-900 mb-2 sm:mb-3 line-clamp-2">
          {blog.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3 flex-1">
          {blog.description}
        </p>

        {/* Read More Link */}
        <div className="text-gray-900 font-bold text-sm sm:text-base hover:text-gray-700 transition-colors duration-200 mt-auto text-left flex items-center">
          Read More <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
        </div>
      </div>
    </div>
  );
};
