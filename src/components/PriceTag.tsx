import { FC } from "react";

import { priceFormatter } from "../lib/priceFormatter";

interface IPriceTag {
  price: number;
  className?: string;
}

export const PriceTag: FC<IPriceTag> = ({ price, className }) => {
  return <span className={`badge ${className}`}>{priceFormatter(price)}</span>;
};
