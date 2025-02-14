import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
    marginVertical: 8,          
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
    backgroundColor: '#704f38', 
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
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#ffffff7a',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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
    borderColor: '#704f38', 
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
    backgroundColor: '#704f38',
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