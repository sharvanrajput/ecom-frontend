import { ShopContext } from "@/context/ShopContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

const ProductItem = ({ id, name, image, price, category, subCategory }) => {
  const { corrency } = useContext(ShopContext);
  return (
    <Link className="cursor-pointer text-gray-700" href={`/product/${id}`}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-slate-100">
        {image?.[0] ? (
          <Image
            src={image[0]}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
            className="object-cover transition ease-in-out hover:scale-110"
            alt={name}
          />
        ) : (
          <span className="flex size-full items-center justify-center text-xs text-slate-400">
            No image
          </span>
        )}
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      {(category || subCategory) && (
        <p className="pb-1 text-xs text-gray-500">
          {category}
          {category && subCategory ? " · " : ""}
          {subCategory}
        </p>
      )}
      <p className="text-sm font-medium">
        {corrency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
