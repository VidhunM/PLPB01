import axios from 'axios';

// Create an Axios instance with a base URL

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'; // Replace with your backend URL

export async function backendAlive(): Promise<any> {
  try {
    const res = await axios.get('/');
    return res.data;
  } catch (error) {
    console.error('Error checking backend status:', error);
  }
}

// list blogs

export async function listBlogs(): Promise<any> {
  try {
    const res = await axios.get('/api/blogs');
    return res;
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }
}
export async function createBlog(data): Promise<any> {
  try {
    const res = await axios.post('/api/blogs', data);
    return res;
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }
}

export async function deleteBlog(id: any): Promise<any> {
  try {
    const res = await axios.delete(`/api/blogs/${id}`);
    return res;
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }
}
