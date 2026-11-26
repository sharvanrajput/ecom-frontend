"use client";

import { AdminContext } from "@/context/AdminAuthContext";
import { ADMIN_API_URL, getAdminAuthHeaders } from "@/lib/admin-api";
import {
  ArrowUpRight,
  PackageOpen,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useContext, useEffect, useMemo, useState } from "react";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(price) || 0);

export default function ListItemsPage() {
  const { adminToken } = useContext(AdminContext);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const loadProducts = async () => {
      try {
        const response = await fetch(`${ADMIN_API_URL}/api/product/all`, {
          headers: getAdminAuthHeaders(adminToken),
          signal: controller.signal,
        });
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Could not load products.");
        }

        setProducts(Array.isArray(result.products) ? result.products : []);
      } catch (loadError) {
        if (loadError.name !== "AbortError" && !controller.signal.aborted) {
          setError(loadError.message || "Could not load products.");
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    loadProducts();
    return () => controller.abort();
  }, [adminToken, refreshKey]);

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category).filter(Boolean))].sort(),
    [products]
  );

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        category === "All categories" || product.category === category;
      const matchesSearch =
        !query ||
        [product.name, product.category, product.subCategory]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [category, products, search]);

  const handleDelete = async (product) => {
    if (!window.confirm(`Remove "${product.name}" from the catalog?`)) return;

    setDeletingId(product._id);
    setError("");
    try {
      const response = await fetch(
        `${ADMIN_API_URL}/api/product/remove/${product._id}`,
        {
          method: "PUT",
          headers: getAdminAuthHeaders(adminToken),
        }
      );
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Could not remove this product.");
      }

      setProducts((currentProducts) =>
        currentProducts.filter((currentProduct) => currentProduct._id !== product._id)
      );
    } catch (deleteError) {
      setError(deleteError.message || "Could not remove this product.");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="min-h-full bg-[#f7f8f6] px-4 py-8 sm:px-7 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#597a6d]">
              Inventory
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              Products
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Manage and review the products in your store.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setError("");
                setIsLoading(true);
                setRefreshKey((key) => key + 1);
              }}
              disabled={isLoading}
              aria-label="Refresh products"
              className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              <RefreshCw className={`size-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>
            <Link
              href="/admin/add-items"
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#253b35] px-4 text-sm font-semibold text-white transition hover:bg-[#304b42]"
            >
              <Plus className="size-4" />
              Add product
            </Link>
          </div>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total products</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              {products.length}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Categories</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              {categories.length}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Bestsellers</p>
            <div className="mt-2 flex items-center gap-2">
              <Sparkles className="size-5 text-amber-500" />
              <p className="text-2xl font-semibold tracking-tight text-slate-950">
                {products.filter((product) => product.bestseller).length}
              </p>
            </div>
          </div>
        </div>

        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div>
              <h2 className="font-semibold text-slate-900">All products</h2>
              <p className="mt-1 text-xs text-slate-500">
                {filteredProducts.length} of {products.length} products
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="relative block sm:w-64">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search products..."
                  aria-label="Search products"
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#597a6d] focus:ring-4 focus:ring-[#597a6d]/10"
                />
              </label>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                aria-label="Filter by category"
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-[#597a6d]"
              >
                <option>All categories</option>
                {categories.map((itemCategory) => (
                  <option key={itemCategory}>{itemCategory}</option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="m-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700 sm:m-5"
            >
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-slate-500">
              <RefreshCw className="size-6 animate-spin text-[#597a6d]" />
              <p className="text-sm">Loading your products...</p>
            </div>
          ) : !error && filteredProducts.length === 0 ? (
            <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-[#edf2ee] text-[#597a6d]">
                <PackageOpen className="size-7" />
              </span>
              <h3 className="mt-4 font-semibold text-slate-900">
                {products.length ? "No matching products" : "Your catalog is empty"}
              </h3>
              <p className="mt-1 max-w-sm text-sm leading-6 text-slate-500">
                {products.length
                  ? "Try another search or category filter."
                  : "Add your first product to start building your catalog."}
              </p>
              {!products.length && (
                <Link
                  href="/admin/add-items"
                  className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-[#253b35] px-4 text-sm font-semibold text-white transition hover:bg-[#304b42]"
                >
                  <Plus className="size-4" />
                  Add first product
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead className="bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-3.5">Product</th>
                    <th className="px-5 py-3.5">Category</th>
                    <th className="px-5 py-3.5">Price</th>
                    <th className="px-5 py-3.5">Sizes</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((product) => {
                    const cover = product.images?.find((image) => image.url)?.url;
                    return (
                      <tr key={product._id} className="transition hover:bg-slate-50/70">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            {cover ? (
                              <>
                                {/* Product images can come from Cloudinary URLs with runtime-selected hosts. */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={cover}
                                  alt=""
                                  className="size-14 rounded-xl border border-slate-100 bg-slate-50 object-cover"
                                />
                              </>
                            ) : (
                              <span className="flex size-14 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                                <PackageOpen className="size-5" />
                              </span>
                            )}
                            <div className="min-w-0">
                              <p className="max-w-64 truncate text-sm font-semibold text-slate-900">
                                {product.name}
                              </p>
                              <p className="mt-1 max-w-64 truncate text-xs text-slate-500">
                                {product.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-slate-800">
                            {product.category || "—"}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {product.subCategory || "—"}
                          </p>
                        </td>
                        <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                          {formatPrice(product.prise ?? product.price)}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex max-w-48 flex-wrap gap-1">
                            {(product.sizes || []).length ? (
                              product.sizes.map((size) => (
                                <span
                                  key={`${product._id}-${size}`}
                                  className="rounded-md bg-slate-100 px-1.5 py-1 text-[11px] font-medium text-slate-600"
                                >
                                  {size}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-slate-400">—</span>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          {product.bestseller ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                              <Sparkles className="size-3" />
                              Bestseller
                            </span>
                          ) : (
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                              Standard
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleDelete(product)}
                            disabled={deletingId === product._id}
                            aria-label={`Remove ${product.name}`}
                            className="inline-flex size-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                          >
                            {deletingId === product._id ? (
                              <RefreshCw className="size-4 animate-spin" />
                            ) : (
                              <Trash2 className="size-4" />
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {!isLoading && !error && products.length > 0 && (
            <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
              <p className="text-xs text-slate-500">
                Showing {filteredProducts.length} of {products.length}
              </p>
              <Link
                href="/admin/add-items"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#45675a] hover:text-[#253b35]"
              >
                Add another
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
