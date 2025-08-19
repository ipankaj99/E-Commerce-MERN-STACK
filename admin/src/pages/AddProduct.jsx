import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

function AddProduct({ token }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [err, setErr] = useState(null);
  const [backendError, setBackendError] = useState(null);
  const [previews, setPreviews] = useState([null, null, null, null]);

  // ✅ Proper subscription to avoid infinite re-render
  useEffect(() => {
    const subscription = watch((value) => {
      const files = [
        value.image1?.[0],
        value.image2?.[0],
        value.image3?.[0],
        value.image4?.[0],
      ];

      const newPreviews = files.map((file) =>
        file ? URL.createObjectURL(file) : null
      );
      setPreviews(newPreviews);

      // cleanup object URLs
      return () => {
        newPreviews.forEach((url) => {
          if (url) URL.revokeObjectURL(url);
        });
      };
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data) => {
    const images = [
      data.image1?.[0],
      data.image2?.[0],
      data.image3?.[0],
      data.image4?.[0],
    ].filter(Boolean);

    if (!images.length) return setErr("At least one image is required");

    setErr(null);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("subCategory", data.subCategory);

    const sizesArray = Array.isArray(data.sizes) ? data.sizes : [data.sizes];
    sizesArray.forEach((size) => formData.append("sizes[]", size));
    formData.append("bestseller", data.bestseller ? "true" : "false");

    images.forEach((file, index) =>
      formData.append(`image${index + 1}`, file)
    );

    try {
      const response = await axios.post(
        "http://localhost:4000/api/product/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Product added Successfully");
        toast("Product Addded Successfully");
        reset();
        setPreviews([null, null, null, null]);
      } else setBackendError("Something went wrong. Refresh page.");
    } catch (err) {
      setBackendError("Something went wrong. Refresh page.");
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-8 bg-green-50 rounded-lg shadow-lg space-y-6"
    >
      <h2 className="text-3xl font-bold text-green-800 text-center mb-4">
        Add Product
      </h2>

      {/* Image Upload with Preview */}
      <div>
        <p className="font-semibold text-green-700 mb-2">Upload Images</p>
        <div className="flex gap-4">
          {[1, 2, 3, 4].map((num, index) => (
            <label key={num} htmlFor={`image${num}`} className="cursor-pointer">
              <img
                src={previews[index] || assets.upload_area}
                alt={`Preview ${num}`}
                className="w-24 h-24 object-cover border-2 border-green-300 rounded-lg hover:border-green-500"
              />
              <input
                type="file"
                id={`image${num}`}
                hidden
                accept="image/*"
                {...register(`image${num}`)}
              />
            </label>
          ))}
        </div>
        {err && <p className="text-red-500 text-sm">{err}</p>}
      </div>

      {/* Product Details */}
      <div>
        <p className="font-semibold text-green-700">Product Name</p>
        <input
          type="text"
          {...register("name", { required: "Product Name is required" })}
          className="w-full border-2 border-green-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <p className="font-semibold text-green-700">Product Description</p>
        <textarea
          {...register("description", { required: "Description is required" })}
          className="w-full border-2 border-green-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1">
          <p className="font-semibold text-green-700">Category</p>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full border-2 border-green-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Select</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        <div className="flex-1">
          <p className="font-semibold text-green-700">Sub Category</p>
          <select
            {...register("subCategory", { required: "Sub Category is required" })}
            className="w-full border-2 border-green-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Select</option>
            <option value="TopWear">TopWear</option>
            <option value="BottomWear">BottomWear</option>
          </select>
          {errors.subCategory && (
            <p className="text-red-500 text-sm">{errors.subCategory.message}</p>
          )}
        </div>

        <div className="flex-1">
          <p className="font-semibold text-green-700">Price</p>
          <input
            type="number"
            {...register("price", {
              required: "Price is required",
              min: { value: 1, message: "Price must be at least 1" },
            })}
            className="w-full border-2 border-green-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>
      </div>

      {/* Sizes & Bestseller */}
      <div className="flex gap-4 flex-wrap">
        {["S", "M", "L", "XL", "XLL"].map((size) => (
          <label
            key={size}
            className="flex items-center gap-1 bg-green-100 px-3 py-1 rounded-lg cursor-pointer hover:bg-green-200"
          >
            <input
              type="checkbox"
              value={size}
              {...register("sizes", { required: "Select at least one size" })}
              className="accent-green-600"
            />
            {size}
          </label>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register("bestseller")}
          className="accent-green-600"
        />
        <p className="font-semibold text-green-700">Add to Bestseller</p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
      >
        {isSubmitting ? "Adding..." : "Add Product"}
      </button>

      {backendError && (
        <p className="text-red-500 text-center mt-2">{backendError}</p>
      )}
    </form>
  );
}

export default AddProduct;
