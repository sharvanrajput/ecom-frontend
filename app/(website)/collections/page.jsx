"use client";

import ProductItem from "@/components/ProductItem";
import { ShopContext } from "@/context/ShopContext";
import { useContext, useMemo, useState } from "react";

export default function CollectionsPage() {
  const { products } = useContext(ShopContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))].sort(),
    [products],
  );
  const subcategories = useMemo(
    () => [...new Set(products.map((product) => product.subCategory))].sort(),
    [products],
  );
  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          (selectedCategories.length === 0 ||
            selectedCategories.includes(product.category)) &&
          (selectedSubcategories.length === 0 ||
            selectedSubcategories.includes(product.subCategory)),
      ),
    [products, selectedCategories, selectedSubcategories],
  );

  const toggleFilter = (value, setSelectedValues) => {
    setSelectedValues((selectedValues) =>
      selectedValues.includes(value)
        ? selectedValues.filter((selectedValue) => selectedValue !== value)
        : [...selectedValues, value],
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSubcategories([]);
  };

  const hasFilters =
    selectedCategories.length > 0 || selectedSubcategories.length > 0;

  return (
    <main className="flex-1 ">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-9 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
            Find your style
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            All collections
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
            Browse every product by category and subcategory.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[230px_minmax(0,1fr)]">
          <aside
            aria-label="Product filters"
            className="self-start rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-24"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">
                Filters
              </h2>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-medium text-slate-500 underline underline-offset-4 transition-colors hover:text-orange-600"
                >
                  Clear all
                </button>
              )}
            </div>

            <fieldset>
              <legend className="mb-3 text-sm font-medium text-slate-800">
                Category
              </legend>
              <div className="flex flex-wrap gap-x-5 gap-y-3 lg:flex-col">
                {categories.map((category) => (
                  <label
                    key={category}
                    className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() =>
                        toggleFilter(category, setSelectedCategories)
                      }
                      className="size-4 rounded border-slate-300 accent-orange-600"
                    />
                    {category}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-6 border-t border-slate-100 pt-5">
              <legend className="mb-3 text-sm font-medium text-slate-800">
                Subcategory
              </legend>
              <div className="flex flex-wrap gap-x-5 gap-y-3 lg:flex-col">
                {subcategories.map((subcategory) => (
                  <label
                    key={subcategory}
                    className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSubcategories.includes(subcategory)}
                      onChange={() =>
                        toggleFilter(subcategory, setSelectedSubcategories)
                      }
                      className="size-4 rounded border-slate-300 accent-orange-600"
                    />
                    {subcategory}
                  </label>
                ))}
              </div>
            </fieldset>
          </aside>

          <section aria-label="Collection products">
            <p className="mb-4 text-sm text-slate-500" aria-live="polite">
              Showing {filteredProducts.length} of {products.length} products
            </p>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductItem
                    key={product._id}
                    id={product._id}
                    name={product.name}
                    image={product.image}
                    price={product.price}
                    category={product.category}
                    subCategory={product.subCategory}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                <h2 className="text-lg font-medium text-slate-900">
                  {products.length === 0
                    ? "No products available yet"
                    : "No products match these filters"}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  {products.length === 0
                    ? "Please check back soon."
                    : "Try choosing a different category or subcategory."}
                </p>
                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-600"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
