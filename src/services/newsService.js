const API_KEY = '8e30212f95274696973b5eebcd0d2365';
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNews = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/top-headlines?country=us&apiKey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.articles || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}