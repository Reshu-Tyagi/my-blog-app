const API_URL = 'https://dummyjson.com';

export const getPosts = async () => {
  const response = await fetch(`${API_URL}/posts?limit=20`);
  const data = await response.json();
  return data;
};

export const getPostById = async (id: number) => {
  const response = await fetch(`${API_URL}/posts/${id}`);
  const data = await response.json();
  return data;
};