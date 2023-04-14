// Import necessary modules
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDdjS2KD6ygBI2qtaDY3v00dxYq-ToMLPg",
  authDomain: "crwn-clothing-db-6fe29.firebaseapp.com",
  projectId: "crwn-clothing-db-6fe29",
  storageBucket: "crwn-clothing-db-6fe29.appspot.com",
  messagingSenderId: "1068529018260",
  appId: "1:1068529018260:web:e88f15aa2a200c807d1b81",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Main component
const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  // Fetch products from Firestore on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsSnapshot = await getDocs(collection(db, "products"));
        const productsData = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [products]);

  // Add a product to Firestore
  // Add a product to Firestore
  const getLatestProductId = async () => {
    const querySnapshot = await getDocs(collection(db, "products"), {
      orderBy: "id",
      desc: true,
      limit: 1,
    });
    const latestProduct = querySnapshot.docs[0];
    return latestProduct ? latestProduct.data().id || 0 : 0; // Access the 'id' field of the latest product or default to 0 if not available
  };

  // Add a product to Firestore
  const addProduct = async () => {
    try {
      // Fetch the latest product ID
      const latestProductId = await getLatestProductId();

      // Calculate the next product ID as the latest product ID + 1
      const nextProductId = latestProductId + 1;

      // Add the product to Firestore with the calculated next product ID
      const docRef = await addDoc(collection(db, "products"), {
        name: productName,
        price: productPrice,
        id: nextProductId,
      });

      console.log("Product added successfully with ID:", nextProductId);
      setProductName("");
      setProductPrice("");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  // Update a product in Firestore
  const updateProduct = async (productId, updatedProductData) => {
    try {
      await updateDoc(doc(db, "products", productId), updatedProductData);
      console.log("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Delete a product from Firestore
  const deleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, "products", productId));
      console.log("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}
            <button
              onClick={() =>
                updateProduct(product.id, { name: "Updated Product" })
              }
            >
              Update
            </button>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Product Price"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
      />
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
};

export default AdminPanel;
