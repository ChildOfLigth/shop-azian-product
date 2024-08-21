import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./Header";
import MainPage from "./MainPage";
import "./styles/App.css";
import FastFood from "./productPages/FastFood";
import Souces from "./productPages/Souces";
import Sweets from "./productPages/Sweets";
import Footer from "./Footer";
import AboutUs from "./AboutUs";
import Delivery from "./Delivery";
import ProductCard from "./productPages/ProductCard";
import Tokkpoki from "./productPages/Tokkpoki";
import NavigateMenu from "./SortingMenu";
import {
  allNoodles,
  allSauces,
  allSweets,
  tokkpoki,
  recommendProducts,
  allChips,
} from "./listProduct";
import ProductBascket from "./ProductBascket";
import Wishlist from "./Wishlist";
import Chips from "./productPages/Chips";

function AppContent() {
  const location = useLocation();
  const showNavigateMenu = [
    "/shop-azian-product/fast-food",
    "/shop-azian-product/fast-food/tokkpoki",
    "/shop-azian-product/sauces",
    "/shop-azian-product/sweets",
    "/shop-azian-product/chips",
  ].includes(location.pathname);

  const products = [
    ...allNoodles,
    ...allSauces,
    ...allSweets,
    ...tokkpoki,
    ...allChips,
    ...recommendProducts,
  ];

  return (
    <div className="App">
      <Header />
      {showNavigateMenu && <NavigateMenu />}

      <Routes>
        <Route path="/shop-azian-product" element={<MainPage />} />
        <Route path="/shop-azian-product/fast-food" element={<FastFood />} />
        <Route path="/shop-azian-product/fast-food/tokkpoki" element={<Tokkpoki />} />
        <Route path="/shop-azian-product/sauces" element={<Souces />} />
        <Route path="/shop-azian-product/sweets" element={<Sweets />} />
        <Route path="/shop-azian-product/chips" element={<Chips />} />
        <Route
          path="/shop-azian-product/product/:name"
          element={<ProductCard array={products} />}
        />
        <Route path="/shop-azian-product/aboutUs" element={<AboutUs />} />
        <Route path="/shop-azian-product/delivery" element={<Delivery />} />
        <Route
          path="/shop-azian-product/productBascket"
          element={<ProductBascket />}
        />
        <Route path="/shop-azian-product/wishlist" element={<Wishlist />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
