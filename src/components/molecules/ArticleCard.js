import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ArticleCard({ article, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: article.urlToImage }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text numberOfLines={2} style={styles.title}>{article.title}</Text>
        <Text numberOfLines={3} style={styles.desc}>{article.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', marginVertical: 8, padding: 10, backgroundColor: '#fff', borderRadius: 10 },
  image: { width: 100, height: 100, borderRadius: 10 },
  textContainer: { flex: 1, paddingLeft: 10 },
  title: { fontWeight: 'bold', fontSize: 16 },
  desc: { fontSize: 14, color: '#555' },
});
