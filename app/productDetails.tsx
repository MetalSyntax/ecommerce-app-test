import React, { useState, useRef, useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  StyleSheet,
  StatusBar,
  Modal
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from '@react-navigation/native';

const products = [
  {
    id: "1",
    name: "Light Brown Jacket",
    price: "$83.97",
    rating: "4.5",
    category: "Female's Style",
    description:
      "A stylish and comfortable light brown jacket, perfect for any season. Made from soft and breathable materials, it provides the ideal balance between warmth and lightness. Its versatile design makes it easy to pair with different outfits, from casual to sophisticated looks.",
    features: "Designed for modern wear, this light brown jacket features a minimalist and sleek design.",
    comfort: "Soft-touch fabric ensures a smooth feel against your skin, making it perfect for all-day wear.",
    material: "Crafted with a breathable cotton blend, offering durability and style in one.",
    versatility: "Great for both urban streetwear and semi-formal occasions.",
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    color: "Brown",
    mainImage: require("../assets/products/jacket-woman-1.jpg"),
    previewImages: [
      require("../assets/products/jacket-woman-1.jpg"),
      require("../assets/products/jacket-woman-2.jpg"),
      require("../assets/products/jacket-woman-3.jpg"),
    ],
  },
  {
    id: "2",
    name: "Black Leather Jacket",
    price: "$99.99",
    rating: "4.8",
    category: "Unisex Fashion",
    description: "A premium black leather jacket that combines style and durability. Crafted from high-quality materials, it offers a perfect fit and an elegant finish. Ideal for any occasion, from casual gatherings to night outs.",
    features: "Featuring functional pockets and carefully crafted details, this jacket is a must-have for any wardrobe.",
    comfort: "Its lined interior provides extra comfort, while its timeless design ensures it never goes out of style.",
    material: "Made from premium black leather, this jacket combines style and durability for long-lasting wear.",
    versatility: "Perfect for casual and formal occasions, it pairs well with jeans or dress pants.",
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    color: "Black",
    mainImage: require("../assets/products/jacket-men-1.jpg"),
    previewImages: [
      require("../assets/products/jacket-men-1.jpg"),
      require("../assets/products/jacket-men-2.jpg"),
      require("../assets/products/jacket-men-3.jpg"),
    ],
  },
];

const recommendedProducts = [
  {
    id: "1",
    name: "Light Brown Jacket",
    price: "$83.97",
    image: require("../assets/products/jacket-woman-1.jpg"),
  },
  {
    id: "2",
    name: "Black Leather Jacket",
    price: "$99.99",
    image: require("../assets/products/jacket-men-1.jpg"),
  },
];

const normalizeSource = (img) => {
  if (typeof img === 'string') {
    return img.toLowerCase().replace(/^file:\/\//, '');
  }
  if (img?.uri) {
    return img.uri.toLowerCase().replace(/^file:\/\//, '');
  }
  return null;
};

const isSameImage = (img1, img2) => {
  const src1 = normalizeSource(img1);
  const src2 = normalizeSource(img2);
  return src1 !== null && src2 !== null && src1 == src2;
};

export default function ProductDetails( ) {

  const { id } = useLocalSearchParams();
  
  const product = products.find((p) => p.id === id);

  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  
  const [selectedSize, setSelectedSize] = useState("S");

  const [isFilled, setIsFilled] = useState(false);
  
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scaleValue, {
        toValue: 0.8,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    setIsFilled(!isFilled);
  };

  const getInitialMainImage = () =>
    product && (product.mainImage || (product.previewImages && product.previewImages[0]) || null);

  const [mainImage, setMainImage] = useState(getInitialMainImage());

  const previewImages = (product?.previewImages || []).map((img, index) => ({
    image: img,
    key: index.toString(),
  }));

  const [selectedImageKey, setSelectedImageKey] = useState(
    previewImages.find(({ image }) => isSameImage(mainImage, image))?.key || previewImages[0]?.key
  );
  
  const handlePreviewPress = (img, key) => {
    setMainImage(img);
    setSelectedImageKey(key);
  };
  
  useFocusEffect(
    useCallback(() => {
      const refreshedImage = getInitialMainImage();
      setMainImage(refreshedImage);
      const initialKey = previewImages.find(({ image }) => isSameImage(refreshedImage, image))?.key || previewImages[0]?.key;
      setSelectedImageKey(initialKey);
    }, [id])
  );

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
      {/* Header Back Button */}
      <View style={styles.header}>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.backButton} activeOpacity={0.8}>
            <FontAwesome name="arrow-left" size={20} color="#4b5563" />
          </TouchableOpacity>
        </Link>
      </View>
      {/* Content Message*/}
      <View style={styles.content}>
        <Text style={styles.title}>
          Oops! We couldn't find that product
        </Text>
        <Text style={styles.subtitle}>
          Looks like this item got away. Check out these great alternatives instead!
        </Text>
        {/* Trending Content*/}
        <View style={styles.trendingContainer}>
          <Text style={styles.trendingTitle}>Trending products</Text>
          <View
            style={styles.scrollContainer}
          >
            {recommendedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/productDetails?id=${product.id}`}
                asChild
              >
                <TouchableOpacity style={styles.productCard} activeOpacity={0.8}>
                  <Image
                    source={product.image}
                    style={[styles.productImage, { width: 160, height: 160 }]}
                  />
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>{product.price}</Text>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
    <StatusBar translucent backgroundColor="transparent" />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        style={styles.scrollView}
      >
        <View style={styles.containerFull}>
      <Link href="/" asChild>
        <TouchableOpacity style={styles.backButtonFull}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </Link>
      <Text style={styles.titleFull}>Product Details</Text>
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <TouchableOpacity
          style={[styles.heartButton, isFilled ? styles.filledHeart : styles.emptyHeart]}
          onPress={handlePress}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <FontAwesome
            name={isFilled ? "heart" : "heart-o"}
            size={24}
            color={isFilled ? "#dc2626" : "#1f2937"}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>

    {mainImage && (
        <Image
          source={mainImage}
          style={styles.mainImage}
          onError={() => console.warn('Failed to load main image')}
        />
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.previewScrollView}
      >
        {previewImages.map(({ image, key }) => {
          const isActive = key == selectedImageKey;
          return (
            <TouchableOpacity
              key={key}
              onPress={() => handlePreviewPress(image, key)}
              style={[
                styles.previewImageContainer,
                isActive ? styles.activePreviewBorder : styles.inactivePreviewBorder,
              ]}
              activeOpacity={0.8}
            >
              <Image
                source={image}
                style={styles.previewImage}
                onError={() => console.warn('Failed to load preview image')}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.productInfoContainer}>
        <Text style={styles.productCategory}>{product.category}</Text>
        <View style={styles.ratingContainer}>
          <Image
            source={require("../assets/icons/star.png")}
            style={styles.starIcon}
          />
          <Text style={styles.productRating}>{product.rating}</Text>
        </View>
      </View>

      <Text style={styles.productNameFull}>{product.name}</Text>

      <Text style={styles.sectionTitle}>Product Details</Text>
      <Text style={styles.productDescription}>{product.description}
        {/* Read More Text */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.readMoreText}> Read more</Text>
      </TouchableOpacity>
       {/* Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>More Information</Text>
            <Text style={styles.sectionTitleModal}>Features</Text>
              <Text style={styles.modalText}>{product.features}</Text>

              <Text style={styles.sectionTitleModal}>Comfort & Fit</Text>
              <Text style={styles.modalText}>{product.comfort}</Text>

              <Text style={styles.sectionTitleModal}>Material & Quality</Text>
              <Text style={styles.modalText}>{product.material}</Text>

              <Text style={styles.sectionTitleModal}>Versatility</Text>
              <Text style={styles.modalText}>{product.versatility}</Text>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </Text>

      <Text style={styles.sectionTitle}>Select Size</Text>
      <View style={styles.sizeContainer}>
        {product.sizes.map((size) => {
          const isSelected = selectedSize === size;
          return (
            <TouchableOpacity
              key={size}
              onPress={() => setSelectedSize(size)}
              style={[
                styles.sizeButton,
                isSelected ? styles.selectedSizeButton : styles.unselectedSizeButton,
              ]}
            >
              <Text style={isSelected ? styles.selectedSizeText : styles.unselectedSizeText}>
                {size}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.sectionTitle}>Select Color: {product.color}</Text>
      </ScrollView>

      <View style={styles.bottomBar}>
      <View style={styles.bottomBarContent}>
        <View>
          <Text style={styles.totalPriceLabel}>Total Price</Text>
          <Text style={styles.totalPriceValue}>{product.price}</Text>
        </View>
        <TouchableOpacity style={styles.addToCartButton} activeOpacity={0.8}>
          <FontAwesome name="shopping-bag" size={24} color="#fff" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Empty Product
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',        
    alignItems: 'center',       
    justifyContent: 'space-between', 
    marginBottom: 32,            
    paddingTop: 16,              
    marginHorizontal: 16,        
  },
  backButton: {
    backgroundColor: '#f9fafb',
    padding: 12,               
    borderRadius: 9999,        
  },
  content: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',     
    marginHorizontal: 16,     
  },
  title: {
    fontSize: 24,             
    fontWeight: 'bold',       
    color: '#1f2937',         
    marginBottom: 8,          
    textAlign: 'center',      
  },
  subtitle: {
    fontSize: 18,            
    color: '#4b5563',         
    textAlign: 'center',      
    marginBottom: 32,         
    paddingHorizontal: 32,    
  },
  trendingContainer: {
    width: '100%',            
    marginBottom: 32,        
  },
  trendingTitle: {
    fontSize: 20,             
    fontWeight: '600',        
    color: '#1f2937',         
    marginBottom: 16,         
  },
  scrollContainer: {
    flexDirection: 'row',     
    justifyContent: 'space-between', 
  },
  productCard: {
    borderRadius: 12,         
    alignItems: 'center',
  },
  productImage: {
    borderRadius: 8,          
    marginBottom: 8,          
  },
  productName: {
    fontWeight: '500',        
    color: '#1f2937',       
    textAlign: 'center',
  },
  productPrice: {
    color: '#6a4c38',         
    fontWeight: 'bold',      
    textAlign: 'center',
  },

  // Float Button
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,            
    borderWidth: 1,         
    borderColor: '#e5e7eb',  
  },
  bottomBarContent: {
    flexDirection: 'row',       
    alignItems: 'center',      
    justifyContent: 'space-between', 
  },
  totalPriceLabel: {
    fontSize: 12,         
    color: '#6b7280',    
  },
  totalPriceValue: {
    fontSize: 18,         
    fontWeight: '600',   
    color: '#1f2937',     
  },
  addToCartButton: {
    backgroundColor: '#78350f', 
    paddingVertical: 12,       
    paddingHorizontal: 32,      
    borderRadius: 9999,         
    width: '70%',               
    flexDirection: 'row',       
    alignItems: 'center',       
    justifyContent: 'center',   
  },
  addToCartText: {
    color: '#fff',  
    marginLeft: 8,   
  },
  // Header
  containerFull: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  backButtonFull: {
    backgroundColor: '#f9fafb', 
    padding: 8, 
    borderRadius: 9999,
  },
  titleFull: {
    fontSize: 18,
    fontWeight: '600',
    backgroundColor: '#ffffff7a',
  },
  heartButton: {
    padding: 8, 
    borderRadius: 9999, 
  },
  filledHeart: {
    backgroundColor: '#fee2e2', 
  },
  emptyHeart: {
    backgroundColor: '#f9fafb',
  },
  // Images and content
  mainImage: {
    width: 450,
    height: 450,
    borderRadius: 8, 
    marginTop: 16, 
    top: -90, 
    alignSelf: 'center', 
  },
  previewScrollView: {
    marginTop: 16,
    top: -180, 
    borderRadius: 6,
    alignSelf: 'center', 
  },
  previewImageContainer: {
    borderWidth: 4, 
    borderRadius: 6, 
  },
  activePreviewBorder: {
    borderColor: '#78350f', 
  },
  inactivePreviewBorder: {
    borderColor: '#ffffff', 
  },
  previewImage: {
    width: 48,
    height: 48,
    borderRadius: 6,
  },
  productInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -140, 
  },
  productCategory: {
    marginHorizontal: 16, 
    color: '#6b7280', 
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  starIcon: {
    width: 12,
    height: 12,
  },
  productRating: {
    color: '#6b7280', 
  },
  productNameFull: {
    fontSize: 20, 
    fontWeight: '600', 
    marginTop: 16, 
    marginHorizontal: 16, 
  },
  sectionTitle: {
    fontWeight: '700', 
    marginTop: 16,
    marginHorizontal: 16, 
  },
  productDescription: {
    marginTop: 8, 
    marginHorizontal: 16, 
    color: '#374151', 
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb', 
    paddingBottom: 16, 
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8, 
    marginHorizontal: 16, 
  },
  sizeButton: {
    padding: 8, 
    borderRadius: 6, 
    margin: 4, 
  },
  selectedSizeButton: {
    backgroundColor: '#78350f',
  },
  unselectedSizeButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1, 
    borderColor: '#e5e7eb', 
  },
  selectedSizeText: {
    color: '#ffffff', 
  },
  unselectedSizeText: {
    color: '#000000', 
  },
  //Main
  safeArea: {
    flex: 1, 
    backgroundColor: '#ffffff', 
  },
  scrollView: {
    backgroundColor: '#ffffff', 
    marginBottom: 82, 
  },
  scrollViewContent: {
    paddingBottom: 20, 
  },
  //Read More
  readMoreText: {
    color: "#78350f",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: 'sans-serif'
  },
  sectionTitleModal: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    fontFamily: 'sans-serif'
  },
  modalText: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    fontFamily: 'sans-serif'
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#78350f",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    fontFamily: 'sans-serif'
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});