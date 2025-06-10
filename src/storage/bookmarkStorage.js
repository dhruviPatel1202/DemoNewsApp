import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARK_KEY = 'BOOKMARKED_ARTICLES';

export const getBookmarks = async () => {
  const data = await AsyncStorage.getItem(BOOKMARK_KEY);
  return data ? JSON.parse(data) : [];
};

export const toggleBookmark = async (article) => {
  const bookmarks = await getBookmarks();
  const exists = bookmarks.find(a => a.url === article.url);
  let newBookmarks;

  if (exists) {
    newBookmarks = bookmarks.filter(a => a.url !== article.url);
  } else {
    newBookmarks = [...bookmarks, article];
  }

  await AsyncStorage.setItem(BOOKMARK_KEY, JSON.stringify(newBookmarks));
  return newBookmarks;
};

export const isBookmarked = async (url) => {
  const bookmarks = await getBookmarks();
  return bookmarks.some(article => article.url === url);
};
