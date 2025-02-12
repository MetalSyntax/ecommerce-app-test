import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import "./index.css";

const { width } = Dimensions.get("window");
const availableWidth = width - 32;

const banners = [
  {
    id: "1",
    title: "New Collection",
    subtitle: "Discount 50% for\n first transaction",
    button: "Shop Now",
    img: require("src/assets/img/banner1.jpg"),
  },
  {
    id: "2",
    title: "New Collection",
    subtitle: "Discount 50% for\n first transaction",
    button: "Shop Now",
    img: require("src/assets/img/banner2.jpg"),
  },
  {
    id: "3",
    title: "New Collection",
    subtitle: "Discount 50% for\n first transaction",
    button: "Shop Now",
    img: require("src/assets/img/banner3.jpg"),
  },
  {
    id: "4",
    title: "New Collection",
    subtitle: "Discount 50% for\n first transaction",
    button: "Shop Now",
    img: require("src/assets/img/banner4.jpg"),
  },
  {
    id: "5",
    title: "New Collection",
    subtitle: "Discount 50% for\n first transaction",
    button: "Shop Now",
    img: require("src/assets/img/banner5.jpg"),
  },
];

const products = [
  {
    id: "1",
    name: "Light Brown Jacket",
    price: "$83.97",
    image: require("src/assets/img/products/jacket1.jpg"),
    tags: ["Newest", "Woman"], 
  },
  {
    id: "2",
    name: "Black Leather Jacket",
    price: "$99.99",
    image: require("src/assets/img/products/jacket3.jpg"),
    tags: ["Newest", "Man"], 
  },
  {
    id: "3",
    name: "Beige Trench Coat",
    price: "$129.99",
    image: "https://placehold.co/300x400/ece1de/c9aea0?text=Trench",
    tags: ["Popular", "Woman"], 
  },
  {
    id: "4",
    name: "Navy Blue Blazer",
    price: "$149.95",
    image: "https://placehold.co/300x400/ece1de/c9aea0?text=Blazer",
    tags: ["Popular", "Man"], 
  }
];

const filterProducts = (products, activeFilter) => {
  if (activeFilter === "All") return products;
  return products.filter(product => product.tags.includes(activeFilter));
};

const filters = ["All", "Newest", "Popular", "Man", "Woman"];

const CountdownTimer = ({ targetTime }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetTime - now;
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const renderTimeBox = (value, label) => (
    <View className="bg-amber-50 p-2 rounded-md items-center mx-1">
      <Text className="color-amber-900">{String(value).padStart(2, "0")}</Text>
    </View>
  );

  return (
    <View className="flex-row">
      {renderTimeBox(timeLeft.hours, "Hrs")}
      {renderTimeBox(timeLeft.minutes, "Min")}
      {renderTimeBox(timeLeft.seconds, "Sec")}
    </View>
  );
};  

export default function Home() {
  const { top } = useSafeAreaInsets();

  const categories = [
    { id: "1", title: "T-Shirt", icon: require("../assets/icons/tshirt.png") },
    { id: "2", title: "Pant", icon: require("../assets/icons/pant.png") },
    { id: "3", title: "Dress", icon: require("../assets/icons/dress.png") },
    { id: "4", title: "Jacket", icon: require("../assets/icons/jacket.png") },
  ];

  const targetTime = new Date();
  targetTime.setHours(targetTime.getHours() + 1);

  const [selectedFilter, setSelectedFilter] = useState("Newest");

  const scrollViewRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);

  const onMomentumScrollEnd = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / availableWidth);
    setCurrentIndex(index);
    currentIndexRef.current = index;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndexRef.current + 1;
      if (nextIndex >= banners.length) {
        nextIndex = 0;
      }
      scrollViewRef.current?.scrollTo({
        x: nextIndex * availableWidth,
        animated: true,
      });
      setCurrentIndex(nextIndex);
      currentIndexRef.current = nextIndex;
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const [activeTab, setActiveTab] = useState('Home');
  const scaleValue = new Animated.Value(1);

  const handlePress = (tabName) => {
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
      })
    ]).start(() => setActiveTab(tabName));
  };

  const tabs = [
    { name: 'Home', icon: 'home' },
    { name: 'Shop', icon: 'shopping-bag' },
    { name: 'Like', icon: 'heart-o' },
    { name: 'Message', icon: 'commenting-o' },
    { name: 'Profile', icon: 'user-circle-o' }
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('New York, USA');
  const rotateAnim = useState(new Animated.Value(0))[0];
  
  const cities = [
    'New York, USA',
    'Miami, USA',
    'California, USA'
  ];

  const toggleDropdown = () => {
    Animated.timing(rotateAnim, {
      toValue: isDropdownOpen ? 0 : 1,
      duration: 200,
      useNativeDriver: true
    }).start();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  const handleSelect = (city) => {
    setSelectedLocation(city);
    toggleDropdown();
  };

  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProducts = filterProducts(products, selectedFilter).filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ScrollView style={{ paddingTop: top }} className="bg-white p-4">
      
      <View className="flex-row justify-between items-center z-50">
      <View className="relative z-50">
        <Text className="text-xs font-regular text-gray-600">Location</Text>
        
        <TouchableOpacity 
          className="flex-row items-center mt-1"
          onPress={toggleDropdown}
          activeOpacity={0.8}
        >
          <FontAwesome name="map-marker" size={20} color="#5b4f45" />
          <Text className="text-lg font-bold ml-1 text-gray-800 mr-1">{selectedLocation}</Text>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <FontAwesome
              name="angle-down"
              size={20}
              color="#5b4f45"
              style={{ marginLeft: 4 }}
            />
          </Animated.View>
        </TouchableOpacity>

        {isDropdownOpen && (
          <View className="absolute top-12 left-0 bg-white w-48 rounded-lg shadow-lg py-2 z-50">
            {cities.map((city) => (
              <TouchableOpacity
                key={city}
                className="flex-row items-center px-4 py-3 hover:bg-gray-100"
                onPress={() => handleSelect(city)}
                activeOpacity={0.7}
              >
                <Text 
                  className={`ml-2 text-base ${
                    selectedLocation === city ? 'text-amber-900 font-semibold' : 'text-gray-700'
                  }`}
                >
                  {city}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View className="bg-gray-50 p-2 rounded-full">
        <FontAwesome name="bell" size={24} color="#5b4f45" />
      </View>
    </View>

      <View className="my-4 flex-row items-center">
      <View className="flex-row items-center flex-1 border-gray-200 border rounded-xl px-4 py-2 bg-white">
        <FontAwesome name="search" size={20} color="#6b7280" />
        <TextInput
          placeholder="Search products..."
          placeholderTextColor="#9ca3af"
          className="ml-2 text-base text-gray-800 flex-1"
          value={searchTerm}
          onChangeText={setSearchTerm}
          clearButtonMode="while-editing"
        />
        {searchTerm.length > 0 && (
          <TouchableOpacity onPress={() => setSearchTerm('')}>
            <FontAwesome name="times-circle" size={20} color="#9ca3af" />
          </TouchableOpacity>
        )}
      </View>
        <TouchableOpacity className="ml-2 bg-yellow-900 rounded-lg px-3 py-2">
          <Image 
          source={require('../assets/icons/setting.png')}
          style={{
            width: 24,
            height: 24,
            resizeMode: 'contain',
            }}
            />
        </TouchableOpacity>
      </View>

      <View className="mt-4">
        <View style={{ width: availableWidth, alignSelf: "center" }}>
          <Animated.ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onMomentumScrollEnd}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          >
            {banners.map((banner) => (
              <TouchableOpacity
                key={banner.id}
                style={{ width: availableWidth, height: 200 }}
                activeOpacity={1}
              >
                <ImageBackground
                  source={banner.img}
                  style={{ width: "100%", height: "100%" }}
                  className="rounded-lg justify-center p-4"
                  imageStyle={{ borderRadius: 8 }}
                >
                  <Text className="text-lg font-bold text-white">
                    {banner.title}
                  </Text>
                  <Text className="text-sm text-white">{banner.subtitle}</Text>
                  <TouchableOpacity className="mt-2 bg-yellow-900 p-2 rounded-md w-fit">
                    <Text className="text-white text-center">
                      {banner.button}
                    </Text>
                  </TouchableOpacity>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </Animated.ScrollView>
        </View>

        <View className="flex-row justify-center mt-2">
          {banners.map((_, index) => {
            const opacity = scrollX.interpolate({
              inputRange: [
                (index - 1) * availableWidth,
                index * availableWidth,
                (index + 1) * availableWidth,
              ],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={index}
                style={{
                  opacity,
                  height: 8,
                  width: 8,
                  borderRadius: 4,
                  backgroundColor: "black",
                  marginHorizontal: 4,
                }}
              />
            );
          })}
        </View>
      </View>

      <View className="mt-6">
        <View className="flex-row justify-between items-center mx-4">
          <Text className="text-lg font-semibold text-gray-800">Category</Text>
          <TouchableOpacity className="flex-row items-center">
            <Text className="text-sm text-amber-900 font-medium">See All</Text>
          </TouchableOpacity>
        </View>

        <View>
          <View className="flex-row flex-wrap justify-between mt-4">
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                className="items-center w-1/4 mb-4"
                activeOpacity={0.7}
              >
                <View className="bg-amber-50 p-2 rounded-full w-14 h-14 justify-center items-center">
                  <Image
                    source={category.icon}
                    className="w-8 h-8"
                    resizeMode="contain"
                    style={{ width: 24, height: 24 }}
                  />
                </View>
                <Text className="mt-2 text-xs text-gray-600 text-center">
                  {category.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="mt-6 px-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-semibold">Flash Sale</Text>
            <Text className="text-gray-500 text-xs">
              Closing in :<CountdownTimer targetTime={targetTime} />
            </Text>
          </View>

          <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-4"
      >
        <View className="flex-row space-x-2">
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setSelectedFilter(filter)}
              className="mr-2 last:mr-0"
            >
              <View
                className={`px-4 py-2 rounded-full ${
                  selectedFilter === filter
                    ? "bg-amber-900"
                    : "border border-gray-200"
                }`}
              >
                <Text
                  className={`text-sm ${
                    selectedFilter === filter ? "text-white" : "text-gray-700"
                  }`}
                >
                  {filter}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
        </View>

        {filteredProducts.length > 0 ? (
        <View className="flex-row flex-wrap justify-between">
          {filteredProducts.map(product => (
            <Link
            key={product.id}
            href={`/productDetails?id=${product.id}`}
            asChild
          >
            <TouchableOpacity
              key={product.id}
              className="w-[48%] my-4 bg-white p-2 rounded-xl"
            >
              <Image
                source={product.image}
                className="w-full h-40 rounded-lg mb-2"
                style={{ width: 160, height: 160 }}
                resizeMode="cover"
              />
              <Text className="text-gray-800 font-semibold text-center">{product.name}</Text>
              <Text className="text-amber-900 font-bold text-center mt-1">{product.price}</Text>
              <View className="flex-row justify-center mt-2 space-x-1">
                {product.tags.map(tag => (
                  <View key={tag} className="px-2 py-1 bg-amber-50 rounded-full">
                    <Text className="text-xs text-amber-900">{tag}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
            </Link>
          ))}
        </View>
      ) : (
        <View className="flex-1 justify-center items-center mt-12">
          <FontAwesome name="exclamation-circle" size={40} color="#d1d5db" />
          <Text className="text-gray-500 text-lg mt-4 text-center">
            No products found matching "{searchTerm}"
          </Text>
        </View>
      )}

    <View className="sticky bottom-0 left-0 right-0 m-4">
      <View className="bg-black rounded-full p-3 flex-row justify-between items-center shadow-xl">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          const iconColor = isActive ? '#614430' : '#ffffff';
          const scale = isActive ? scaleValue : 1;

          return (
            <TouchableOpacity
              key={tab.name}
              onPress={() => handlePress(tab.name)}
              activeOpacity={0.8}
              className="items-center"
            >
              <Animated.View
                className={`p-2 rounded-full ${isActive ? 'bg-amber-50' : ''}`}
                style={{ transform: [{ scale }] }}
              >
                <FontAwesome
                  name={tab.icon}
                  size={24}
                  color={iconColor}
                  className={`p-2 rounded-full ${isActive ? 'bg-amber-50' : ''}`}
                />
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>

      </View>
    </ScrollView>
  );
}
