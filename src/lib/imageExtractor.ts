// Image extractor utility functions
// This file was created to resolve a build error where Tailwind CSS was looking for this file

export const extractImageFromContent = (content: string): string[] => {
  // Extract image URLs from content
  const imageRegex = /<img[^>]+src="([^"]+)"/g;
  const images: string[] = [];
  let match;
  
  while ((match = imageRegex.exec(content)) !== null) {
    images.push(match[1]);
  }
  
  return images;
};

export const extractFirstImage = (content: string): string | null => {
  const images = extractImageFromContent(content);
  return images.length > 0 ? images[0] : null;
};

export const extractAllImages = (content: string): string[] => {
  return extractImageFromContent(content);
};
