import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/header";
import bcgVideo from "@/assets/bg.mp4";
import { FaCircleArrowDown } from "react-icons/fa6";
import ProductCard from "@/components/productCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          setProducts(res.data);
          setIsLoading(false);
        });
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

  return (
    <div className="w-full flex flex-col justify-center items-center  data-twe-container bg-black">
      <Header />
      <section className="w-full  flex flex-col justify-center items-center py-2 h-screen  mx-auto mt-8 relative">
        <div class="max-w-8xl w-full mx-auto px-8 py-20 bg-black mt-1  text-center justify-center items-center">
          <div class="p-4 rounded-lg shadow-sm bg-black relative">
            <video
              class="w-full h-130 object-cover rounded-lg"
              autoPlay
              loop
              muted
            >
              <source src={bcgVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="absolute inset-0 flex flex-col items-center justify-center mt-10">
            <h2 className="text-9xl font-bold text-white/50">
              SHOP NOW
            </h2>

            {/* Down Arrow Icon */}
            <FaCircleArrowDown
             onClick={scrollToProduct}
             className="text-white/80 text-4xl animate-bounce cursor-pointer mt-10" />
          </div>
          
          </div>
        </div>

      </section>

      <section id="product" className="w-full h-full mt-2 flex flex-wrap justify-center items-center">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {products.map((product) => {
          return <ProductCard key={product.productId} product={product} />;
        })}
        </div>
      </section>
    </div>
  );
}
