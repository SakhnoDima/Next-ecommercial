import { getCard } from "@/lib/db/card";
import CartItem from "./CartItem";

export const metadata = {
  title: "Your Cart -  Flowmazon",
};

const CartPage = async () => {
  const cart = await getCard();

  return (
    <div>
      <h1 className="mx-auto mb-[20px] text-3xl font-bold">Shopping cart</h1>
      {cart?.items.map((cartItem) => (
        <CartItem key={cartItem.id} cartItem={cartItem} />
      ))}
    </div>
  );
};

export default CartPage;
