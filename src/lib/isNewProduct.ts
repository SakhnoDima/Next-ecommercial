import { isNew } from "./constants/constants";

export const isNewProduct = (createdAt: Date): Boolean => {
  return Date.now() - new Date(createdAt).getTime() < isNew;
};
