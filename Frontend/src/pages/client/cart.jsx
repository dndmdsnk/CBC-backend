import { useState } from "react";
import { addToCart, getCart, getTotal, removeFromCart } from "../../utils/cart";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import Header from "@/components/header";

export default function CartPage() {
  const [cart, setCart] = useState(getCart());

  return (
    
    <div className="w-full flex flex-col justify-center items-center  data-twe-container bg-black">

    < Header/>
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white flex flex-col items-center py-10 px-4">
    

      <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-8 mt-15">
        Your Cart
      </h1>

      {/* 🧾 Cart Items */}
      <div className="w-full max-w-4xl flex flex-col gap-6">
        {cart.length === 0 && (
          <div className="text-center text-gray-400 text-xl py-20">
            Your cart is empty 🛍️
          </div>
        )}

        {cart.map((item) => (
          <div
            key={item.productId}
            className="relative bg-white/5 border border-white/10 rounded-2xl shadow-lg backdrop-blur-md p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:scale-[1.01]"
          >
            {/* 🖼️ Product Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-[120px] h-[120px] md:w-[130px] md:h-[130px] object-cover rounded-2xl shadow-md"
            />

            {/* 📄 Product Info */}
            <div className="flex flex-col md:flex-1 md:items-start text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-semibold text-green-400">
                {item.name}
              </h2>
              <p className="text-gray-400 text-sm mb-1">{item.productId}</p>
              {item.labelledPrice > item.price ? (
                <div className="flex justify-center md:justify-start items-center gap-3">
                  <span className="text-gray-500 line-through text-md">
                    Rs. {item.labelledPrice.toFixed(2)}
                  </span>
                  <span className="text-green-400 text-lg font-bold">
                    Rs. {item.price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-green-400 text-lg font-bold">
                  Rs. {item.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* 🔢 Quantity Controls */}
            <div className="flex items-center gap-4 bg-white/5 px-3 py-2 rounded-xl">
              <button
                onClick={() => {
                  addToCart(item, -1);
                  setCart(getCart());
                }}
                className="bg-green-500 hover:bg-green-400 p-2 rounded-lg text-white text-xl transition-all"
              >
                <BiMinus />
              </button>
              <span className="text-lg font-semibold">{item.qty}</span>
              <button
                onClick={() => {
                  addToCart(item, 1);
                  setCart(getCart());
                }}
                className="bg-green-500 hover:bg-green-400 p-2 rounded-lg text-white text-xl transition-all"
              >
                <BiPlus />
              </button>
            </div>

            {/* 💰 Item Total */}
            <div className="text-center md:text-right">
              <h3 className="text-2xl font-bold text-green-400">
                Rs. {(item.price * item.qty).toFixed(2)}
              </h3>
            </div>

            {/* 🗑️ Delete Button */}
            <button
              className="absolute top-3 right-3 text-red-500 hover:text-white hover:bg-red-500 rounded-full p-2 transition-all"
              onClick={() => {
                removeFromCart(item.productId);
                setCart(getCart());
              }}
            >
              <BiTrash className="text-xl" />
            </button>
          </div>
        ))}
      </div>

      {/* 💳 Checkout Bar (Desktop) */}
      {cart.length > 0 && (
        <>
          <div className="hidden md:flex fixed bottom-5 right-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-5 flex-col justify-center items-center z-50">
            <p className="text-2xl font-semibold text-gray-200">
              Total:
              <span className="text-green-400 font-bold mx-2">
                Rs. {getTotal().toFixed(2)}
              </span>
            </p>
            <Link
              to="/checkout"
              state={{ cart }}
              className="mt-3 w-[200px] text-center bg-green-500 hover:bg-green-400 text-white py-2 rounded-lg font-semibold transition-all duration-300"
            >
              Checkout
            </Link>
          </div>

          {/* 📱 Mobile Total Bar */}
          <div className="md:hidden mt-10 w-full bg-white/5 border-t border-white/10 py-4 rounded-t-3xl shadow-inner flex flex-col justify-center items-center">
            <p className="text-2xl font-semibold text-gray-200">
              Total:
              <span className="text-green-400 font-bold mx-2">
                Rs. {getTotal().toFixed(2)}
              </span>
            </p>
            <Link
              to="/checkout"
              state={{ cart }}
              className="mt-3 w-[180px] text-center bg-green-500 hover:bg-green-400 text-white py-2 rounded-lg font-semibold transition-all duration-300"
            >
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
    </div>
  );
}
