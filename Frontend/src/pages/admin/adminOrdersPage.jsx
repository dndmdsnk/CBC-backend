import axios from "axios";
import { useEffect, useState } from "react";
import { Loader2, Search } from "lucide-react";
import Modal from "react-modal";
import toast from "react-hot-toast";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (isLoading) {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setOrders(res.data);
          setIsLoading(false);
        })
        .catch((e) => {
          alert(
            "Error fetching orders: " +
              (e.response?.data?.message || "Unknown error")
          );
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  const filteredOrders = orders.filter(
    (o) =>
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase()) ||
      o.orderId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full p-6 font-[var(--font-main)]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-[var(--color-accent)]">
          Admin Orders Management
        </h1>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <Loader2 className="h-12 w-12 animate-spin text-[var(--color-accent)]" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className=" rounded-2xl shadow-lg overflow-hidden">
            <table className="min-w-full text-sm text-left">
              <thead className=" text-green-500 uppercase text-xs tracking-wide">
                <tr>
                  <th className="py-4 px-4">Order ID</th>
                  <th className="py-4 px-4">Name</th>
                  <th className="py-4 px-4">Email</th>
                  <th className="py-4 px-4">Phone</th>
                  <th className="py-4 px-4">Total (LKR)</th>
                  <th className="py-4 px-4">Date</th>
                  <th className="py-4 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-500">
                      No orders found 😕
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order, index) => (
                    <tr
                      key={index}
                      onClick={() => {
                        setActiveOrder(order);
                        setIsModalOpen(true);
                      }}
                      className={`cursor-pointer transition ${
                        index % 2 === 0 ? "bg" : "bg"
                      } hover:bg-gray-500`}
                    >
                      <td className="py-3 px-4 font-semibold">
                        {order.orderId}
                      </td>
                      <td className="py-3 px-4">{order.name}</td>
                      <td className="py-3 px-4 text-gray-600">{order.email}</td>
                      <td className="py-3 px-4">{order.phone}</td>
                      <td className="py-3 px-4 font-semibold text-gray-800">
                        {order.total.toLocaleString("en-LK", {
                          style: "currency",
                          currency: "LKR",
                        })}
                      </td>
                      <td className="py-3 px-4 text-gray-500">
                        {new Date(order.date).toLocaleDateString("en-GB")}
                      </td>
                      <td
                        className={`py-3 px-4 font-semibold ${
                          order.status === "pending"
                            ? "text-yellow-600"
                            : order.status === "completed"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-gradient-to-b from-gray-950 via-gray-900 to-black  rounded-2xl shadow-2xl max-w-4xl w-[90%] mx-auto my-10 p-8 outline-none relative overflow-y-auto max-h-[90vh] border-2"
        overlayClassName="fixed inset-0 bg-[#00000060] backdrop-blur-sm flex justify-center items-center"
      >
        {activeOrder && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[var(--color-accent)] border-b pb-3">
              Order Details - {activeOrder.orderId}
            </h2>

            {/* Customer Info */}
            <div className="grid md:grid-cols-2 gap-6 ">
              <div className="space-y-2 text-white  ">
                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {activeOrder.name}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {activeOrder.email}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {activeOrder.phone}
                </p>
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {activeOrder.address}
                </p>
              </div>
              <div className="space-y-2 text-white">
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`font-bold ${
                      activeOrder.status === "pending"
                        ? "text-yellow-500"
                        : activeOrder.status === "completed"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {activeOrder.status.toUpperCase()}
                  </span>
                  <select
                    onChange={async (e) => {
                      const updatedValue = e.target.value;
                      try {
                        const token = localStorage.getItem("token");
                        await axios.put(
                            `${import.meta.env.VITE_BACKEND_URL}/api/orders/${activeOrder.orderId}`,
                            { status: updatedValue },
                            {
                              headers: {
                                Authorization: "Bearer " + token,
                              },
                            }
                          );
                          

                        setIsLoading(true);
                        const updatedOrder = { ...activeOrder };
                        updatedOrder.status = updatedValue;
                        setActiveOrder(updatedOrder);
                      } catch (e) {
                        toast.error("Error updating order status");
                        console.log(e);
                      }
                    }}
                  >
                    <option selected disabled>
                      Change status
                    </option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="returned">Returned</option>
                  </select>
                </p>
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white">
                Products
              </h3>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm text-center">
                  <thead className="bg-[var(--color-primary)] text-white">
                    <tr>
                      <th className="py-2 px-3">Image</th>
                      <th className="py-2 px-3">Product</th>
                      <th className="py-2 px-3">Price</th>
                      <th className="py-2 px-3">Qty</th>
                      <th className="py-2 px-3">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeOrder.products.map((item, i) => (
                      <tr key={i} className="border-t text-white">
                        <td className="py-2 px-3 ">
                          <img
                            src={item.productInfo.images[0]}
                            alt={item.productInfo.name}
                            className="w-12 h-12 object-cover rounded-md mx-auto"
                          />
                        </td>
                        <td className="py-2 px-3">{item.productInfo.name}</td>
                        <td className="py-2 px-3">
                          {item.productInfo.price.toLocaleString("en-LK", {
                            style: "currency",
                            currency: "LKR",
                          })}
                        </td>
                        <td className="py-2 px-3">{item.quantity}</td>
                        <td className="py-2 px-3">
                          {(
                            item.productInfo.price * item.quantity
                          ).toLocaleString("en-LK", {
                            style: "currency",
                            currency: "LKR",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 rounded-lg bg-green-500 hover:bg-green-400 transition"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 rounded-lg bg-[var(--color-accent)] text-black hover:bg-[var(--color-secondary)] transition"
              >
                Print
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
