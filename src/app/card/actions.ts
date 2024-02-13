"use server";
import { createCard, getCard } from "@/lib/db/card";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export const seProductQuantity = async (
  productId: string,
  quantity: number,
) => {
  const card = (await getCard()) ?? (await createCard());

  const articleInCard = card.items.find((el) => el.productId === productId);

  if (quantity === 0) {
    if (articleInCard) {
      await prisma.cardItem.delete({
        where: {
          id: articleInCard?.id,
        },
      });
    }
  } else {
    if (articleInCard) {
      await prisma.cardItem.update({
        where: {
          id: articleInCard.id,
        },
        data: {
          quantity,
        },
      });
    } else {
      await prisma.cardItem.create({
        data: {
          cardId: card.id,
          productId,
          quantity,
        },
      });
    }
  }
  revalidatePath("/card");
};
