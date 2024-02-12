"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import CartImg from "../../assets/addToCard.svg";
import { TShopingCard } from "@/lib/db/card";
import { priceFormatter } from "@/lib/priceFormatter";

interface IShoppingCartButton {
  cart: TShopingCard | null;
}

const ShoppingCartButton: FC<IShoppingCartButton> = ({ cart }) => {
  const cartCloseDropdown = () => {
    const elem = document.activeElement as HTMLElement;
    if (elem) {
      elem.blur();
    }
  };
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn-ghost btn btn-circle">
        <div className="indicator">
          <Image src={CartImg} alt="ShoppingCartBtn" width={25} height={25} />
          <span className="badge badge-sm indicator-item">
            {cart?.size || 0}
          </span>
        </div>
      </label>
      <div
        tabIndex={0}
        className="card dropdown-content card-compact bg-base-100 z-30 mt-3 w-52 shadow"
      >
        <div className="card-body">
          <span className="text-lg font-bold">{cart?.size || 0} Items</span>
          <span className="text-info">
            Subtotal: {priceFormatter(cart?.subtotal || 0)}
          </span>
          <div className="card-actions">
            <Link
              href="/card"
              className="btn btn-primary btn-block"
              onClick={cartCloseDropdown}
            >
              View card
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartButton;
