import { useEffect, useState } from "react";
import BlogList from "../../components/admin/blog/BlogList";
import CreateBlog from "../../components/admin/blog/CreateBlog";
import { deleteBlog, listBlogs } from "../../Api/api_client";
import axios from "axios";
import UpdateBlog from "../../components/admin/blog/UpdateBlog";

function AdminBlogPage() {
  const [OpenCreateBlog, setOpenCreateBlog] = useState<boolean>(false);
  const [OpenUpdateBlog, setOpenUpdateBlog] = useState<boolean>(false);
  const [blogToUpdate, setBlogToUpdate] = useState<Blog | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await listBlogs();
        if (res.status === 204) setBlogs([]);
        if (res.status === 200) setBlogs(res.data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [refresh]);

  // create create
  const handleSubmit = async (formData) => {
    // e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("tags", JSON.stringify(formData.tags));
    data.append("content", formData.content);
    data.append("html_content", formData.htmlContent);
    // data.append('postingDate', formData.postingDate);

    if (formData.imageFile) data.append("image_url", formData.imageFile);
    else data.append("image_url", formData.imageUrl);

    try {
      const res = await axios.post("/api/blogs", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Blog created:", res.data);
      if (res.status === 201) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setRefresh((prev) => !prev);
        }, 2000);
        setOpenCreateBlog(false);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteBlog(id);
      if (res.status === 200) setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  // handle open update

  const HandleOpenUpdate = (blog) => {
    setOpenUpdateBlog(true);
    setBlogToUpdate(blog);
  };

  const HandleUpdate = async (id, formData) => {
    // e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("tags", JSON.stringify(formData.tags));
    data.append("content", formData.content);
    data.append("html_content", formData.htmlContent);
    // data.append('postingDate', formData.postingDate);

    if (formData.imageFile) data.append("image_url", formData.imageFile);
    else data.append("image_url", formData.imageUrl);

    try {
      const res = await axios.put(`/api/blogs/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Blog created:", res.data);
      if (res.status === 200) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setRefresh((prev) => !prev);
        }, 2000);
        setOpenUpdateBlog(false);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="relative flex h-[90vh] flex-col p-2">
      {/* <div className="">
        <h2 className="text-2xl tracking-tight">Our Blogs</h2>
      </div> */}
      {/* Header */}
      <div className="flex flex-shrink-0 items-center justify-between bg-white p-4">
        <h2 className="text-xl font-semibold text-gray-800">Category</h2>
        <button
          className="group to-blue-950 relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 px-6 py-3 font-semibold text-white transition-all duration-300"
          onClick={() => setOpenCreateBlog(true)}
        >
          <div className="absolute inset-0 -top-2 -left-2 translate-x-[-100%] rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-[400%]"></div>
          Add
        </button>
      </div>
      <div className="flex-1 overflow-y-auto rounded bg-white p-4">
        <BlogList
          blogs={blogs}
          loading={loading}
          handleDelete={handleDelete}
          setOpenCreateBlog={setOpenCreateBlog}
          HandleOpenUpdate={HandleOpenUpdate}
        />
      </div>
      {OpenCreateBlog && (
        <CreateBlog
          handleSubmit={handleSubmit}
          setOpenCreateBlog={setOpenCreateBlog}
        />
      )}
      {OpenUpdateBlog && (
        <UpdateBlog
          blogToUpdate={blogToUpdate}
          HandleUpdate={HandleUpdate}
          setOpenUpdateBlog={setOpenUpdateBlog}
        />
      )}
    </div>
  );
}

export default AdminBlogPage;
