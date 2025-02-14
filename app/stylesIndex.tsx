import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    safeAreaViewMain: {
        flex: 1,
      },
      scrollViewMain: {
        backgroundColor: "#fff",
        paddingVertical: 4,
        marginBottom: 120,
      },
      //Header
      headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 50,
        marginHorizontal: 16,
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
        marginVertical: 16, 
        flexDirection: "row", 
        alignItems: "center", 
        marginHorizontal: 16,
      },
      searchInputWrapper: {
        flexDirection: "row", 
        alignItems: "center", 
        flex: 1,
        borderColor: "#e5e7eb",
        borderWidth: 1,
        borderRadius: 12, 
        paddingHorizontal: 16, 
        paddingVertical: 8,
        backgroundColor: "#fff", 
      },
      searchInput: {
        marginLeft: 8, 
        fontSize: 16, 
        color: "#1f2937", 
        flex: 1, 
      },
      settingsButton: {
        marginLeft: 8, 
        backgroundColor: "#704f3a", 
        borderRadius: 8,
        paddingHorizontal: 12, 
        paddingVertical: 8, 
      },
      settingsIcon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
      },
      // Banner
      carouselContainer: {
        marginTop: 16, 
      },
      bannerImage: {
        width: "100%",
        height: "100%",
        borderRadius: 8, 
        justifyContent: "center",
        padding: 16, 
      },
      bannerImageOverlay: {
        borderRadius: 8,
      },
      bannerTextTitle: {
        fontSize: 18, 
        fontWeight: "700", 
        color: "#ffffff", 
      },
      bannerTextSubtitle: {
        fontSize: 14, 
        color: "#ffffff", 
        marginTop: 4,
      },
      bannerButton: {
        marginTop: 8, 
        backgroundColor: "#704f3a", 
        padding: 8, 
        borderRadius: 6, 
        alignSelf: "flex-start", 
      },
      bannerButtonText: {
        color: "#ffffff", 
        textAlign: "center",
      },
      paginationContainer: {
        flexDirection: "row", 
        justifyContent: "center", 
        marginTop: 8, 
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
        marginTop: 24, 
      },
      // Encabezado de Categorías
      categoryHeaderRow: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginHorizontal: 16, 
      },
      categoryTitle: {
        fontSize: 18, 
        fontWeight: "600", 
        color: "#1f2937", 
      },
      categorySeeAllButton: {
        flexDirection: "row", 
        alignItems: "center", 
      },
      categorySeeAllText: {
        fontSize: 14, 
        color: "#807c77", 
        fontWeight: "500", 
      },
      // Lista de Categorías
      categoryItemsContainer: {
        flexDirection: "row", 
        flexWrap: "wrap", 
        justifyContent: "space-between", 
        marginTop: 16, 
        marginHorizontal: 16,
      },
      categoryItem: {
        alignItems: "center", 
        width: "25%", 
        marginBottom: 16, 
      },
      categoryIconWrapper: {
        backgroundColor: "#f5f3ef",
        padding: 8, 
        borderRadius: 9999, 
        width: 56, 
        height: 56,
        justifyContent: "center",
        alignItems: "center",
      },
      categoryIconImage: {
        width: 24, 
        height: 24,
      },
      categoryItemTitle: {
        marginTop: 8, 
        fontSize: 12, 
        color: "#4b5563", 
        textAlign: "center", 
      },
      // Sección Flash Sale
      flashSaleSection: {
        marginTop: 24, 
        paddingHorizontal: 16, 
      },
      flashSaleHeaderRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      flashSaleTitle: {
        fontSize: 18, 
        fontWeight: "600", 
        color: "#000", 
      },
      flashSaleTimerText: {
        fontSize: 12, 
        color: "#6b7280", 
        display: 'flex',
        alignItems: 'center'
      },
      filterScrollView: {
        marginTop: 16, 
      },
      filterRow: {
        flexDirection: "row",
      },
      filterButtonWrapper: {
    
      },
      filterButton: {
        paddingHorizontal: 16, 
        paddingVertical: 8, 
        borderRadius: 9999, 
      },
      filterButtonActive: {
        backgroundColor: "#704f3a", 
      },
      filterButtonInactive: {
        borderWidth: 1,
        borderColor: "#e5e7eb",
      },
      filterButtonText: {
        fontSize: 14,
      },
      filterButtonTextActive: {
        color: "#fff", 
      },
      filterButtonTextInactive: {
        color: "#374151",
      },
      // Grid de Productos
      productGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginHorizontal: 16,
      },
      productCard: {
        width: "48%", 
        marginVertical: 16, 
        backgroundColor: "#fff", 
        padding: 8, 
        borderRadius: 12, 
        alignItems: "center", 
      },
      productImage: {
        width: 160,
        height: 160,
        borderRadius: 8, 
        marginBottom: 8, 
      },
      productName: {
        color: "#1f2937", 
        fontWeight: "600", 
        textAlign: "center",
      },
      productPrice: {
        color: "#78350f", 
        fontWeight: "bold", 
        textAlign: "center",
        marginTop: 4,
      },
      productTagsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 8,
      },
      productTag: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: "#faf1ef", 
        borderRadius: 9999,
        marginRight: 4, 
      },
      productTagText: {
        fontSize: 12, 
        color: "#78350f", 
      },
      // Mensaje de Productos No Encontrados
      noProductsContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 48, 
      },
      noProductsText: {
        color: "#6b7280", 
        fontSize: 18, 
        marginTop: 16, 
        textAlign: "center",
      },
      // Barra de Navegación Inferior
      bottomNavWrapper: {
        position: "absolute", 
        bottom: 16, 
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
        padding: 8,
        borderRadius: 9999, 
      },
      bottomNavItemButtonActive: {
        backgroundColor: "#fcfffe", 
      },
      bottomNavIcon: {
        padding: 8, 
        borderRadius: 9999, 
      },
      bottomNavIconActive: {
        backgroundColor: "#fcfffe", 
      },
      parentTimer: {
        backgroundColor: "#e6e1d5", 
        padding: 8,
        borderRadius: 6,
        alignItems: "center", 
        marginHorizontal: 4, 
      },
      timeChild: {
        color: "#7f7367", 
      },
      containerTImeBox: {
        flexDirection: 'row',
      }
});