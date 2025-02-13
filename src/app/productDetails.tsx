import React, { useState, useRef, useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated
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
    mainImage: require("src/assets/img/products/jacket1.jpg"),
    previewImages: [
      require("src/assets/img/products/jacket1.jpg"),
      require("src/assets/img/products/jacket2.jpg"),
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
    mainImage: require("src/assets/img/products/jacket3.jpg"),
    previewImages: [
      require("src/assets/img/products/jacket3.jpg"),
      require("src/assets/img/products/jacket4.jpg"),
    ],
  },
];

const recommendedProducts = [
  {
    id: "1",
    name: "Light Brown Jacket",
    price: "$83.97",
    image: require("src/assets/img/products/jacket1.jpg"),
  },
  {
    id: "2",
    name: "Black Leather Jacket",
    price: "$99.99",
    image: require("src/assets/img/products/jacket3.jpg"),
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
      <SafeAreaView className="flex-1 bg-white px-4">
        <View className="flex-row items-center justify-between mb-8 pt-4 mx-4">
          <Link href="/" asChild>
            <TouchableOpacity className="bg-gray-50 p-3 rounded-full" activeOpacity={0.8}>
              <FontAwesome name="arrow-left" size={20} color="#4b5563" />
            </TouchableOpacity>
          </Link>
        </View>
        <View className="flex-1 justify-center items-center mx-4">
          <Text className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Oops! We couldn't find that product
          </Text>
          <Text className="text-lg text-gray-600 text-center mb-8 px-8">
            Looks like this item got away. Check out these great alternatives instead!
          </Text>
          <View className="w-full mb-8">
            <Text className="text-xl font-semibold text-gray-800 mb-4">Trending products</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row justify-center">
              {recommendedProducts.map((product) => (
                <Link key={product.id} href={`/productDetails?id=${product.id}`} asChild>
                  <TouchableOpacity className="rounded-xl p-4 mr-4" activeOpacity={0.8}>
                    <Image source={product.image} style={{ width: 160, height: 160 }} className="w-32 h-32 rounded-lg mb-2" />
                    <Text className="font-medium text-gray-800 text-center">{product.name}</Text>
                    <Text className="text-primary font-bold text-center">{product.price}</Text>
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
    <SafeAreaView className="flex-1 bg-white">

      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        className="bg-white"
      >
        <View className="flex-row items-center justify-between z-10 mx-4 my-4">
          <Link href="/" asChild>
            <TouchableOpacity className="bg-gray-50 p-2 rounded-full">
              <FontAwesome name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
          </Link>
          <Text className="text-lg font-semibold">Product Details</Text>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <TouchableOpacity
              className={`p-2 rounded-full ${
                isFilled ? "bg-red-50" : "bg-gray-50"
              }`}
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

        {mainImage && (<Image
          source={mainImage}
          style={{ width: 450, height: 600 }}
          className="w-full h-auto rounded-lg mt-4 relative top-[-90px]"
          onError={() => console.warn('Failed to load main image')}
        />
        )}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex justify-center mt-4 relative top-[-180px] rounded-md"
        >
          {previewImages.map(({ image, key }) => {
            const isActive = key == selectedImageKey;
            return (
            <TouchableOpacity
              key={key}
              onPress={() =>  handlePreviewPress(image, key)}
              className={`border-4 rounded-md ${isActive ? 'border-amber-900' : 'border-white'}`}
              activeOpacity={0.8}
            >
              <Image
                source={image}
                style={{ width: 48, height: 48 }}
                className="w-10 h-10 rounded-md"
                onError={() => console.warn('Failed to load preview image')}
              />
            </TouchableOpacity>
           );
          })}
        </ScrollView>

        <View className="flex-row items-center justify-between -mt-[140px]">
          <Text className="mx-4 text-gray-500">{product.category}</Text>
          <Text className="text-gray-500 mx-4">
            <Image
              source={require("../assets/icons/star.png")}
              style={{
                width: 12,
                height: 12
              }}
            />
            {product.rating}
          </Text>
        </View>

        <Text className="text-xl font-semibold mt-4 mx-4">{product.name}</Text>

        <Text className="mt-4 font-bold mx-4">Product Details</Text>
        <Text className="mt-2 mx-4 text-gray-700 border-b pb-4 border-gray-200">
          {product.description}
        </Text>

        <Text className="mt-4 font-bold mx-4">Select Size</Text>
        <View className="flex-row mt-2 flex-wrap justify-between mx-4">
          {product.sizes.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <TouchableOpacity
                key={size}
                onPress={() => setSelectedSize(size)}
                className={`p-2 rounded-md m-1 ${
                  isSelected
                    ? "bg-amber-900"
                    : "bg-white border border-gray-200"
                }`}
              >
                <Text className={`${isSelected ? "text-white" : "text-black"}`}>
                  {size}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text className="mt-4 mx-4 font-bold">
          Select Color: {product.color}
        </Text>
      </ScrollView>

      <View className="sticky bottom-0 left-0 right-0 bg-white p-4 border border-gray-200">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-xs text-gray-500">Total Price</Text>
            <Text className="text-lg font-semibold text-gray-800">
              {product.price}
            </Text>
          </View>
          <TouchableOpacity className="bg-yellow-900 py-3 px-8 rounded-full w-[70%] flex-row items-center justify-center">
            <FontAwesome name="shopping-bag" size={24} color="white" />
            <Text className="text-white ml-2">Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
