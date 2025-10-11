import BlogCard from './BlogCard';

export interface Review {
  _id: string;
  stars: number;
  name: string;
  thoughts: string;
  replyComment: string;
  createdAt: string; // ISO date string
  __v: number;
}

export interface Blog {
  _id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  image?: string;
  thubnail_url?: string;
  image_url?: string;
  tags: string[];
  reviews: Review[];
  postingDate: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

function BlogList({
  setOpenCreateBlog,
  handleDelete,
  blogs,
  loading,
  HandleOpenUpdate,
}: {
  setOpenCreateBlog: (value: boolean) => void;
  handleDelete: (id: string) => void;
  blogs: Blog[];
  loading: boolean;
}) {
  return (
    <div className="flex h-full flex-col">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <p className="text-2xl text-gray-500">Loading blogs...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog: Blog) => (
              <div key={blog._id} className="flex-shrink-0">
                <BlogCard
                  blog={blog}
                  handleDelete={handleDelete}
                  HandleOpenUpdate={HandleOpenUpdate}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogList;
