import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Pressable, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class ShoppingCartStorage {
  constructor(namespace = 'shoppingCart') {
    this.namespace = namespace;
  }

  async getProducts() {
    const rawProducts = await AsyncStorage.getItem(
      `${this.namespace}:products`
    );
    return rawProducts ? JSON.parse(rawProducts) : [];
  }

  async addProduct(productId) {
    const currentProducts = await this.getProducts();
    const newProducts = [...currentProducts, productId];
    await AsyncStorage.setItem(
      `${this.namespace}:products`,
      JSON.stringify(newProducts)
    );
  }

  async clearProducts() {
    await AsyncStorage.removeItem(`${this.namespace}:products`);
  }
}

const Bmi = () => {
  const [products, setProducts] = useState([]);

  const shoppingCart = new ShoppingCartStorage();

  useEffect(() => {
    const loadProducts = async () => {
      const storedProducts = await shoppingCart.getProducts();
      setProducts(storedProducts);
    };

    loadProducts();
  }, []);

  const handleAddProduct = async () => {
    await shoppingCart.addProduct('exampleProduct');
    const updatedProducts = await shoppingCart.getProducts();
    setProducts(updatedProducts);
  };

  const handleClearProducts = async () => {
    await shoppingCart.clearProducts();
    setProducts([]);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}>Shopping Cart</Text>
        <Pressable style={styles.button} onPress={handleAddProduct}>
          <Text style={styles.buttonText}>Add Product</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleClearProducts}>
          <Text style={styles.buttonText}>Clear Products</Text>
        </Pressable>
        <FlatList
          data={products}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.product}>{item}</Text>}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  product: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Bmi;
