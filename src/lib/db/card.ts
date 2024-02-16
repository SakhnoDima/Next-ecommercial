import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { Card, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { cartsMerger } from "../cartsMerger";

export type CardWithProducts = Prisma.CardGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type CartItemWithProduct = Prisma.CardItemGetPayload<{
  include: { product: true };
}>;

export type TShopingCard = CardWithProducts & {
  size: number;
  subtotal: number;
};

export const createCard = async (): Promise<TShopingCard> => {
  const session = await getServerSession(authOptions);
  let newCard: Card;

  if (session) {
    newCard = await prisma.card.create({
      data: {
        userId: session.user.id,
      },
    });
  } else {
    newCard = await prisma.card.create({
      data: {},
    });
    //! Note: needs encrypt and secure in real product app!
    cookies().set("localCard", newCard.id);
  }

  return {
    ...newCard,
    items: [],
    size: 0,
    subtotal: 0,
  };
};

export const getCard = async (): Promise<TShopingCard | null> => {
  const session = await getServerSession(authOptions);
  let card: CardWithProducts | null = null;

  if (session) {
    card = await prisma.card.findFirst({
      where: {
        userId: session.user.id,
      },
      include: { items: { include: { product: true } } },
    });
  } else {
    const localCard = cookies().get("localCard")?.value;
    if (!localCard) {
      return null;
    }
    card = await prisma.card.findUnique({
      where: { id: localCard },
      include: { items: { include: { product: true } } },
    });
  }

  if (!card) {
    return null;
  }
  return {
    ...card,
    size: card.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: card.items.reduce((acc, item) => acc + item.product.price, 0),
  };
};

export const mergeAnonToUserCart = async (userId: string) => {
  const localCardId = cookies().get("localCard")?.value;

  const localCard = localCardId
    ? await prisma.card.findUnique({
        where: { id: localCardId },
        include: { items: true },
      })
    : null;

  if (!localCard) return;

  const userCard = await prisma.card.findFirst({
    where: { userId },
    include: { items: true },
  });

  await prisma.$transaction(async (tx) => {
    if (userCard) {
      const mergedCartItems = cartsMerger(localCard.items, userCard.items);

      await tx.cardItem.deleteMany({
        where: {
          cardId: userCard.id,
        },
      });
      await tx.cardItem.createMany({
        data: mergedCartItems.map((item) => ({
          cardId: userCard.id,
          productId: item.productId,
          quantity: item.quantity,
        })),
      });
    } else {
      await tx.card.create({
        data: {
          userId,
          items: {
            createMany: {
              data: localCard.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    }

    await tx.card.delete({
      where: { id: localCard.id },
    });
  });

  cookies().set("localCardId", "");
};
