import React, { useState, useRef, useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  StatusBar,
  Modal
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from '@react-navigation/native';
import styles from './stylesProductDetails';

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
        <FontAwesome
          name="exclamation-circle"
          size={40}
          color="#d1d5db"
        />
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
    <StatusBar barStyle='dark-content' />
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

    {/* Modal */}
    <View style={styles.modalOverlay}>
      <Modal
        transparent={true}
        animationType="fade"
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
      </View>
    </SafeAreaView>
  );
}