import { CardItem } from "@prisma/client";

export const cartsMerger = (...cartItems: CardItem[][]) => {
  return cartItems.reduce((acc, items) => {
    items.forEach((item) => {
      const existingItem = acc.find((el) => el.productId === item.productId);

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        acc.push(item);
      }
    });
    return acc;
  }, [] as CardItem[]);
};
