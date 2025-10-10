import { NavLink, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Star,
  Menu,
  X,
  Plus,
  LogOut,
  Loader2,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

// Import admin sub-pages
import AdminProductsPage from "./admin/productsPage";
import EditProductPage from "./admin/editProductPage";
import AddProductPage from "./admin/AddProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";


export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setStatus("unauthenticated");
      window.location.href = "/login";
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.role !== "admin") {
          toast.error("You are not authorized to access this page");
          window.location.href = "/";
        } else {
          setStatus("authenticated");
        }
      })
      .catch(() => {
        toast.error("You are not authenticated, please login");
        window.location.href = "/login";
      });
  }, []); // Run only once

  // 🔹 Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    window.location.href = "/login";
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-black">
        <Loader2 className="animate-spin text-green-500 w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-b from-gray-950 via-gray-900 to-black text-secondary overflow-hidden">
      {/* 📱 Sidebar Toggle (mobile) */}
      <button
        className="absolute top-4 left-4 z-50 p-2 rounded-lg bg-green-500 text-white md:hidden hover:bg-green-400 transition-all"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* 🧭 Sidebar */}
      <aside
        className={`fixed md:static z-40 top-0 left-0 min-h-screen w-[300px] bg-gradient-to-b from-gray-950 via-gray-900 to-black shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* 🔹 Top Logo + Links */}
        <div className="flex flex-col px-6 py-10 gap-10">
          <div className="flex items-center justify-center mb-2">
            <LayoutDashboard className="text-green-500 w-8 h-8" />
            <h1 className="ml-3 text-2xl font-bold text-green-500 tracking-wide">
              Admin Panel
            </h1>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-5">
            <SidebarLink
              to="/admin/products"
              icon={<Package size={22} />}
              label="Products"
            />
            
            <SidebarLink
              to="/admin/orders"
              icon={<ShoppingCart size={22} />}
              label="Orders"
            />
            
            <SidebarLink
              to="/admin/add-product"
              icon={<Plus size={22} />}
              label="Add Product"
            />
          </nav>
        </div>

        {/* 🔹 Bottom Section */}
        <div className="flex flex-col items-center gap-3 px-6 py-6 border-t border-gray-700/40">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Glow Theory
          </p>
          <button
            onClick={handleLogout}
            className="text-red-400 hover:text-red-500 transition-all flex items-center gap-2"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* 🧾 Main Content */}
      <main className="flex-1 w-full h-screen overflow-y-auto bg-gradient-to-b from-gray-950 via-gray-900 to-black dark:bg-gray-900/90 backdrop-blur-lg p-6 md:p-10">
        <div className="w-full h-full p-6 transition-all duration-300">
          <Routes>
            <Route path="/products" element={<AdminProductsPage />} />
           
            <Route path="/orders" element={<AdminOrdersPage />} />
            
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/edit-product" element={<EditProductPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

/* 🔸 Reusable Sidebar Link (with active highlight) */
function SidebarLink({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
          isActive
            ? "bg-green-500 text-white shadow-md scale-[1.02]"
            : "text-gray-300 hover:bg-green-500 hover:text-white"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}

/* 🔹 Placeholder Component for Simple Routes */
function DashboardPlaceholder({ title }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-secondary">{title}</h1>
      <p className="text-gray-500 mt-4 text-lg">
        This section is under development.
      </p>
    </div>
  );
}
