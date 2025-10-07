import { ShoppingBag } from "lucide-react"; // icon library (optional)
import { motion } from "framer-motion"; // for smooth hover animation
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  
   return (
    <Link to= {"/productoverview/"+product.productId} className=" border-gray-600 border-1 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col w-[300px]">
      {/* Image Section */}
      <div className="w-full h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={product.images?.[0] || "/placeholder.jpg"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between flex-grow p-4">
        {/* Product Info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-600 line-clamp-1">
            {product.name}
          </h2>

          <p className="text-gray-500 text-sm mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price Section */}
        <div className="mt-3">
          <div className="flex items-center gap-2">
            <span className="text-blue-600 font-bold text-lg">
              Rs. {product.price.toLocaleString()}
            </span>
            <span className="text-gray-400 line-through">
              Rs. {product.labelledPrice.toLocaleString()}
            </span>
          </div>

          {/* Stock */}
          <p
            className={`mt-1 text-sm font-semibold ${
              product.isAvailable ? "text-green-600" : "text-red-500"
            }`}
          >
            {product.isAvailable ? "In Stock" : "Out of Stock"}
          </p>
        </div>

        {/* Button */}
        <button
         
          disabled={!product.isAvailable || product.stoke <= 0}
          className={`mt-4 w-full py-2 rounded-lg font-semibold text-white text-sm transition ${
            product.isAvailable 
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Buy Now
        </button>
      </div>
    </Link>
  );
}
