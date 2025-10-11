import { useState } from "react";
import { Calendar, Image, FileText, X, Eye, Upload } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const CreateBlog = ({ setOpenCreateBlog, handleSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: [],
    thumbnailUrl: "",
    imageUrl: "",
    thumbnailFile: null,
    imageFile: null,
    content: "",
    htmlContent: "",
    postingDate: new Date().toISOString().split("T")[0],
  });

  const [showPreview, setShowPreview] = useState({
    thumbnail: false,
    image: false,
  });
  const [previewUrls, setPreviewUrls] = useState({ thumbnail: "", image: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "content") {
      const paragraphs = value
        .split("\n\n")
        .filter((para) => para.trim() !== "");
      const htmlContent = paragraphs
        .map((p) => `<p>${p.trim()}</p><br/>`)
        .join("\n");
      setFormData((prev) => ({ ...prev, [name]: value, htmlContent }));
    } else if (name === "tags") {
      setFormData((prev) => ({
        ...prev,
        tags: value.split(",").map((t) => t.trim()),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, [`${type}File`]: file }));
    setPreviewUrls((prev) => ({ ...prev, [type]: url }));
    setShowPreview((prev) => ({ ...prev, [type]: true }));
  };

  const togglePreview = (type) => {
    setShowPreview((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const HandleCreateBlogSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="max-h-[80vh] w-full max-w-4xl overflow-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 rounded-t-2xl border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">
              Create New Blog Post
            </h3>
            <button
              onClick={() => setOpenCreateBlog(false)}
              className="rounded-full p-2 transition-colors hover:bg-gray-100"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-6 p-6" onSubmit={HandleCreateBlogSubmit}>
          {/* Title */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Blog Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Enter blog title..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              required
              placeholder="Write a short description..."
              className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category & Tags */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                <option value="Investment Insights">Investment Insights</option>
                <option value="Industry Trends">Industry Trends</option>
                <option value="Spaces & Design">Spaces & Design</option>
                <option value="Leadership Voices">Leadership Voices</option>
                <option value="Our Impact">Our Impact</option>
                <option value="Guides & Resources">Guides & Resources</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Tags (comma separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags.join(", ")}
                onChange={handleInputChange}
                placeholder="tech, javascript, web"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Images */}
          <div className="grid gap-6 md:grid-cols-2">
            {["image"].map((type) => (
              <div key={type} className="space-y-3">
                <label className="block flex items-center gap-1 text-sm font-semibold text-gray-700">
                  <Image size={16} />{" "}
                  {type === "thumbnail" ? "Thumbnail" : "Featured"} Image
                </label>

                {/* File Upload */}
                <div className="flex w-full items-center justify-center">
                  <label
                    htmlFor={`${type}File`}
                    className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                  >
                    <Upload className="mb-2 h-8 w-8 text-gray-500" />
                    <p className="text-sm text-gray-500">
                      Click to upload {type}
                    </p>
                    <input
                      type="file"
                      id={`${type}File`}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, type)}
                    />
                  </label>
                </div>

                <div>Upload image size should be less than 5MB</div>

                {/* Preview */}
                {(formData[`${type}File`] || formData[`${type}Url`]) && (
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => togglePreview(type)}
                      className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1 text-xs text-blue-600 hover:bg-blue-100"
                    >
                      <Eye size={12} /> {showPreview[type] ? "Hide" : "Preview"}
                    </button>
                    {formData[`${type}File`] && (
                      <span className="rounded bg-green-50 px-2 py-1 text-xs text-green-600">
                        File: {formData[`${type}File`].name}
                      </span>
                    )}
                  </div>
                )}
                {showPreview[type] &&
                  (previewUrls[type] || formData[`${type}Url`]) && (
                    <img
                      src={previewUrls[type] || formData[`${type}Url`]}
                      alt="preview"
                      className="mt-2 h-32 w-full rounded-lg object-cover"
                    />
                  )}
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label className="flex items-center gap-1 text-sm font-semibold text-gray-700">
              <FileText size={16} /> Blog Content *
            </label>
            {/* <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows="12"
              required
              placeholder="Write blog content here..."
              className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            /> */}

            <ReactQuill
              theme="snow"
              modules={modules}
              value={formData.htmlContent} // keep editor bound to HTML
              onChange={(value) => {
                const plainText =
                  new DOMParser().parseFromString(value, "text/html").body
                    .textContent || "";
                setFormData((prev) => ({
                  ...prev,
                  content: plainText, // plain text only
                  htmlContent: value, // full HTML
                }));
              }}
            />

            {formData.htmlContent && (
              <details className="mt-2">
                <summary className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-800">
                  View Generated HTML
                </summary>
                <pre className="rounded bg-gray-100 p-2 font-mono text-xs whitespace-pre-wrap">
                  {formData.htmlContent}
                </pre>
              </details>
            )}
          </div>

          {/* Posting Date */}
          <div className="space-y-2">
            <label className="block flex items-center gap-1 text-sm font-semibold text-gray-700">
              <Calendar size={16} /> Publishing Date
            </label>
            <input
              type="date"
              name="postingDate"
              value={formData.postingDate}
              onChange={handleInputChange}
              min={new Date().toISOString().split("T")[0]}
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
            <button
              type="button"
              className="rounded-xl border border-gray-300 px-6 py-3 text-gray-600 hover:bg-gray-50"
              onClick={() => setOpenCreateBlog(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
            >
              Publish Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
