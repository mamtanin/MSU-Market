import React, { useState } from 'react';
import { View, TextInput, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(DATA);
  const [suggestions, setSuggestions] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  const DATA = [
    { id: '1', name: 'Microwave', category: 'Appliances' },
    { id: '2', name: 'Airpods', category: 'Electronics' },
    { id: '3', name: 'Bean Bag', category: 'Furniture' },
    { id: '4', name: 'Sparty Poster', category: 'Decor' },
    { id: '5', name: 'Hoodie', category: 'Clothing' },
    { id: '6', name: 'Mini Fridge', category: 'Appliances', },
    { id: '7', name: 'Desk Lamp', category: 'Appliances', },
    { id: '8', name: 'Fan', category: 'Appliances', },
    { id: '9', name: 'MSU T-Shirt', category: 'Clothing', },
    { id: '10', name: 'Office Chair', category: 'Furniture', },
    { id: '11', name: 'Gaming Rig', category: 'Electronics', }
  ];

  const CATEGORIES = ['All', 'Appliances', 'Electronics', 'Furniture', 'Decor', "Clothing"];

  const handleSearch = (query) => {
    setSearchQuery(query);

    // Filter suggestions
    if (query === '') {
      setSuggestions([]);
    } else {
      const filteredSuggestions = DATA.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }

    // Update filtered data
    filterData(activeCategory, query);
  };

  const filterData = (category, query) => {
    let filtered = DATA;

    // Filter by category
    if (category !== 'All') {
      filtered = filtered.filter((item) => item.category === category);
    }

    // Filter by query
    if (query !== '') {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  const handleCategoryPress = (category) => {
    setActiveCategory(category);
    filterData(category, searchQuery);
  };

  const renderSuggestion = ({ item }) => (
    <TouchableOpacity onPress={() => setSearchQuery(item.name)}>
      <Text style={styles.suggestionItem}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => <Text style={styles.item}>{item.name}</Text>;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          style={styles.headerImage}
          source={{ uri: 'https://via.placeholder.com/50' }} // Placeholder image
        />
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.id}
          renderItem={renderSuggestion}
          style={styles.suggestionsDropdown}
        />
      )}

      {/* Category Tabs */}
      <View style={styles.categoryContainer}>
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => handleCategoryPress(category)}
            style={[
              styles.categoryTab,
              activeCategory === category && styles.activeCategoryTab,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === category && styles.activeCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Filtered Results */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.resultsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#18453b',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: 50,
    height: 50,
  },
  input: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 8,
    borderRadius: 24,
  },
  suggestionsDropdown: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    marginHorizontal: 16,
    maxHeight: 120,
    marginBottom: 8,
    borderRadius: 24,
  },
  suggestionItem: {
    padding: 8,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  categoryContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  categoryTab: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '18453b'
  },
  activeCategoryTab: {
    backgroundColor: '#18453b',
  },
  categoryText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
  },
  activeCategoryText: {
    color: '#fff',
  },
  item: {
    padding: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    fontSize: 16,
    marginHorizontal: 16,
  },
  resultsList: {
    flex: 1,
  },
});

export default SearchScreen;
