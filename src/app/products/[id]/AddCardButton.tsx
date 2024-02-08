"use client";

import Image from "next/image";
import { FC } from "react";

import addIcon from "../../../assets/addToCard.svg";

interface IAddCardButton {
  productId: string;
}

const AddCardButton: FC<IAddCardButton> = ({ productId }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        className="btn btn-primary group"
        onClick={() => console.log(productId)}
      >
        <p className="transition-transform group-hover:scale-110">
          Add co Card
        </p>
        <Image
          src={addIcon}
          alt="alt"
          width={32}
          height={32}
          className="transition-transform group-hover:translate-x-1"
        />
      </button>
    </div>
  );
};

export default AddCardButton;
