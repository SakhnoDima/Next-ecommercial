"use client";

import Image from "next/image";
import { FC, useState, useTransition } from "react";

import addIcon from "../../../assets/addToCard.svg";

interface IAddCardButton {
  productId: string;
  incrementProductQuantity: (product: string) => Promise<void>;
}

const AddCardButton: FC<IAddCardButton> = ({
  productId,
  incrementProductQuantity,
}) => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  const onButtonClick = () => {
    setSuccess(false);
    startTransition(async () => {
      await incrementProductQuantity(productId);
      setSuccess(true);
    });
  };

  return (
    <div className="flex items-center gap-2">
      <button className="btn btn-primary group" onClick={onButtonClick}>
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
      {isPending && <span className="loading loading-spinner loading-md" />}
      {!isPending && success && (
        <span className="text-success">Added to card</span>
      )}
    </div>
  );
};

export default AddCardButton;
