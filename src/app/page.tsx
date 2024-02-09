import { prisma } from "@/lib/db/prisma";

import ProductCard from "@/components/ProductCard";
import Hero from "@/components/Hero";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <>
      <Hero product={products[0]} />
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.slice(1).map((el) => (
          <ProductCard key={el.id} product={el} />
        ))}
      </div>
    </>
  );
}
