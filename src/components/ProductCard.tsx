import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import { Product } from "@prisma/client";
import { PriceTag } from "./PriceTag";
import { isNewProduct } from "@/lib/isNewProduct";
import ProductMark from "./ProductMark";

interface IProductCard {
  product: Product;
}

const ProductCard: FC<IProductCard> = ({ product }) => {
  return (
    <Link
      key={product.id}
      href={"/products/" + product.id}
      className="card bg-base-100 w-full transition-shadow hover:shadow-xl"
    >
      <figure>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={800}
          height={800}
          className="h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        {isNewProduct(product.createdAt) ? (
          <ProductMark mark="NEW" className="badge-secondary" />
        ) : (
          ""
        )}
        <p>{product.description}</p>
        <PriceTag price={product.price} />
      </div>
    </Link>
  );
};

export default ProductCard;
