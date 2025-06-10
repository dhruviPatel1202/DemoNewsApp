import React, { useEffect, useState } from 'react';
import {  FlatList, SafeAreaView } from 'react-native';
import { fetchNews } from '../../services/newsService';
import ArticleCard from '../../components/molecules/ArticleCard';

export default function HomeScreen({ navigation }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchNews();
      setArticles(data);
    })();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={articles}
        keyExtractor={item => item.url}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ArticleCard
            article={item}
            onPress={() => navigation.navigate('Detail', { article: item })}
          />
        )}
      />
    </SafeAreaView>
  );
}
