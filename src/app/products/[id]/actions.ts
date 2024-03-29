"use server";
import { revalidatePath } from "next/cache";

import { createCard, getCard } from "@/lib/db/card";
import { prisma } from "@/lib/db/prisma";

export const incrementProductQuantity = async (productId: string) => {
  const card = (await getCard()) ?? (await createCard());

  const articleInCard = card.items.find((el) => el.productId === productId);

  if (articleInCard) {
    await prisma.card.update({
      where: { id: card.id },
      data: {
        items: {
          update: {
            where: { id: articleInCard.id },
            data: { quantity: { increment: 1 } },
          },
        },
      },
    });
  } else {
    await prisma.card.update({
      where: {
        id: card.id,
      },
      data: {
        items: {
          create: {
            productId,
            quantity: 1,
          },
        },
      },
    });
  }
  revalidatePath("/products/[id]");
};
