const API_URL = 'http://localhost:5000/repos';

export async function getRepos() {
  const response = await fetch(API_URL);
  return response.json();
}

export async function getModule(name) {
  const response = await fetch(`${API_URL}/${name}`);
  return response.json();
}