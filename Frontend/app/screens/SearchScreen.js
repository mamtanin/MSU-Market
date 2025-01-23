import React, { useState } from 'react';
import { View, TextInput, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useEffect } from 'react';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(DATA);
  const [suggestions, setSuggestions] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    filterData('All', ''); // Apply the "All" filter on load
  }, []);

  const DATA = [
    { id: '1', name: 'Microwave', category: 'Appliances', price: '$50', seller: 'John Doe' ,image: require('../assets/MSUMarket microwave.webp') },
    { id: '2', name: 'Airpods', category: 'Electronics', price: '$80', seller: 'Tom Cruise' ,image: require('../assets/MSUMarket airpods.webp')  },
    { id: '3', name: 'Bean Bag', category: 'Furniture', price: '$30', seller: 'Gordon Ramsay' ,image: require('../assets/MSUMarket beanbag.jpg')  },
    { id: '4', name: 'Sparty Poster', category: 'Decor', price: '$10', seller: 'Joe Biden' ,image: require('../assets/MSUMarket sparty poster.jpg')  },
    { id: '5', name: 'Hoodie', category: 'Clothing', price: '$20', seller: 'LeBron James' ,image: require('../assets/MSUMarket hoodie.jpg')  },
    { id: '6', name: 'Mini Fridge', category: 'Appliances', price: '$50', seller: 'Tim Cook' ,image: require('../assets/MSUMarket mini fridge.webp')  },
    { id: '7', name: 'Desk Lamp', category: 'Appliances', price: '$15', seller: 'Joshua Nahum' ,image: require('../assets/MSUMarket desk lamp.webp')  },
    { id: '8', name: 'Fan', category: 'Appliances', price: '$20', seller: 'Mark Zuckerberg' ,image: require('../assets/MSUMarket fan.webp')  },
    { id: '9', name: 'MSU T-Shirt', category: 'Clothing', price: '$10', seller: 'John Smith' ,image: require('../assets/MSUMarket shirt.webp')  },
    { id: '10', name: 'Office Chair', category: 'Furniture', price: '$50', seller: 'Toby Maguire' ,image: require('../assets/MSUMarket office chair.webp')  },
    { id: '11', name: 'Gaming Rig', category: 'Electronics', price: '$400', seller: 'Lionel Messi' ,image: require('../assets/MSUMarket gaming rig.webp')  }
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

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const renderSuggestion = ({ item }) => (
    <TouchableOpacity onPress={() => setSearchQuery(item.name)}>
      <Text style={styles.suggestionItem}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* Item Name */}
      <Text style={styles.cardTitle}>{item.name}</Text>
  
      {/* Item Image */}
      <Image source={item.image} style={styles.cardImage} />
  
      {/* Seller and Price */}
      <View style={styles.cardDetails}>
        <Text style={styles.cardSeller}>Seller: {item.seller}</Text>
        <Text style={styles.cardPrice}>{item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          style={styles.headerImage}
          source={require("../assets/icon.png")} // Placeholder image
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

      {/* Divider with Shadow */}
      <View style={styles.divider} />

      {/* Dropdown Toggle Button */}
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
        <Text style={styles.dropdownButtonText}>
          {isDropdownVisible ? 'Hide Categories' : 'Show Categories'}
        </Text>
      </TouchableOpacity>

      {/* Category Dropdown*/}
      {isDropdownVisible && (
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
      )}

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
    backgroundColor: '#e8eceb',
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
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow position
    shadowOpacity: 0.2, // Shadow intensity
    shadowRadius: 2, // Shadow blur
    elevation: 2, // Shadow for Android
  },
  dropdownButton: {
    marginHorizontal: 16,
    padding: 12,
    backgroundColor: '#18453b',
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 8,
  },
  dropdownButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  categoryContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  categoryTab: {
    padding: 16,
    backgroundColor: '#d1dad8',
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  cardSeller: {
    fontSize: 14,
    color: '#555',
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#18453b',
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
