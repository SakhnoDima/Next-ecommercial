import { prisma } from "@/lib/db/prisma";

import ProductCard from "@/components/ProductCard";
import Hero from "@/components/Hero";
import PaginationBar from "@/components/PaginationBar";
import { FC } from "react";
import { HERO_ITEM, PAGE_SIZE } from "@/lib/constants/constants";

interface IHome {
  searchParams: { page: string };
}

const Home: FC<IHome> = async ({ searchParams: { page = "1" } }) => {
  const currentPage = parseInt(page);

  const totalItem = await prisma.product.count();

  const totalPages = Math.ceil((totalItem - HERO_ITEM) / PAGE_SIZE);

  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    skip: (currentPage - 1) * PAGE_SIZE + (currentPage === 1 ? 0 : HERO_ITEM),
    take: PAGE_SIZE + (currentPage === 1 ? HERO_ITEM : 0),
  });

  return (
    <div className="flex flex-col items-center">
      {currentPage === 1 && <Hero product={products[0]} />}
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(currentPage === 1 ? products.slice(1) : products).map((el) => (
          <ProductCard key={el.id} product={el} />
        ))}
      </div>
      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPage={totalPages} />
      )}
    </div>
  );
};

export default Home;
