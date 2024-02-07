import { FC } from "react";

interface IProductMark {
  mark: string;
  className?: string;
}

const ProductMark: FC<IProductMark> = ({ mark, className }) => {
  return <span className={`badge ${className}`}>{mark}</span>;
};

export default ProductMark;
