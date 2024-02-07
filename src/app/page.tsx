import Image from "next/image";

import { prisma } from "@/lib/db/prisma";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <main>
      <div>
        <div className="hero bg-base-200 rounded-xl">
          <div className="hero-content flex-col lg:flex-row">
            <Image
              src={products[0].imageUrl}
              alt={products[0].name}
              width={400}
              height={800}
              className="max-h-[800px] w-full max-w-sm rounded-lg shadow-2xl"
              priority
            />
            <div>
              <h1 className="text-5xl font-bold ">{products[0].name}</h1>
              <p className="py-6">{products[0].description}</p>
              <Link
                href={"/products" + products[0].id}
                className="btn btn-primary"
              >
                Check it out
              </Link>
            </div>
          </div>
        </div>
        <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.slice(1).map((el) => (
            <ProductCard key={el.id} product={el} />
          ))}
        </div>
      </div>
    </main>
  );
}
