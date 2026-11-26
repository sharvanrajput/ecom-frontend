"use client";

import { AdminContext } from "@/context/AdminAuthContext";
import { ADMIN_API_URL, getAdminAuthHeaders } from "@/lib/admin-api";
import { ArrowLeft, ImagePlus, LoaderCircle, PackagePlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const categories = ["Men", "Women", "Kids"];
const subcategories = ["Topwear", "Bottomwear", "Winterwear"];
const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

const fieldClassName =
  "mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#597a6d] focus:ring-4 focus:ring-[#597a6d]/10";

function FormField({ id, label, hint, children }) {
  return (
    <div>
      <label
        className="text-sm font-semibold text-slate-800"
        htmlFor={id}
      >
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

export default function AddItemsPage() {
  const { adminToken } = useContext(AdminContext);
  const router = useRouter();
  const [images, setImages] = useState(Array(4).fill(null));
  const [sizes, setSizes] = useState([]);
  const [isBestseller, setIsBestseller] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    () => () => {
      images.forEach((image) => {
        if (image) URL.revokeObjectURL(image.previewUrl);
      });
    },
    [images]
  );

  const handleImageChange = (index, file) => {
    setImages((currentImages) =>
      currentImages.map((image, imageIndex) => {
        if (imageIndex !== index) return image;
        return file
          ? { file, previewUrl: URL.createObjectURL(file) }
          : null;
      })
    );
  };

  const toggleSize = (size) => {
    setSizes((currentSizes) =>
      currentSizes.includes(size)
        ? currentSizes.filter((currentSize) => currentSize !== size)
        : [...currentSizes, size]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!sizes.length) {
      setError("Choose at least one size for this product.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    formData.set("sizes", sizes.join(","));
    formData.set("bestseller", String(isBestseller));
    images.forEach((image, index) => {
      if (image) formData.append(`img${index + 1}`, image.file);
    });

    setIsSubmitting(true);
    try {
      const response = await fetch(`${ADMIN_API_URL}/api/product/add`, {
        method: "POST",
        headers: getAdminAuthHeaders(adminToken),
        body: formData,
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Could not add this product.");
      }

      router.push("/admin/list-items");
    } catch (submitError) {
      setError(submitError.message || "Could not add this product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-full bg-[#f7f8f6] px-4 py-8 sm:px-7 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/admin/list-items"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft className="size-4" />
          Back to products
        </Link>

        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#597a6d]">
              Inventory
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              Add a product
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Add the details and images customers need to discover your next
              favorite piece.
            </p>
          </div>
          <span className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600">
            New product
          </span>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-5">
                <h2 className="text-base font-semibold text-slate-900">
                  Product images
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Upload up to four clear product photos.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {images.map((image, index) => (
                  <label
                    key={index}
                    htmlFor={`product-image-${index}`}
                    className="group relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50 transition hover:border-[#597a6d] hover:bg-[#f4f7f4]"
                  >
                    {image ? (
                      <>
                        {/* Browser-generated preview URLs are intentionally rendered without image optimization. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={image.previewUrl}
                          alt={`Selected product ${index + 1}`}
                          className="size-full object-cover"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-slate-950/45 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
                          Replace image
                        </span>
                      </>
                    ) : (
                      <span className="flex flex-col items-center gap-2 text-center text-slate-500">
                        <ImagePlus className="size-6 text-[#597a6d]" />
                        <span className="text-xs font-medium">
                          Image {index + 1}
                        </span>
                        <span className="text-[11px]">Click to upload</span>
                      </span>
                    )}
                    <input
                      id={`product-image-${index}`}
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(event) => {
                        handleImageChange(index, event.target.files?.[0]);
                        event.target.value = "";
                      }}
                    />
                  </label>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-500">
                JPG, PNG, or WebP. The first uploaded image is used as the
                product cover.
              </p>
            </section>

            <section className="space-y-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Product details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Keep the name and description clear and easy to scan.
                </p>
              </div>

              <FormField id="name" label="Product name">
                <input
                  id="name"
                  name="name"
                  className={fieldClassName}
                  placeholder="e.g. Relaxed cotton shirt"
                  maxLength={120}
                  required
                />
              </FormField>

              <FormField id="description" label="Description">
                <textarea
                  id="description"
                  name="description"
                  className="mt-2 min-h-32 w-full resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#597a6d] focus:ring-4 focus:ring-[#597a6d]/10"
                  placeholder="Describe the fit, feel, and details of this product..."
                  maxLength={2000}
                  required
                />
              </FormField>

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField id="prise" label="Price">
                  <div className="relative">
                    <span className="absolute left-3.5 top-[22px] text-sm text-slate-500">
                      $
                    </span>
                    <input
                      id="prise"
                      name="prise"
                      type="number"
                      min="0.01"
                      step="0.01"
                      className={`${fieldClassName} pl-8`}
                      placeholder="0.00"
                      required
                    />
                  </div>
                </FormField>
                <FormField id="category" label="Category">
                  <select
                    id="category"
                    name="category"
                    className={fieldClassName}
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>

              <FormField id="subCategory" label="Subcategory">
                <select
                  id="subCategory"
                  name="subCategory"
                  className={fieldClassName}
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select a subcategory
                  </option>
                  {subcategories.map((subcategory) => (
                    <option key={subcategory} value={subcategory}>
                      {subcategory}
                    </option>
                  ))}
                </select>
              </FormField>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-base font-semibold text-slate-900">
                Available sizes
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Choose every size currently in stock.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {availableSizes.map((size) => {
                  const isSelected = sizes.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => toggleSize(size)}
                      className={`h-10 rounded-lg border text-sm font-semibold transition ${
                        isSelected
                          ? "border-[#253b35] bg-[#253b35] text-white"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-xs text-slate-500">
                {sizes.length ? `${sizes.length} sizes selected` : "Select at least one size"}
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-start gap-3">
                <input
                  id="bestseller"
                  type="checkbox"
                  checked={isBestseller}
                  onChange={(event) => setIsBestseller(event.target.checked)}
                  className="mt-1 size-4 rounded border-slate-300 accent-[#253b35]"
                />
                <div>
                  <label
                    htmlFor="bestseller"
                    className="cursor-pointer text-sm font-semibold text-slate-900"
                  >
                    Mark as bestseller
                  </label>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Feature this product in your bestseller collection.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl bg-[#253b35] p-5 text-white shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-white/10">
                  <PackagePlus className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Ready to publish?</p>
                  <p className="mt-0.5 text-xs text-white/65">
                    Your product will be added to the catalog.
                  </p>
                </div>
              </div>
              {error && (
                <p role="alert" className="mt-4 rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-100">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-[#253b35] transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" />
                    Adding product...
                  </>
                ) : (
                  "Add product"
                )}
              </button>
            </section>
          </aside>
        </form>
      </div>
    </div>
  );
}
