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
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

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
    title: "New Collection",
    subtitle: "Discount 50% for\n first transaction",
    button: "Shop Now",
    img: require("../assets/banners/banner2.jpg"),
  },
  {
    id: "3",
    title: "New Collection",
    subtitle: "Discount 50% for\n first transaction",
    button: "Shop Now",
    img: require("../assets/banners/banner3.jpg"),
  },
  {
    id: "4",
    title: "New Collection",
    subtitle: "Discount 50% for\n first transaction",
    button: "Shop Now",
    img: require("../assets/banners/banner4.jpg"),
  },
  {
    id: "5",
    title: "New Collection",
    subtitle: "Discount 50% for\n first transaction",
    button: "Shop Now",
    img: require("../assets/banners/banner5.jpg"),
  },
];

const products = [
  {
    id: "1",
    name: "Light Brown Jacket",
    price: "$83.97",
    image: require("../assets/products/jacket-woman-1.jpg"),
    tags: ["Newest", "Woman"], 
  },
  {
    id: "2",
    name: "Black Leather Jacket",
    price: "$99.99",
    image: require("../assets/products/jacket-men-1.jpg"),
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

  const [activeTab, setActiveTab] = useState("Home");
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

  return (
    <SafeAreaView style={styles.safeAreaViewMain}>
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

          <View style={styles.notificationBadge}>
            <FontAwesome name="bell" size={24} color="#5b4f45" />
          </View>
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
                  activeOpacity={1}
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
            >
              <Text style={styles.categorySeeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View>
            <View style={styles.categoryItemsContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={styles.categoryItem}
                  activeOpacity={0.7}
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
              <Text style={styles.flashSaleTimerText}>
                Closing in :<CountdownTimer targetTime={targetTime} />
              </Text>
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
                onPress={() => handlePress(tab.name)}
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

const styles = StyleSheet.create({
  safeAreaViewMain: {
    flex: 1,
  },
  scrollViewMain: {
    backgroundColor: "#fff",
    padding: 4,
    marginBottom: 80,
  },
  //Header
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 50,
  },
  locationWrapper: {
    position: "relative",
    zIndex: 50,
  },
  locationLabel: {
    fontSize: 12,
    fontFamily: "sans-serif",
    color: "#4b5563",
  },
  locationSelector: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  selectedLocationText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    marginLeft: 4,
    marginRight: 4,
  },
  dropdownIcon: {
    marginLeft: 4,
  },
  dropdownContainer: {
    position: "absolute",
    top: 48,
    left: 0,
    backgroundColor: "#fff",
    width: 192,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingVertical: 8,
    zIndex: 50,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#374151",
  },
  selectedDropdownText: {
    color: "#78350f",
    fontWeight: "600",
  },
  notificationBadge: {
    backgroundColor: "#f9fafb",
    padding: 8,
    borderRadius: 9999,
  },
  // Search
  searchBarContainer: {
    marginVertical: 16, // my-4
    flexDirection: "row", // flex-row
    alignItems: "center", // items-center
  },
  searchInputWrapper: {
    flexDirection: "row", // flex-row
    alignItems: "center", // items-center
    flex: 1, // flex-1
    borderColor: "#e5e7eb", // border-gray-200
    borderWidth: 1, // border
    borderRadius: 12, // rounded-xl
    paddingHorizontal: 16, // px-4
    paddingVertical: 8, // py-2
    backgroundColor: "#fff", // bg-white
  },
  searchInput: {
    marginLeft: 8, // ml-2
    fontSize: 16, // text-base
    color: "#1f2937", // text-gray-800
    flex: 1, // flex-1
  },
  settingsButton: {
    marginLeft: 8, // ml-2
    backgroundColor: "#78350f", // bg-yellow-900
    borderRadius: 8, // rounded-lg
    paddingHorizontal: 12, // px-3
    paddingVertical: 8, // py-2
  },
  settingsIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  // Banner
  carouselContainer: {
    marginTop: 16, // mt-4
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8, // rounded-lg
    justifyContent: "center",
    padding: 16, // p-4
  },
  bannerImageOverlay: {
    borderRadius: 8,
  },
  bannerTextTitle: {
    fontSize: 18, // text-lg
    fontWeight: "700", // font-bold
    color: "#ffffff", // text-white
  },
  bannerTextSubtitle: {
    fontSize: 14, // text-sm
    color: "#ffffff", // text-white
    marginTop: 4,
  },
  bannerButton: {
    marginTop: 8, // mt-2
    backgroundColor: "#78350f", // bg-yellow-900
    padding: 8, // p-2
    borderRadius: 6, // rounded-md
    alignSelf: "flex-start", // w-fit
  },
  bannerButtonText: {
    color: "#ffffff", // text-white
    textAlign: "center",
  },
  paginationContainer: {
    flexDirection: "row", // flex-row
    justifyContent: "center", // justify-center
    marginTop: 8, // mt-2
  },
  paginationDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "#000000",
    marginHorizontal: 4,
  },
  // Contenedor general de la pantalla
  screenSection: {
    marginTop: 24, // mt-6
  },
  // Encabezado de Categorías
  categoryHeaderRow: {
    flexDirection: "row", // flex-row
    justifyContent: "space-between", // justify-between
    alignItems: "center", // items-center
    marginHorizontal: 16, // mx-4
  },
  categoryTitle: {
    fontSize: 18, // text-lg
    fontWeight: "600", // font-semibold
    color: "#1f2937", // text-gray-800
  },
  categorySeeAllButton: {
    flexDirection: "row", // flex-row
    alignItems: "center", // items-center
  },
  categorySeeAllText: {
    fontSize: 14, // text-sm
    color: "#78350f", // text-amber-900
    fontWeight: "500", // font-medium
  },
  // Lista de Categorías
  categoryItemsContainer: {
    flexDirection: "row", // flex-row
    flexWrap: "wrap", // flex-wrap
    justifyContent: "space-between", // justify-between
    marginTop: 16, // mt-4
    marginHorizontal: 16,
  },
  categoryItem: {
    alignItems: "center", // items-center
    width: "25%", // w-1/4
    marginBottom: 16, // mb-4
  },
  categoryIconWrapper: {
    backgroundColor: "#faf1ef", // bg-amber-50
    padding: 8, // p-2
    borderRadius: 9999, // rounded-full
    width: 56, // w-14 (14 * 4)
    height: 56, // h-14
    justifyContent: "center",
    alignItems: "center",
  },
  categoryIconImage: {
    width: 24, // inline override
    height: 24,
  },
  categoryItemTitle: {
    marginTop: 8, // mt-2
    fontSize: 12, // text-xs
    color: "#4b5563", // text-gray-600
    textAlign: "center", // text-center
  },
  // Sección Flash Sale
  flashSaleSection: {
    marginTop: 24, // mt-6
    paddingHorizontal: 16, // px-4
  },
  flashSaleHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flashSaleTitle: {
    fontSize: 18, // text-lg
    fontWeight: "600", // font-semibold
    color: "#000", // color predeterminado
  },
  flashSaleTimerText: {
    fontSize: 12, // text-xs
    color: "#6b7280", // text-gray-500
    display: 'flex',
    alignItems: 'center'
  },
  filterScrollView: {
    marginTop: 16, // mt-4
  },
  filterRow: {
    flexDirection: "row",
  },
  filterButtonWrapper: {
    // Se controla el margen derecho de forma condicional
  },
  filterButton: {
    paddingHorizontal: 16, // px-4
    paddingVertical: 8, // py-2
    borderRadius: 9999, // rounded-full
  },
  filterButtonActive: {
    backgroundColor: "#78350f", // bg-amber-900
  },
  filterButtonInactive: {
    borderWidth: 1,
    borderColor: "#e5e7eb", // border-gray-200
  },
  filterButtonText: {
    fontSize: 14, // text-sm
  },
  filterButtonTextActive: {
    color: "#fff", // text-white
  },
  filterButtonTextInactive: {
    color: "#374151", // text-gray-700
  },
  // Grid de Productos
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  productCard: {
    width: "48%", // w-[48%]
    marginVertical: 16, // my-4
    backgroundColor: "#fff", // bg-white
    padding: 8, // p-2
    borderRadius: 12, // rounded-xl (aprox.)
    alignItems: "center", // items-center
  },
  productImage: {
    width: 160,
    height: 160,
    borderRadius: 8, // rounded-lg
    marginBottom: 8, // mb-2
  },
  productName: {
    color: "#1f2937", // text-gray-800
    fontWeight: "600", // font-semibold
    textAlign: "center",
  },
  productPrice: {
    color: "#78350f", // text-amber-900
    fontWeight: "bold", // font-bold
    textAlign: "center",
    marginTop: 4, // mt-1
  },
  productTagsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8, // mt-2
  },
  productTag: {
    paddingHorizontal: 8, // px-2
    paddingVertical: 4, // py-1
    backgroundColor: "#faf1ef", // bg-amber-50
    borderRadius: 9999, // rounded-full
    marginRight: 4, // separación entre etiquetas
  },
  productTagText: {
    fontSize: 12, // text-xs
    color: "#78350f", // text-amber-900
  },
  // Mensaje de Productos No Encontrados
  noProductsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 48, // mt-12
  },
  noProductsText: {
    color: "#6b7280", // text-gray-500
    fontSize: 18, // text-lg
    marginTop: 16, // mt-4
    textAlign: "center",
  },
  // Barra de Navegación Inferior
  bottomNavWrapper: {
    position: "absolute", // No existe "sticky" en RN, se usa absolute
    bottom: 16, // m-4
    left: 16,
    right: 16,
  },
  bottomNavBar: {
    backgroundColor: "#1f1f2b", // bg-black
    borderRadius: 9999, // rounded-full
    padding: 12, // p-3
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // Sombra (iOS y Android)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomNavItem: {
    alignItems: "center",
  },
  bottomNavItemButton: {
    padding: 8, // p-2
    borderRadius: 9999, // rounded-full
  },
  bottomNavItemButtonActive: {
    backgroundColor: "#faf1ef", // bg-amber-50
  },
  bottomNavIcon: {
    padding: 8, // p-2
    borderRadius: 9999, // rounded-full
  },
  bottomNavIconActive: {
    backgroundColor: "#faf1ef", // bg-amber-50
  },
  parentTimer: {
    backgroundColor: "#faf1ef", // bg-amber-50
    padding: 8, // p-2 (8px)
    borderRadius: 6, // rounded-md (~6px)
    alignItems: "center", // items-center
    marginHorizontal: 4, // mx-1 (4px)
  },
  timeChild: {
    color: "#78350f", // color-amber-900
  },
  containerTImeBox: {
    flexDirection: 'row',
  }
});
