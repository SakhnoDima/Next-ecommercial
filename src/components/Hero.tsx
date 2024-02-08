import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IHero {
  product: Product;
}

const Hero: React.FC<IHero> = ({ product }) => {
  return (
    <div className="hero bg-base-200 rounded-xl">
      <div className="hero-content flex-col lg:flex-row">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={400}
          height={400}
          className="max-h-[800px] w-full max-w-sm rounded-lg shadow-2xl"
          priority
        />
        <div>
          <h1 className="text-5xl font-bold ">{product.name}</h1>
          <p className="py-6">{product.description}</p>
          <Link href={"/products/" + product.id} className="btn btn-primary">
            Check it out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
