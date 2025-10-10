import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          setProducts(res.data);
          setIsLoading(false);
        })
        .catch(() => {
          toast.error("Error loading products");
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  function deleteProduct(productId) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success("Product deleted successfully");
        setIsLoading(true);
      })
      .catch((e) => {
        toast.error(e.response?.data?.message || "Error deleting product");
      });
  }

  return (
    <div className="w-full h-full  flex flex-col p-6 rounded-2xl shadow-lg relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-secondary tracking-tight">
          Product Management
        </h1>
        <Link
          to="/admin/add-product"
          className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-full shadow-md transition-all duration-300"
        >
          + Add Product
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center w-full h-[60vh]">
          <Loader2 className="h-10 w-10 animate-spin text-accent" />
        </div>
      ) : (
        <div className="relative overflow-x-auto rounded-xl shadow-lg backdrop-blur-md dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
            <thead className="text-xs uppercase bg-gradient-to-r  text-green-500 rounded-t-xl">
              <tr>
                <th scope="col" className="px-6 py-3">Product ID</th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Image</th>
                <th scope="col" className="px-6 py-3">Labelled Price</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Stock</th>
                <th scope="col" className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-500 dark:hover:bg-gray-700/50 transition-colors duration-300"
                >
                  <td className="px-6 py-4 font-semibold">{item.productId}</td>
                  <td className="px-6 py-4 font-medium text-secondary dark:text-white">{item.name}</td>
                  <td className="px-6 py-4">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-[60px] h-[60px] object-cover rounded-xl border border-gray-300 dark:border-gray-700"
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-500 line-through">
                    {item.labelledPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 font-bold text-accent">
                    {item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">{item.stock}</td>
                  <td className="px-6 py-4 flex justify-center items-center space-x-4">
                    <button
                      onClick={() => deleteProduct(item.productId)}
                      className="text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-full transition-all"
                      title="Delete Product"
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={() =>
                        navigate("/admin/edit-product", { state: item })
                      }
                      className="text-blue-500 hover:text-white hover:bg-blue-500 p-2 rounded-full transition-all"
                      title="Edit Product"
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
