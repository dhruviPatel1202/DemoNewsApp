import React, { useEffect, useState } from 'react';
import { ScrollView, Image, Text, Button, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { toggleBookmark, isBookmarked } from '../../storage/bookmarkStorage';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

interface Props {
  route: DetailScreenRouteProp;
}

const DetailScreen: React.FC<Props> = ({ route }) => {
  const { article } = route.params;
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    (async () => {
      const status = await isBookmarked(article.url);
      setBookmarked(status);
    })();
  }, [article]);

  const handleBookmark = async () => {
    const _ = await toggleBookmark(article);
    setBookmarked(prev => !prev);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: article.urlToImage }} style={styles.image} />
      <Text style={styles.title}>{article.title}</Text>
      <Text>{article.content}</Text>
      <Button
        title={bookmarked ? 'Remove Bookmark' : 'Bookmark'}
        onPress={handleBookmark}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  image: { height: 200, borderRadius: 8, marginBottom: 12 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
});

export default DetailScreen;
