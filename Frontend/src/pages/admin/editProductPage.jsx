import { useState } from "react";
import toast from "react-hot-toast";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Pencil, Upload } from "lucide-react";

export default function EditProductPage() {
  const location = useLocation();

  const [productId, setProductId] = useState(location.state.productId);
  const [name, setName] = useState(location.state.name);
  const [altNames, setAltNames] = useState(location.state.altNames.join(","));
  const [description, setDescription] = useState(location.state.description);
  const [images, setImages] = useState([]);
  const [labelledPrice, setLabelledPrice] = useState(location.state.labelledPrice);
  const [price, setPrice] = useState(location.state.price);
  const [stock, setStock] = useState(location.state.stock);

  const navigate = useNavigate();

  async function UpdateProduct() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    let imageUrls = location.state.images;
    const promisesArray = [];

    for (let i = 0; i < images.length; i++) {
      promisesArray[i] = mediaUpload(images[i]);
    }

    try {
      if (images.length > 0) {
        imageUrls = await Promise.all(promisesArray);
      }

      const altNamesArray = altNames.split(",");
      const product = {
        productId,
        name,
        altNames: altNamesArray,
        description,
        images: imageUrls,
        labelledPrice,
        price,
        stock,
      };

    axios .put(import.meta.env.VITE_BACKEND_URL + "/api/products/"+productId 
    , product,
     { headers: { Authorization: "Bearer " + token, }, })

      toast.success("Product updated successfully!");
      navigate("/admin/products");
    } catch (e) {
      toast.error(e.response?.data?.message || "Update failed");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white p-6">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Pencil className="text-green-500 w-8 h-8" />
          <h1 className="text-3xl font-bold text-green-400 tracking-wide">
            Edit Product
          </h1>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <InputField label="Product ID" value={productId} disabled />
          <InputField label="Name" value={name} onChange={setName} />
          <InputField label="Alt Names (comma separated)" value={altNames} onChange={setAltNames} />
          <InputField label="Labelled Price" type="number" value={labelledPrice} onChange={setLabelledPrice} />
          <InputField label="Price" type="number" value={price} onChange={setPrice} />
          <InputField label="Stock" type="number" value={stock} onChange={setStock} />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-300">
            Description
          </label>
          <textarea
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none resize-none"
            rows="4"
            placeholder="Enter product description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Current Images Preview */}
        <div>
          <p className="text-sm text-gray-300 mb-2">Current Images</p>
          <div className="flex flex-wrap gap-3">
            {location.state.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Product ${i}`}
                className="w-20 h-20 object-cover rounded-lg border border-gray-700 hover:scale-105 transition"
              />
            ))}
          </div>
        </div>

        {/* New Image Upload */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-300">
            Upload New Images
          </label>
          <input
            type="file"
            multiple
            onChange={(e) => setImages(e.target.files)}
            className="w-full bg-gray-800 text-gray-300 p-3 rounded-lg border border-gray-700 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700 transition"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <Link
            to="/admin/products"
            className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 font-semibold transition-all"
          >
            Cancel
          </Link>
          <button
            onClick={UpdateProduct}
            className="px-6 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 font-semibold flex items-center gap-2 transition-all"
          >
            <Upload size={18} />
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🔹 Reusable Input Component */
function InputField({ label, type = "text", value, onChange, disabled }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2 text-gray-300">
        {label}
      </label>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.value)}
        className={`w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none ${
          disabled ? "opacity-60 cursor-not-allowed" : ""
        }`}
        placeholder={`Enter ${label.toLowerCase()}...`}
      />
    </div>
  );
}
