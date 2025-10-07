import Header from "@/components/header";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ImageSlider from "@/components/imageSlider";
import { Spinner } from "@/components/ui/spinner";
import { addToCart, getCart } from "@/utils/cart";

export default function ProductOverview() {
  const { id: productId } = useParams();
  const [status, setStatus] = useState("loading"); // loading , success , error
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setStatus("success");
      })
      .catch((error) => {
        console.log(error);
        setStatus("error");
        toast.error("Error fetching product details");
      });
  }, [productId]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-black">
      <Header />

      {status === "loading" && (
        <div className="flex justify-center items-center h-screen">
          <Spinner className="size-10 text-green-500" />
        </div>
      )}

      {status === "success" && product && (
       <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto px-6 lg:px-12 py-6 gap-10 mt-30 border-gray-400 border-2 rounded-2xl">

          {/* Left: Image Slider */}
          <div className="w-full lg:w-1/2 flex justify-center items-center ">
            <div className="w-full bg-black rounded-3xl overflow-hidden shadow-lg backdrop-blur-md ">
              <ImageSlider images={product.images} />
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center ">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-green-400">
              {product.name}
              {product.altNames.map((altName, index) => (
                <span key={index} className="text-gray-400 text-2xl font-medium">
                  {" | " + altName}
                </span>
              ))}
            </h1>

            <p className="text-gray-400 text-lg mb-1">Product ID: {product.productId}</p>
            <p className="text-gray-300 text-base mb-5 leading-relaxed">
              {product.description}
            </p>

            {/* Price Section */}
            {product.labelledPrice > product.price ? (
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl sm:text-3xl line-through text-gray-500">
                  ${product.labelledPrice.toFixed(2)}
                </span>
                <span className="text-3xl sm:text-4xl font-bold text-green-400">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-3xl sm:text-4xl font-bold text-green-400 mb-6">
                ${product.price.toFixed(2)}
              </span>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button className="flex-1 h-[55px] bg-green-500 text-white rounded-2xl font-semibold text-lg shadow-lg hover:bg-green-400 transition-all duration-300"
              	onClick={() => {
                  console.log("Old cart");
                  console.log(getCart());
                  addToCart(product, 1);
                  console.log("New cart");
                  console.log(getCart());
                }}
              >
                Add to Cart
              </button>
              <button className="flex-1 h-[55px] bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-2xl font-semibold text-lg shadow-lg hover:opacity-90 transition-all duration-300"
               onClick={() => {
                navigate("/checkout", {
                  state: {
                    cart : [
                      {
                        productId : product.productId,
                        name : product.name,
                        image : product.images[0],
                        price : product.price,
                        labelledPrice : product.labelledPrice,
                        qty : 1
                    
                      }
                    ]
                  }
                })
              }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
