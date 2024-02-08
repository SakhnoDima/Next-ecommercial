"use server";

import { createCard, getCard } from "@/lib/db/card";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export const incrementProductQuantity = async (productId: string) => {
  const card = (await getCard()) ?? (await createCard());

  const articleInCard = card.items.find((el) => el.productId === productId);

  if (articleInCard) {
    await prisma.cardItem.update({
      where: { id: articleInCard.id },
      data: { quantity: { increment: 1 } },
    });
  } else {
    await prisma.cardItem.create({
      data: {
        cardId: card.id,
        productId,
        quantity: 1,
      },
    });
  }
  revalidatePath("/products/[id]");
};
