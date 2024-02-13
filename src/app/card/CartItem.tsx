"use client";

import { CartItemWithProduct } from "@/lib/db/card";
import { priceFormatter } from "@/lib/priceFormatter";
import Image from "next/image";
import Link from "next/link";
import { FC, useTransition } from "react";

interface ICartItem {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

const CartItem: FC<ICartItem> = ({
  cartItem: { product, quantity },
  setProductQuantity,
}) => {
  const [isPending, setTransition] = useTransition();
  const quantityOptions: JSX.Element[] = [];
  for (let i = 0; i <= 99; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i === 0 ? "0 Remove" : i}
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
              onChange={(e) => {
                const newQuantity = parseInt(e.currentTarget.value);
                setTransition(async () => {
                  await setProductQuantity(product.id, newQuantity);
                });
              }}
            >
              {quantityOptions}
            </select>
          </div>
          <div>
            <span className="mr-[4px]">Total :</span>
            {isPending ? (
              <span className="loading loading-spinner loading-xs " />
            ) : (
              priceFormatter(product.price * quantity)
            )}
          </div>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
};

export default CartItem;
