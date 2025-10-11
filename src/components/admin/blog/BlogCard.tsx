import { FilePenLine, Trash } from 'lucide-react';
import Calender from '../../../assets/images/calendar_today.svg';
import { deleteBlog } from '../../../Api/api_client';

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
  // reviews: Review[];
  postingDate: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, handleDelete, HandleOpenUpdate }) => {
  return (
    <div className="border-border bg-secondary h-[400px] max-w-[375px] rounded-2xl border p-4 shadow duration-500">
      <div className="h-[50%] w-full overflow-hidden rounded-xl bg-gray-200">
        {blog.image_url ? (
          <img src={blog.image_url} alt={blog.title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-gray-200"></div>
        )}
      </div>

      <div className="flex items-center gap-2 pt-4 text-sm">
        <img src={Calender} alt="calendar" />
        <p>
          {new Date(blog.postingDate).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </p>
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <p className="font-semibold">{blog.title}</p>
        <p className="line-clamp-2 text-sm text-gray-600">{blog.description}</p>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          className="flex items-center gap-2 rounded-full border border-blue-500 bg-blue-100 px-2 py-1 text-sm text-blue-500 transition-colors hover:bg-blue-500 hover:text-white"
          onClick={() => HandleOpenUpdate(blog)}
        >
          Update
          <FilePenLine className="text-sm" />
        </button>
        <button
          className="flex items-center gap-2 rounded-full border border-red-500 bg-red-100 px-2 py-1 text-sm text-red-500 transition-colors hover:bg-red-500 hover:text-white"
          onClick={() => handleDelete(blog._id)}
        >
          Delete
          <Trash className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
