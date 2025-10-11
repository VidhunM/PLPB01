import { useState, useEffect } from "react";
import {
  Play,
  ChevronLeft,
  ChevronRight,
  Globe,
  Send,
  Calendar,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { findBlogBySlug, createSlug } from "@/utils/slugUtils";

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

// Custom Sharp Star Icon Component
const SharpStar = ({
  className,
  style,
  fill = "currentColor",
  stroke = "currentColor",
  strokeWidth = "0.5",
}: {
  className?: string;
  style?: React.CSSProperties;
  fill?: string;
  stroke?: string;
  strokeWidth?: string;
}) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

export const SubBlogPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [showReplyForm, setShowReplyForm] = useState<{
    [key: number]: boolean;
  }>({});
  const [replyText, setReplyText] = useState<{ [key: number]: string }>({});
  const [replies, setReplies] = useState<{
    [key: number]: Array<{
      id: number;
      author: string;
      text: string;
      time: string;
    }>;
  }>({});
  const [blog, setBlog] = useState<ApiBlog | null>(null);
  const [allBlogs, setAllBlogs] = useState<ApiBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);

  // Fetch blog data from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all blogs for related posts
        const allBlogsResponse = await fetch(
          "https://plpb-backend.onrender.com/api/blogs"
        );

        if (!allBlogsResponse.ok) {
          throw new Error(`HTTP error! status: ${allBlogsResponse.status}`);
        }

        const allBlogsData: ApiResponse = await allBlogsResponse.json();

        if (
          allBlogsData.success &&
          allBlogsData.data &&
          Array.isArray(allBlogsData.data)
        ) {
          setAllBlogs(allBlogsData.data);

          // Find the specific blog by title slug
          const currentBlog = findBlogBySlug(allBlogsData.data, slug);
          if (currentBlog) {
            setBlog(currentBlog);
            // Fetch reviews for this blog
            if (currentBlog._id) {
              fetchReviews(currentBlog._id);
            }
          } else {
            setError("Blog not found");
          }
        } else {
          setError("Failed to load blog data");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlogs();
    }
  }, [slug]);

  // Get related posts (first 3 other blogs)
  const relatedPosts = allBlogs.filter((b) => b._id !== blog?._id).slice(0, 3);

  // Fetch reviews for the blog
  const fetchReviews = async (id: string) => {
    try {
      setLoadingReviews(true);
      const response = await fetch(
        `https://plpb-backend.onrender.com/api/reviews/${id}`
      );
      const data = await response.json();

      console.log("Fetched reviews data:", data);

      if (response.status === 200) {
        setReviews(data || []);
      } else {
        console.error("Failed to fetch reviews:", data.message);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoadingReviews(false);
    }
  };

  console.log("rd", reviews);
  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleRatingHover = (value: number) => {
    setHoveredRating(value);
  };

  const handleRatingLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating || !name.trim() || !comment.trim()) {
      alert("Please fill in all fields and select a rating");
      return;
    }

    setSubmittingReview(true);

    try {
      const response = await fetch(
        `https://plpb-backend.onrender.com/api/reviews/${blog?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            thoughts: comment.trim(),
            stars: rating,
          }),
        }
      );

      if (response.ok) {
        alert("Review submitted successfully!");
        // Reset form
        setRating(0);
        setName("");
        setComment("");
        // Refresh reviews
        if (blog?._id) {
          fetchReviews(blog._id);
        }
      } else {
        alert("Failed to submit review. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Error submitting review. Please try again.");
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleReplyClick = (commentId: number) => {
    setShowReplyForm((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleReplySubmit = (commentId: number, e: React.FormEvent) => {
    e.preventDefault();
    const reply = replyText[commentId];
    if (reply.trim()) {
      const newReply = {
        id: Date.now(),
        author: "You",
        text: reply,
        time: "Just now",
      };

      setReplies((prev) => ({
        ...prev,
        [commentId]: [...(prev[commentId] || []), newReply],
      }));

      setReplyText((prev) => ({
        ...prev,
        [commentId]: "",
      }));

      setShowReplyForm((prev) => ({
        ...prev,
        [commentId]: false,
      }));
    }
  };

  const handleReplyTextChange = (commentId: number, value: string) => {
    setReplyText((prev) => ({
      ...prev,
      [commentId]: value,
    }));
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading blog...</p>
      </div>
    );
  }

  // Error state
  if (error || !blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500 text-lg">{error || "Blog coming soon"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image Section */}
      <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden">
        <img
          src="/assets/Images/Subblog.png"
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 max-w-6xl">
        {/* Article Title and Intro */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-8">
            {/* Left Column - Heading */}
            <div className="lg:w-1/2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {blog.title}
              </h1>
              <div
                className="w-20 h-0.5"
                style={{ backgroundColor: "#8B7B5B" }}
              ></div>
            </div>

            {/* Right Column - Description */}
            <div className="lg:w-1/2">
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {blog.description}
              </p>
            </div>
          </div>
        </div>

        {/* Main Article Image */}
        <div className="mb-6 sm:mb-8">
          <img
            src={blog.image_url}
            alt={blog.title}
            className="w-full h-64 sm:h-80 lg:h-96 object-cover shadow-lg"
          />
        </div>

        {/* Content Date and Side Button Box */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex flex-col">
            <div className="text-gray-700 text-sm">
              Posted On:{" "}
              {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>
            <div
              className="w-24 h-px mt-2"
              style={{ backgroundColor: "#78602C" }}
            ></div>
          </div>
          <div
            className="text-white px-4 py-2 text-sm font-medium self-start"
            style={{ backgroundColor: "#78602C" }}
          >
            {blog.category}
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none mb-8 sm:mb-12">
          <div
            className="text-gray-700 leading-relaxed text-sm sm:text-base"
            dangerouslySetInnerHTML={{ __html: blog.html_content }}
          />
        </div>

        {/* Add a Review Section */}
        <div className="bg-white p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-900 mb-2">
            Add a Review
          </h2>
          <div
            className="w-20 h-0.5 mb-4 sm:mb-6"
            style={{ backgroundColor: "#8B7B5B" }}
          ></div>

          {/* Star Rating */}
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => handleRatingHover(star)}
                onMouseLeave={handleRatingLeave}
                className="focus:outline-none transform hover:scale-110 transition-transform duration-200"
              >
                <SharpStar
                  className="w-8 h-8 sm:w-10 sm:h-10"
                  style={{
                    color:
                      star <= (hoveredRating || rating) ? "#8B7B5B" : "#D1D5DB",
                    filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                  }}
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </button>
            ))}
          </div>

          {/* Review Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border focus:outline-none focus:ring-1 focus:ring-[#8B7B5B] focus:border-[#8B7B5B] text-sm sm:text-base"
                style={{ borderColor: "#8B7B5B" }}
                required
              />
            </div>

            <div>
              <textarea
                placeholder="Share your thoughts..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border focus:outline-none focus:ring-1 focus:ring-[#8B7B5B] focus:border-[#8B7B5B] resize-none text-sm sm:text-base"
                style={{ borderColor: "#8B7B5B" }}
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <button
                type="submit"
                disabled={submittingReview}
                className="text-white px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                style={{ backgroundColor: "#78602C" }}
              >
                {submittingReview ? "Submitting..." : "Post"}
                <Send
                  className="w-4 h-4"
                  style={{ transform: "rotate(45deg)" }}
                />
              </button>

              {/* Visible to: Everyone Box */}
              {/* <div
                className="flex items-center gap-2 px-4 py-2 border"
                style={{ borderColor: "#78602C" }}
              >
                <span className="text-gray-700 text-sm">
                  Visible to: Everyone
                </span>
                <Globe className="w-4 h-4 text-gray-700" />
              </div> */}
            </div>
          </form>
        </div>

        {/* Reviews Section - Only show if there are reviews */}
        {!loadingReviews && reviews.length > 0 && (
          <div className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-900 mb-2">
              {reviews.length} Reviews
            </h2>
            <div
              className="w-20 h-0.5 mb-4 sm:mb-6"
              style={{ backgroundColor: "#8B7B5B" }}
            ></div>

            {/* Reviews List */}
            {reviews.map((review, index) => (
              <div
                key={review._id || index}
                className="flex gap-3 sm:gap-4 mb-4 sm:mb-6 pb-4 sm:pb-6"
                style={{ borderBottom: "1px solid #8B7B5B" }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center">
                  <span className="text-gray-600 font-semibold text-sm sm:text-base">
                    {review.name ? review.name.charAt(0).toUpperCase() : "U"}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">
                        {review.name || "Anonymous"}
                      </h4>
                      <p className="text-gray-700 mb-2 text-sm sm:text-base">
                        {review.thoughts || review.comment}
                      </p>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                        <span>
                          {review.createdAt
                            ? new Date(review.createdAt).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "Recently"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <SharpStar
                          key={star}
                          className="w-4 h-4 sm:w-6 sm:h-6"
                          style={{
                            color: "#8B7B5B",
                            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                          }}
                          fill={
                            star <= (review.stars || 0)
                              ? "currentColor"
                              : "none"
                          }
                          stroke="currentColor"
                          strokeWidth="0.5"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Related Posts Section */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-900 mb-2">
            Related Posts
          </h2>
          <div
            className="w-20 h-0.5 mb-4 sm:mb-6"
            style={{ backgroundColor: "#8B7B5B" }}
          ></div>

          {/* Mobile: Single column layout */}
          <div className="block sm:hidden">
            <div className="space-y-4">
              {relatedPosts.map((relatedPost) => (
                <BlogCard
                  key={relatedPost._id}
                  blog={{
                    id: relatedPost._id,
                    title: relatedPost.title,
                    category: relatedPost.category,
                    date: new Date(relatedPost.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    ),
                    description: relatedPost.description,
                    image: relatedPost.image_url,
                    readMore: `/subblog/${createSlug(relatedPost.title)}`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Desktop: Horizontal layout with arrows */}
          <div className="hidden sm:flex sm:items-center gap-4">
            {/* Left Arrow */}
            <button
              className="bg-white p-2 hover:bg-gray-50 flex-shrink-0"
              style={{ border: "1px solid #8B7B5B" }}
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            {/* Cards Container */}
            <div className="flex gap-6 overflow-x-hidden pb-4 flex-1">
              {relatedPosts.map((relatedPost) => (
                <BlogCard
                  key={relatedPost._id}
                  blog={{
                    id: relatedPost._id,
                    title: relatedPost.title,
                    category: relatedPost.category,
                    date: new Date(relatedPost.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    ),
                    description: relatedPost.description,
                    image: relatedPost.image_url,
                    readMore: `/subblog/${createSlug(relatedPost.title)}`,
                  }}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <button
              className="bg-white p-2 hover:bg-gray-50 flex-shrink-0"
              style={{ border: "1px solid #8B7B5B" }}
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
