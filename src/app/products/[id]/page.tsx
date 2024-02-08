import { PriceTag } from "@/components/PriceTag";
import { prisma } from "@/lib/db/prisma";
import { Product } from "@prisma/client";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";

interface IProductsPageProps {
  params: {
    id: string;
  };
}

const getProductCached = cache(async (id: string): Promise<Product> => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();
  return product;
});

export async function generateMetadata({
  params: { id },
}: IProductsPageProps): Promise<Metadata> {
  const product = await getProductCached(id);
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
}

export default async function ProductPage({
  params: { id },
}: IProductsPageProps) {
  const product = await getProductCached(id);

  return (
    <div className="flex flex-col gap-[20px] lg:flex-row lg:items-center">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={400}
        height={800}
        className="mx-auto  rounded-lg lg:m-0 "
        property=""
      />
      <div>
        <h2 className="text-5xl font-bold">{product.name}</h2>
        <PriceTag className="mt-4" price={product.price} />
        <p className="py-6">{product.description}</p>
      </div>
    </div>
  );
}
