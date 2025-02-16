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
  StatusBar,
  TouchableWithoutFeedback
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./stylesIndex";

const { width } = Dimensions.get("window");

const availableWidth = width - 32;

const banners = [
  {
    id: "1",
    title: "New Collection",
    subtitle: "Discount 50% for\n first transaction",
    button: "Shop Now",
    img: require("../assets/banners/banner1.jpg"),
  },
  {
    id: "2",
    title: "Latest Trends",
    subtitle: "Save 40% on\n all new arrivals today",
    button: "Shop Now",
    img: require("../assets/banners/banner2.jpg"),
  },
  {
    id: "3",
    title: "Trending Styles",
    subtitle: "Enjoy 30% off\n on select items all week",
    button: "Shop Now",
    img: require("../assets/banners/banner3.jpg"),
  },
  {
    id: "4",
    title: "Modern Classics",
    subtitle: "Grab 45% off\n on top selections today",
    button: "Shop Now",
    img: require("../assets/banners/banner4.jpg"),
  },
  {
    id: "5",
    title: "Exclusive Drops",
    subtitle: "Get 35% off\n when you shop online today",
    button: "Shop Now",
    img: require("../assets/banners/banner5.jpg"),
  },
];

const products = [
  {
    id: "1",
    name: "Light Brown Jacket",
    price: "$83.97",
    image: require("../assets/products/jacket-woman-1.png"),
    tags: ["Newest", "Woman"],
  },
  {
    id: "2",
    name: "Black Leather Jacket",
    price: "$99.99",
    image: require("../assets/products/jacket-men-1.png"),
    tags: ["Newest", "Man"],
  },
  {
    id: "3",
    name: "Beige Trench Coat",
    price: "$129.99",
    image: require("../assets/products/placeholder-image.jpg"),
    tags: ["Popular", "Woman"],
  },
  {
    id: "4",
    name: "Navy Blue Blazer",
    price: "$149.95",
    image: require("../assets/products/placeholder-image.jpg"),
    tags: ["Popular", "Man"],
  },
];

const categories = [
  { id: "1", title: "T-Shirt", icon: require("../assets/icons/tshirt.png") },
  { id: "2", title: "Pant", icon: require("../assets/icons/pant.png") },
  { id: "3", title: "Dress", icon: require("../assets/icons/dress.png") },
  { id: "4", title: "Jacket", icon: require("../assets/icons/jacket.png") },
];

const filterProducts = (products, activeFilter) => {
  if (activeFilter === "All") return products;
  return products.filter((product) => product.tags.includes(activeFilter));
};

const filters = ["All", "Newest", "Popular", "Man", "Woman", "Kids"];

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

  const renderTimeBox = (value) => (
    <View style={styles.parentTimer}>
      <Text style={styles.timeChild}>{String(value).padStart(2, "0")}</Text>
    </View>
  );

  return (
    <View style={styles.containerTImeBox}>
      {renderTimeBox(timeLeft.hours, "Hrs")}
      {renderTimeBox(timeLeft.minutes, "Min")}
      {renderTimeBox(timeLeft.seconds, "Sec")}
    </View>
  );
};

export default function Home() {
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

  const [activeTab, setActiveTab] = useState("Home");

  const scaleValue = new Animated.Value(1);

  const handlePressNav = (tabName: string) => {
    Animated.sequence([
      Animated.spring(scaleValue, {
        toValue: 0.8,
        friction: 2,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 2,
        useNativeDriver: true,
      }),
    ]).start(() => setActiveTab(tabName));
  };

  const tabs = [
    { name: "Home", icon: "home" },
    { name: "Shop", icon: "shopping-bag" },
    { name: "Like", icon: "heart-o" },
    { name: "Message", icon: "commenting-o" },
    { name: "Profile", icon: "user-circle-o" },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState("New York, USA");

  const rotateAnim = useState(new Animated.Value(0))[0];

  const cities = ["New York, USA", "Miami, USA", "California, USA"];

  const toggleDropdown = () => {
    Animated.timing(rotateAnim, {
      toValue: isDropdownOpen ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const handleSelect = (city) => {
    setSelectedLocation(city);
    toggleDropdown();
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = filterProducts(products, selectedFilter).filter(
    (product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [showBadge, setShowBadge] = useState(false);

  const handlePressNotfication = () => {
    setShowBadge((prev) => !prev);
  };

  const closeBadge = () => {
    setShowBadge(false);
  };


  return (
    <SafeAreaView style={styles.safeAreaViewMain}>
      <StatusBar
        animated={true}
        backgroundColor="#FFF"
        barStyle="dark-content"
        showHideTransition="fade"
      />
      <ScrollView style={styles.scrollViewMain}>
        <View style={styles.headerContainer}>
          <View style={styles.locationWrapper}>
            <Text style={styles.locationLabel}>Location</Text>

            <TouchableOpacity
              style={styles.locationSelector}
              onPress={toggleDropdown}
              activeOpacity={0.8}
            >
              <FontAwesome name="map-marker" size={20} color="#5b4f45" />
              <Text style={styles.selectedLocationText}>
                {selectedLocation}
              </Text>
              <Animated.View style={{ transform: [{ rotate }] }}>
                <FontAwesome
                  name="angle-down"
                  size={20}
                  color="#5b4f45"
                  style={styles.dropdownIcon}
                />
              </Animated.View>
            </TouchableOpacity>

            {isDropdownOpen && (
              <View style={styles.dropdownContainer}>
                {cities.map((city) => (
                  <TouchableOpacity
                    key={city}
                    style={styles.dropdownItem}
                    onPress={() => handleSelect(city)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.dropdownText,
                        selectedLocation === city &&
                          styles.selectedDropdownText,
                      ]}
                    >
                      {city}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

        {showBadge && (
            <TouchableWithoutFeedback onPress={closeBadge}>
              <View style={styles.overlay} />
            </TouchableWithoutFeedback>
          )}
          <TouchableOpacity onPress={handlePressNotfication}>
            <View style={styles.notificationBadge}>
              <FontAwesome name="bell" size={24} color="#5b4f45" />
              {showBadge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>No notifications</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.searchBarContainer}>
          <View style={styles.searchInputWrapper}>
            <FontAwesome name="search" size={20} color="#6b7280" />
            <TextInput
              placeholder="Search products..."
              placeholderTextColor="#9ca3af"
              style={styles.searchInput}
              value={searchTerm}
              onChangeText={setSearchTerm}
              clearButtonMode="while-editing"
            />
            {searchTerm.length > 0 && (
              <TouchableOpacity onPress={() => setSearchTerm("")}>
                <FontAwesome name="times-circle" size={20} color="#9ca3af" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Image
              source={require("../assets/icons/setting.png")}
              style={styles.settingsIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.carouselContainer}>
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
                  style={{ width: availableWidth, aspectRatio: 16 / 9 }}
                  resizeMode="cover"
                  activeOpacity={0.95}
                >
                  <ImageBackground
                    source={banner.img}
                    style={styles.bannerImage}
                    imageStyle={styles.bannerImageOverlay}
                  >
                    <Text style={styles.bannerTextTitle}>{banner.title}</Text>
                    <Text style={styles.bannerTextSubtitle}>
                      {banner.subtitle}
                    </Text>
                    <TouchableOpacity style={styles.bannerButton}>
                      <Text style={styles.bannerButtonText}>
                        {banner.button}
                      </Text>
                    </TouchableOpacity>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </Animated.ScrollView>
          </View>

          <View style={styles.paginationContainer}>
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
                  style={[styles.paginationDot, { opacity }]}
                />
              );
            })}
          </View>
        </View>

        <View style={styles.screenSection}>
          <View style={styles.categoryHeaderRow}>
            <Text style={styles.categoryTitle}>Category</Text>
            <TouchableOpacity
              style={styles.categorySeeAllButton}
              activeOpacity={0.8}
              onPress={() => {
                setSelectedFilter("All");
              }}
            >
              <Text style={styles.categorySeeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View>
          <View style={styles.categoryItemsContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.title}
            style={styles.categoryItem}
            activeOpacity={0.7}
            onPress={() => {
              if (selectedFilter === category.title) {
                setSearchTerm("");
              } else {
                setSearchTerm(category.title.toLowerCase());
              }
            }}
          >
            <View style={styles.categoryIconWrapper}>
              <Image
                source={category.icon}
                style={styles.categoryIconImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.categoryItemTitle}>{category.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
          </View>

          <View style={styles.flashSaleSection}>
            <View style={styles.flashSaleHeaderRow}>
              <Text style={styles.flashSaleTitle}>Flash Sale</Text>
              <View style={styles.flashSaleTimerContainer}>
                <Text style={styles.flashSaleTimerText}>Closing in: </Text>
                <CountdownTimer targetTime={targetTime} />
              </View>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filterScrollView}
            >
              <View style={styles.filterRow}>
                {filters.map((filter, index) => (
                  <TouchableOpacity
                    key={filter}
                    onPress={() => setSelectedFilter(filter)}
                    activeOpacity={0.8}
                    style={[
                      styles.filterButtonWrapper,
                      { marginRight: index === filters.length - 1 ? 0 : 8 },
                    ]}
                  >
                    <View
                      style={[
                        styles.filterButton,
                        selectedFilter === filter
                          ? styles.filterButtonActive
                          : styles.filterButtonInactive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.filterButtonText,
                          selectedFilter === filter
                            ? styles.filterButtonTextActive
                            : styles.filterButtonTextInactive,
                        ]}
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
            <View style={styles.productGrid}>
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/productDetails?id=${product.id}`}
                  asChild
                >
                  <TouchableOpacity
                    style={styles.productCard}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={product.image}
                      style={styles.productImage}
                      resizeMode="cover"
                    />
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>{product.price}</Text>
                    <View style={styles.productTagsContainer}>
                      {product.tags.map((tag) => (
                        <View key={tag} style={styles.productTag}>
                          <Text style={styles.productTagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                  </TouchableOpacity>
                </Link>
              ))}
            </View>
          ) : (
            <View style={styles.noProductsContainer}>
              <FontAwesome
                name="exclamation-circle"
                size={40}
                color="#d1d5db"
              />
              <Text style={styles.noProductsText}>
                No products found matching "{searchTerm}"
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomNavWrapper}>
        <View style={styles.bottomNavBar}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.name;
            const iconColor = isActive ? "#614430" : "#ffffff";
            const scale = isActive ? scaleValue : 1;
            return (
              <TouchableOpacity
                key={tab.name}
                onPress={() => handlePressNav(tab.name)}
                activeOpacity={0.8}
                style={styles.bottomNavItem}
              >
                <Animated.View
                  style={[
                    styles.bottomNavItemButton,
                    isActive && styles.bottomNavItemButtonActive,
                    { transform: [{ scale }] },
                  ]}
                >
                  <FontAwesome
                    name={tab.icon}
                    size={24}
                    color={iconColor}
                    style={[
                      styles.bottomNavIcon,
                      isActive && styles.bottomNavIconActive,
                    ]}
                  />
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}
