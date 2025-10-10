import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/header";
import bcgVideo from "@/assets/bg.mp4";
import { FaCircleArrowDown }from "react-icons/fa6";
import ProductCard from "@/components/productCard";
import { FaSearch } from "react-icons/fa";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          setProducts(res.data);
          setIsLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [isLoading]);

  const scrollToProduct = () => {
    const section = document.getElementById("product");
    if (section) {
      const yOffset = window.innerHeight * 0.2;
      const y = section.getBoundingClientRect().top + window.scrollY - yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setIsSearching(false);
      setIsLoading(true); // reload all products
      return;
    }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/search/${searchQuery}`
      );
      setProducts(res.data);
      setIsSearching(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center bg-black">
      <Header />

      {/* HERO SECTION */}
      <section className="w-full flex flex-col justify-center items-center py-2 h-screen mx-auto mt-8 relative">
        <div className="max-w-8xl w-full mx-auto px-8 py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-black text-center">
          <div className="p-4 rounded-lg shadow-sm bg-gradient-to-b from-gray-950 via-gray-900 to-black relative">
            <video
              className="w-full h-130 object-cover rounded-lg"
              autoPlay
              loop
              muted
            >
              <source src={bcgVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="absolute inset-0 flex flex-col items-center justify-center mt-10">
              <h2 className="text-9xl font-bold text-white/50">SHOP NOW</h2>

              {/* Down Arrow */}
              <FaCircleArrowDown
                onClick={scrollToProduct}
                className="text-white/80 text-4xl animate-bounce cursor-pointer mt-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT SECTION */}
      <section
        id="product"
        className="w-full h-full mt-2 flex flex-col justify-center items-center"
      >
        {/* Search Bar */}
        <div className="w-full max-w-2xl flex items-center justify-center gap-2 mb-8 px-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-400 transition-all duration-300"
          >
            <FaSearch />
          </button>
        </div>

        {/* Product Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-gray-400 text-lg">No products found</p>
          )}
        </div>
      </section>
    </div>
  );
}
