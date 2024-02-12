"use client";

import { CartItemWithProduct } from "@/lib/db/card";
import { priceFormatter } from "@/lib/priceFormatter";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface ICartItem {
  cartItem: CartItemWithProduct;
}

const CartItem: FC<ICartItem> = ({ cartItem: { product, quantity } }) => {
  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>,
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className="rounded-lg"
        />
        <div>
          <Link href={"/products/" + product.id} className="font-bold">
            {product.name}
          </Link>
          <p>Price : {priceFormatter(product.price)}</p>
          <div className="my-1 flex items-center gap-2">
            Quantity:
            <select
              className="select select-bordered max-h-[100px] w-full max-w-[80px]"
              defaultValue={quantity}
            >
              {quantityOptions}
            </select>
          </div>
          <p>Total : {priceFormatter(product.price * quantity)}</p>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
};

export default CartItem;
