import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";

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
  const newCard = await prisma.card.create({
    data: {},
  });

  cookies().set("localCard", newCard.id);

  return {
    ...newCard,
    items: [],
    size: 0,
    subtotal: 0,
  };
};

export const getCard = async (): Promise<TShopingCard | null> => {
  const localCard = cookies().get("localCard")?.value;
  if (!localCard) {
    return null;
  }
  const card = await prisma.card.findUnique({
    where: { id: localCard },
    include: { items: { include: { product: true } } },
  });

  if (!card) {
    return null;
  }
  return {
    ...card,
    size: card.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: card.items.reduce((acc, item) => acc + item.product.price, 0),
  };
};
