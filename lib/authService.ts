const API_URL = 'https://dummyjson.com';

export const loginUser = async (credentials: { username: string; password: string }) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: credentials.username,
      password: credentials.password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  const token = data.accessToken || data.token;
  
  if (token) {
    localStorage.setItem('token', token);
  }

  return { ...data, token };
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};