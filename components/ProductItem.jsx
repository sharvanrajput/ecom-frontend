import { ShopContext } from "@/context/ShopContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

const ProductItem = ({ id, name, image, price, category, subCategory }) => {
  const { corrency } = useContext(ShopContext);
  return (
    <Link className="text-gray-700 cursor-pointer" href={`/product/${id}`}>
      <div className="overflow-hidden">
        <Image
          src={image[0]}
          className="hover:scale-110 transition ease-in-out"
          alt={name}
        />
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
