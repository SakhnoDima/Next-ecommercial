import { FC } from "react";

import { prisma } from "@/lib/db/prisma";
import ProductCard from "@/components/ProductCard";
import { Metadata } from "next";
import { title } from "process";

interface ISearchPage {
  searchParams: {
    query: string;
  };
}

export const generateMetadata = ({
  searchParams: { query },
}: ISearchPage): Metadata => {
  return {
    title: `Search: ${query} - Flowmazon`,
  };
};

const searchPage: FC<ISearchPage> = async ({ searchParams: { query } }) => {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { id: "desc" },
  });

  if (products.length === 0) {
    return (
      <div>
        <h3 className=" text-center">No products found!</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default searchPage;
