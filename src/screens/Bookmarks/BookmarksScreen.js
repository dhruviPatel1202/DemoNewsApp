import React, { useEffect, useState } from 'react';
import { View, FlatList, SafeAreaView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getBookmarks } from '../../storage/bookmarkStorage';
import ArticleCard from '../../components/molecules/ArticleCard';

export default function BookmarksScreen({ navigation }) {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', async () => {
      const data = await getBookmarks();
      setBookmarks(data);
    });

    return focusHandler;
  }, [navigation]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Bookmarks',
      headerLeft: () => (
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {bookmarks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No bookmarks yet</Text>
        </View>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={item => item.url}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ArticleCard
              article={item}
              onPress={() => navigation.navigate('Detail', { article: item })}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    marginLeft: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
  listContent: {
    padding: 16,
  },
});