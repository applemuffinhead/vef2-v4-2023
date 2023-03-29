export function generateApiUrl(path) {
  const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
  console.log("REACT_APP_API_URL:", baseUrl);
  const url = new URL(path, baseUrl);
  
  console.log('url', url);

  return url;
}