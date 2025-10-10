import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import Header from "@/components/header";

export default function CheckoutPage() {
  const location = useLocation();
  const [cart, setCart] = useState(location.state?.cart || []);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  function getTotal() {
    return cart.reduce((total, item) => total + item.price * item.qty, 0);
  }

  function removeFromCart(index) {
    setCart(cart.filter((_, i) => i !== index));
  }

  function changeQty(index, qty) {
    const newQty = cart[index].qty + qty;
    if (newQty <= 0) {
      removeFromCart(index);
    } else {
      const newCart = [...cart];
      newCart[index].qty = newQty;
      setCart(newCart);
    }
  }

  async function placeOrder() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to place order");
      return;
    }

    const orderInformation = {
      products: cart.map((item) => ({
        productId: item.productId,
        qty: item.qty,
      })),
      phone: phoneNumber,
      address,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders`,
        orderInformation,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Order placed successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Error placing order");
    }
  }

  return (
    
    <div className="w-full flex flex-col justify-center items-center  data-twe-container bg-black">

    < Header/>
    <div className="min-h-screen w-full flex flex-col lg:flex-row justify-center items-start  bg-gradient-to-b from-gray-950 via-gray-900 to-black p-6 gap-8 mt-20">
      {/* 🛒 Cart Section */}
      <div className="flex-1 w-full max-w-3xl  backdrop-blur-xl shadow-xl rounded-3xl p-6 border border-gray-300 dark:border-gray-700">
        <h1 className="text-3xl font-extrabold text-green-400 dark:text-gray-100 mb-6">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300 text-center py-10 text-lg">
            Your cart is empty 🛍️
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {cart.map((item, index) => (
              <div
                key={item.productId}
                className="flex flex-col sm:flex-row items-center justify-between bg-white/5 border border-white/10 rounded-2xl shadow-md hover:shadow-lg transition-all p-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-2xl object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-green-400">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ID: {item.productId}
                    </p>
                    {item.labelledPrice > item.price ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm line-through text-gray-500">
                          Rs. {item.labelledPrice.toFixed(2)}
                        </span>
                        <span className="text-lg text-green-400 font-semibold">
                          Rs. {item.price.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg text-green-400 font-semibold">
                        Rs. {item.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity & Remove */}
                <div className="flex items-center gap-3 mt-3 sm:mt-0">
                  <button
                    className="bg-green-500 hover:bg-green-400 text-white p-2 rounded-lg  transition-all"
                    onClick={() => changeQty(index, -1)}
                  >
                    <BiMinus size={18} />
                  </button>
                  <span className="text-lg font-bold text-white dark:text-gray-100">
                    {item.qty}
                  </span>
                  <button
                    className="bg-green-500 hover:bg-green-400 text-white p-2 rounded-lg  transition-all"
                    onClick={() => changeQty(index, 1)}
                  >
                    <BiPlus size={18} />
                  </button>
                  <button
                    className="text-red-500 hover:bg-red-600 hover:text-white rounded-lg p-2 transition-all"
                    onClick={() => removeFromCart(index)}
                  >
                    <BiTrash size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 💳 Order Summary */}
      <div className="w-full lg:w-[400px]  bg-gradient-to-b from-gray-950 via-gray-900 to-black backdrop-blur-xl border border-gray-300 dark:border-gray-700 shadow-2xl rounded-3xl p-6 flex flex-col gap-6 sticky top-6">
        <h2 className="text-2xl font-bold text-green-400 dark:text-gray-100">
          Order Summary
        </h2>

        <div className="flex justify-between items-center text-lg font-semibold text-green-400 dark:text-gray-200">
          <span>Total:</span>
          <span className="text-accent font-bold">Rs. {getTotal().toFixed(2)}</span>
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none text-gray-800 dark:text-gray-200 dark:bg-gray-900 dark:border-gray-700"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input

            type="text"
            placeholder="Delivery Address"
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none text-gray-800 dark:text-gray-200 dark:bg-gray-900 dark:border-gray-700"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-green-500 hover:bg-green-400 text-white py-3 rounded-xl font-semibold text-lg transition-all duration-300 shadow-md"
          onClick={placeOrder}
        >
          Place Order
        </button>
      </div>
    </div>
    </div>
  );
}
