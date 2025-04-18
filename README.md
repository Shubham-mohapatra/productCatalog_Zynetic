


# 🛍️ Product Catalog App - Zynetic

![React Native](https://img.shields.io/badge/React_Native-2024-blue)
![Expo](https://img.shields.io/badge/Expo-50.0.0-orange)
![Platform](https://img.shields.io/badge/Platform-Android/iOS-lightgrey) 

A mobile-first product catalog app built using **React Native** and **Expo**, designed to help users view and manage product listings with a clean, vibrant UI.

---

# 🛍️ Folder Structure

ProductCatalogApp/
|
├── assets/
|   └── screenshots/
|       ├── home.jpg  
|       ├── product_detail.jpg  
|       └── search_product.jpg  
|
├── src/
|   ├── api/
|   |   └── productApi.js  
|   |
|   ├── components/
|   |   ├── ErrorView.js  
|   |   ├── ImageCarousel.js  
|   |   ├── LoadingIndicator.js  
|   |   └── ProductCard.js  
|   |
|   ├── navigation/
|   |   └── AppNavigator.js  
|   |
|   └── screens/
|       ├── ProductDetailsScreen.js  
|       └── ProductListScreen.js  
|
├── App.js  
├── app.json  
├── index.js  
├── package.json  
├── package-lock.json  
└── README.md



---

## 🚀 Setup Instructions

1. **Clone the repository and navigate to the project directory**
   ```bash
   git clone https://github.com/Shubham-mohapatra/productCatalog_Zynetic.git
   cd ProductCatalogApp
   
2. Install dependencies
   ```bash
     npm install

3. Start the Expo development server
    ```bash
      npx expo start

5. Run the app
Scan the QR code in the terminal using the Expo Go app on your Android/iOS device
Or press a to launch the Android emulator, i for iOS simulator (if configured)



## 📸 Screenshots

### 🏠 Home Screen
<img src="./assets/screenshots/home.jpg" alt="Home Screen" width="300"/>


### 📦 Product Detail Screen
<img src="./assets/screenshots/product_detail.jpg" alt="Home Screen" width="300"/>


### Search Products
<img src="./assets/screenshots/search_product.jpg" alt="Home Screen" width="300"/>

## 📝 Assumptions & Notes
- All components are modular and can be reused.
- Navigation is handled using @react-navigation/native.

## 🌟 Bonus Implementations
 - Loading Indicator while fetching products
 - Image Carousel for product images
 - Error View if product fetch fails
 - Clean UI with a professional look

## 📚 Learnings & Challenges

- Learned how to set up and use **React Navigation** in a real-world app.
- Improved understanding of modular components and reusable design patterns.
- Understood Expo's dev tools and QR-based mobile deployment.

## 📱 Live App Link

Try out the app instantly on Expo:

 **[Open Product Catalog App on Expo](https://expo.dev/accounts/shubham290704/projects/ProductCatalogApp)**  
[![Try on Expo](https://img.shields.io/badge/Open%20in-Expo-blue?logo=expo)](https://expo.dev/accounts/shubham290704/projects/ProductCatalogApp)

- Install the Expo Go app (from Play Store or App Store).
- Click the app link OR open Expo Go and scan the QR code 
- The app will launch instantly on you're phone!


