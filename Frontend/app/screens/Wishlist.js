import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';

const WishlistPage = () => {
  // Function to show an alert when "Add to Cart" is pressed
  const handleAddToCart = () => {
    Alert.alert('Added to Cart');
  };

  return (
    <View style={styles.container}>
      {/* Green Bar with Title and Logo */}
      <View style={styles.greenBar}>
        <Text style={styles.title}>Wishlist</Text>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Michigan_State_Athletics_logo.svg/1200px-Michigan_State_Athletics_logo.svg.png',
          }}
          style={styles.logo}
        />
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.itemsContainer}>
          {/* Item 1 */}
          <View style={styles.item}>
            <View style={styles.itemContent}>
              <Image
                source={{
                  uri: 'https://images.footballfanatics.com/michigan-state-spartans/mens-colosseum-green-michigan-state-spartans-tortugas-logo-quarter-zip-jacket_pi3930000_ff_3930053-a0208e8049797e514240_full.jpg?_hv=2&w=340',
                }}
                style={styles.itemImage}
              />
              <View style={styles.textContent}>
                <Text style={styles.itemName}>MSU Quarter-Zip</Text>
                <Text style={styles.price}>Price: $59.99</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={handleAddToCart} // Show alert on press
            >
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
          </View>

          {/* Item 2 */}
          <View style={styles.item}>
            <View style={styles.itemContent}>
              <Image
                source={{
                  uri: 'https://images.footballfanatics.com/michigan-state-spartans/mens-nike-black-michigan-state-spartans-color-pop-performance-fleece-pullover-hoodie_ss5_p-200872728+u-qnqismbrpylszxhxvdla+v-b3ef40xmvsimz9j3kaqh.jpg?_hv=2&w=340',
                }}
                style={styles.itemImage}
              />
              <View style={styles.textContent}>
                <Text style={styles.itemName}>Pullover Hoodie</Text>
                <Text style={styles.price}>Price: $79.99</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={handleAddToCart} // Show alert on press
            >
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
          </View>

          {/* Item 3 */}
          <View style={styles.item}>
            <View style={styles.itemContent}>
              <Image
                source={{
                  uri: 'https://images.footballfanatics.com/michigan-state-spartans/wincraft-michigan-state-spartans-13-x-32-slogan-pennant_pi4942000_ff_4942148-1f74d9540adb7a78c47e_full.jpg?_hv=2&w=340',
                }}
                style={styles.itemImage}
              />
              <View style={styles.textContent}>
                <Text style={styles.itemName}>MSU Pennant</Text>
                <Text style={styles.price}>Price: $24.99</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={handleAddToCart} // Show alert on press
            >
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
          </View>

          {/* Item 4 */}
          <View style={styles.item}>
            <View style={styles.itemContent}>
              <Image
                source={{
                  uri: 'https://images.footballfanatics.com/michigan-state-spartans/michigan-state-spartans-30oz-gameday-stainless-tumbler_pi4901000_ff_4901098-a25c0aada98a6666b8d9_full.jpg?_hv=2&w=340',
                }}
                style={styles.itemImage}
              />
              <View style={styles.textContent}>
                <Text style={styles.itemName}>Stainless Tumbler</Text>
                <Text style={styles.price}>Price: $34.99</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={handleAddToCart} // Show alert on press
            >
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
          </View>

          {/* Item 5 */}
          <View style={styles.item}>
            <View style={styles.itemContent}>
              <Image
                source={{
                  uri: 'https://images.footballfanatics.com/michigan-state-spartans/michigan-state-spartans-helmet-keychain_pi4911000_ff_4911158-d573104df1c94d66b73f_full.jpg?_hv=2&w=340',
                }}
                style={styles.itemImage}
              />
              <View style={styles.textContent}>
                <Text style={styles.itemName}>Helmet Keychain</Text>
                <Text style={styles.price}>Price: $12.99</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={handleAddToCart} // Show alert on press
            >
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
          </View>

          {/* Item 6 */}
          <View style={styles.item}>
            <View style={styles.itemContent}>
              <Image
                source={{
                  uri: 'https://images.footballfanatics.com/michigan-state-spartans/michigan-state-spartans-2-pack-baby-booties_pi4908000_ff_4908063-1d679a4791ae7e3cf40b_full.jpg?_hv=2&w=340',
                }}
                style={styles.itemImage}
              />
              <View style={styles.textContent}>
                <Text style={styles.itemName}>Baby Booties</Text>
                <Text style={styles.price}>Price: $19.99</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={handleAddToCart} // Show alert on press
            >
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greenBar: {
    backgroundColor: 'green',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'flex-end', 
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left', 
  },
  content: {
    padding: 10,
  },
  itemsContainer: {
    marginBottom: 20,
  },
  item: {
    flexDirection: 'column',
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 120, 
    height: 120, 
    borderRadius: 10,
    marginRight: 10,
  },
  textContent: {
    flexDirection: 'column',
    justifyContent: 'flex-start', 
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: 'green',
  },
  addToCartButton: {
    backgroundColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'flex-start', 
  },
  addToCartText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginTop: 10,
  },
});

export default WishlistPage;
