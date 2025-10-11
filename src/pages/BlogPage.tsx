import { useState, useEffect } from "react";
import { Search, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { BlogCard } from "@/components/BlogCard";
import { Pagination } from "@/components/Pagination";
import { createSlug } from "@/utils/slugUtils";

// API Interfaces
interface ApiBlog {
  _id: string;
  title: string;
  description: string;
  image_url: string;
  tags: string[];
  content: string;
  html_content: string;
  reviews: any[];
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  success: boolean;
  count: number;
  data: ApiBlog[];
}


const categories = [
  "All",
  "Investment Insights",
  "Industry Trends", 
  "Spaces & Design",
  "Leadership Voices",
  "Our Impact",
  "Guides & Resources"
];

export const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState<ApiBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const postsPerPage = 6;

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://plpb-backend.onrender.com/api/blogs');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: ApiResponse = await response.json();
        
        if (data.success && data.data && Array.isArray(data.data)) {
          setBlogs(data.data);
        } else {
          setError('No blogs available at the moment');
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blogs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs based on category and search term
  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[300px] sm:h-[400px] bg-cover bg-center bg-no-repeat" 
           style={{ backgroundImage: "url('/assets/Images/Blog.png')" }}>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Browse by Categories Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-6 lg:mb-0">
              <h2 className="text-2xl sm:text-3xl font-medium text-gray-700 mb-3">Browse by categories</h2>
              <div className="w-32 h-0.5" style={{ backgroundColor: '#78602C' }}></div>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search Blogs"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full sm:w-80 px-4 py-3 pr-12 border focus:outline-none focus:ring-1 focus:ring-[#78602C] focus:border-[#78602C] text-base"
                style={{ borderColor: '#78602C', backgroundColor: 'white' }}
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#78602C' }} />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="border mb-8 max-w-7xl mx-auto" style={{ borderColor: '#8B7B5B', backgroundColor: '#F8F8F8' }}>
            {/* Mobile: Horizontal scroll with chips */}
            <div className="sm:hidden py-3 px-4">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((category, index) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium text-black hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap"
                    style={{ 
                      backgroundColor: selectedCategory === category ? '#8B7B5B' : 'white',
                      color: selectedCategory === category ? 'white' : 'black',
                      border: '1px solid #8B7B5B'
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Desktop: Flex layout */}
            <div className="hidden sm:flex relative py-2">
              {categories.map((category, index) => (
                <div key={category} className="flex-1">
                  <button
                    onClick={() => handleCategoryChange(category)}
                    className="w-full px-3 py-1 font-normal text-base text-black hover:bg-gray-100 transition-colors duration-200 text-center"
                  >
                    {category}
                  </button>
                </div>
              ))}
              {/* Vertical separators */}
              {categories.slice(0, -1).map((_, index) => (
                <div 
                  key={`separator-${index}`}
                  className="absolute top-3 w-px bottom-3" 
                  style={{ 
                    backgroundColor: '#D3D3D3',
                    left: `${((index + 1) * 100) / categories.length}%`
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Loading blogs...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          )}

          {/* Blog Posts Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 justify-items-center">
              {currentBlogs.map((blog) => (
                <BlogCard 
                  key={blog._id} 
                  blog={{
                    // id: parseInt(blog._id.slice(-6), 16), // Convert _id to number for compatibility
                    id: blog._id,
                    title: blog.title,
                    category: blog.category,
                    date: new Date(blog.createdAt).toLocaleDateString('en-GB', { 
                      day: '2-digit', 
                      month: 'short', 
                      year: 'numeric' 
                    }),
                    description: blog.description,
                    image: blog.image_url,
                    readMore: `/subblog/${createSlug(blog.title)}`
                  }} 
                />
              ))}
            </div>
          )}

          {/* No Results Message */}
          {!loading && !error && currentBlogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No blog posts found matching your criteria.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

