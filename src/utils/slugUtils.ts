/**
 * Converts a string to a URL-friendly slug
 * @param text - The text to convert to a slug
 * @returns A URL-friendly slug
 */
export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Finds a blog by its title slug
 * @param blogs - Array of blogs to search through
 * @param slug - The slug to search for
 * @returns The blog with matching slug or null
 */
export const findBlogBySlug = (blogs: any[], slug: string) => {
  return blogs.find(blog => createSlug(blog.title) === slug);
};
