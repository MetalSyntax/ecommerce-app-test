import React, { useState, useRef, useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  StyleSheet
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
      "A stylish and comfortable light brown jacket, perfect for any season.",
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
    description:
      "A premium black leather jacket that brings style and durability.",
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
      <View style={styles.header}>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.backButton} activeOpacity={0.8}>
            <FontAwesome name="arrow-left" size={20} color="#4b5563" />
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          Oops! We couldn't find that product
        </Text>
        <Text style={styles.subtitle}>
          Looks like this item got away. Check out these great alternatives instead!
        </Text>

        <View style={styles.trendingContainer}>
          <Text style={styles.trendingTitle}>Trending products</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
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
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
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
      <Text style={styles.productDescription}>{product.description}</Text>

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
    backgroundColor: '#fff', // bg-white
    paddingHorizontal: 16,   // px-4 (1rem ≈ 16px)
  },
  header: {
    flexDirection: 'row',        // flex-row
    alignItems: 'center',        // items-center
    justifyContent: 'space-between', // justify-between
    marginBottom: 32,            // mb-8 (8 x 4px)
    paddingTop: 16,              // pt-4
    marginHorizontal: 16,        // mx-4
  },
  backButton: {
    backgroundColor: '#f9fafb', // bg-gray-50
    padding: 12,               // p-3
    borderRadius: 9999,        // rounded-full
  },
  content: {
    flex: 1,
    justifyContent: 'center', // justify-center
    alignItems: 'center',     // items-center
    marginHorizontal: 16,     // mx-4
  },
  title: {
    fontSize: 24,             // text-2xl (aprox. 24px)
    fontWeight: 'bold',       // font-bold
    color: '#1f2937',         // text-gray-800
    marginBottom: 8,          // mb-2
    textAlign: 'center',      // text-center
  },
  subtitle: {
    fontSize: 18,             // text-lg (aprox. 18px)
    color: '#4b5563',         // text-gray-600
    textAlign: 'center',      // text-center
    marginBottom: 32,         // mb-8
    paddingHorizontal: 32,    // px-8
  },
  trendingContainer: {
    width: '100%',            // w-full
    marginBottom: 32,         // mb-8
  },
  trendingTitle: {
    fontSize: 20,             // text-xl (aprox. 20px)
    fontWeight: '600',        // font-semibold
    color: '#1f2937',         // text-gray-800
    marginBottom: 16,         // mb-4
  },
  scrollContainer: {
    flexDirection: 'row',     // flex-row
    justifyContent: 'center', // justify-center
  },
  productCard: {
    borderRadius: 12,         // rounded-xl (aprox. 12px)
    padding: 16,              // p-4
    marginRight: 16,          // mr-4
    alignItems: 'center',
  },
  productImage: {
    borderRadius: 8,          // rounded-lg (aprox. 8px)
    marginBottom: 8,          // mb-2
  },
  productName: {
    fontWeight: '500',        // font-medium
    color: '#1f2937',         // text-gray-800
    textAlign: 'center',
  },
  productPrice: {
    color: '#3b82f6',         // text-primary (se asume un tono azul)
    fontWeight: 'bold',       // font-bold
    textAlign: 'center',
  },

  // Float Button
  bottomBar: {
    position: 'absolute', // Emula "sticky bottom-0 left-0 right-0"
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff', // bg-white
    padding: 16,            // p-4 (16px aprox.)
    borderWidth: 1,         // border
    borderColor: '#e5e7eb',  // border-gray-200
  },
  bottomBarContent: {
    flexDirection: 'row',       // flex-row
    alignItems: 'center',       // items-center
    justifyContent: 'space-between', // justify-between
  },
  totalPriceLabel: {
    fontSize: 12,         // text-xs (aprox. 12px)
    color: '#6b7280',     // text-gray-500
  },
  totalPriceValue: {
    fontSize: 18,         // text-lg (aprox. 18px)
    fontWeight: '600',    // font-semibold
    color: '#1f2937',     // text-gray-800
  },
  addToCartButton: {
    backgroundColor: '#78350f', // bg-yellow-900 (ajusta según tu paleta)
    paddingVertical: 12,        // py-3 (aprox. 12px)
    paddingHorizontal: 32,      // px-8 (aprox. 32px)
    borderRadius: 9999,         // rounded-full
    width: '70%',               // w-[70%]
    flexDirection: 'row',       // flex-row
    alignItems: 'center',       // items-center
    justifyContent: 'center',   // justify-center
  },
  addToCartText: {
    color: '#fff',   // text-white
    marginLeft: 8,   // ml-2 (8px aprox.)
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
    backgroundColor: '#f9fafb', // bg-gray-50
    padding: 8, // p-2
    borderRadius: 9999, // rounded-full
  },
  titleFull: {
    fontSize: 18, // text-lg
    fontWeight: '600', // font-semibold
    backgroundColor: '#ffffff7a',
  },
  heartButton: {
    padding: 8, // p-2
    borderRadius: 9999, // rounded-full
  },
  filledHeart: {
    backgroundColor: '#fee2e2', // bg-red-50
  },
  emptyHeart: {
    backgroundColor: '#f9fafb', // bg-gray-50
  },
  // Images and content
  mainImage: {
    width: 450,
    height: 600,
    borderRadius: 8, // rounded-lg
    marginTop: 16, // mt-4
    top: -90, // relative top-[-90px]
    alignSelf: 'center', // mx-auto
  },
  previewScrollView: {
    marginTop: 16, // mt-4
    top: -180, // relative top-[-180px]
    borderRadius: 6, // rounded-md
    alignSelf: 'center', // Centrado horizontal, similar a "margin: 0 auto;"
  },
  previewImageContainer: {
    borderWidth: 4, // border-4
    borderRadius: 6, // rounded-md
  },
  activePreviewBorder: {
    borderColor: '#78350f', // border-amber-900
  },
  inactivePreviewBorder: {
    borderColor: '#ffffff', // border-white
  },
  previewImage: {
    width: 48,
    height: 48,
    borderRadius: 6, // rounded-md
  },
  productInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -140, // -mt-[140px]
  },
  productCategory: {
    marginHorizontal: 16, // mx-4
    color: '#6b7280', // text-gray-500
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16, // mx-4
  },
  starIcon: {
    width: 12,
    height: 12,
  },
  productRating: {
    color: '#6b7280', // text-gray-500
  },
  productNameFull: {
    fontSize: 20, // text-xl
    fontWeight: '600', // font-semibold
    marginTop: 16, // mt-4
    marginHorizontal: 16, // mx-4
  },
  sectionTitle: {
    fontWeight: '700', // font-bold
    marginTop: 16, // mt-4
    marginHorizontal: 16, // mx-4
  },
  productDescription: {
    marginTop: 8, // mt-2
    marginHorizontal: 16, // mx-4
    color: '#374151', // text-gray-700
    borderBottomWidth: 1, // border-b
    borderBottomColor: '#e5e7eb', // border-gray-200
    paddingBottom: 16, // pb-4
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8, // mt-2
    marginHorizontal: 16, // mx-4
  },
  sizeButton: {
    padding: 8, // p-2
    borderRadius: 6, // rounded-md
    margin: 4, // m-1
  },
  selectedSizeButton: {
    backgroundColor: '#78350f', // bg-amber-900
  },
  unselectedSizeButton: {
    backgroundColor: '#ffffff', // bg-white
    borderWidth: 1, // border
    borderColor: '#e5e7eb', // border-gray-200
  },
  selectedSizeText: {
    color: '#ffffff', // text-white
  },
  unselectedSizeText: {
    color: '#000000', // text-black
  },
  //
  safeArea: {
    flex: 1, // flex-1
    backgroundColor: '#ffffff', // bg-white
  },
  scrollView: {
    backgroundColor: '#ffffff', // bg-white
    marginBottom: 82, // margin bottom de 82px
  },
  scrollViewContent: {
    paddingBottom: 20, // paddingBottom: 20
  },
});