import { getCard } from "@/lib/db/card";
import CartItem from "./CartItem";
import { seProductQuantity } from "./actions";
import { priceFormatter } from "@/lib/priceFormatter";

export const metadata = {
  title: "Your Cart -  Flowmazon",
};

const CartPage = async () => {
  const cart = await getCard();

  return (
    <div>
      <h1 className="mx-auto mb-[20px] text-3xl font-bold">Shopping cart</h1>
      {!cart?.items.length && <p>You don`t any products in your cart!</p>}
      {cart?.items.map((cartItem) => (
        <CartItem
          key={cartItem.id}
          cartItem={cartItem}
          setProductQuantity={seProductQuantity}
        />
      ))}
      <div className="mt-[200px] flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total in carts : {priceFormatter(cart?.subtotal || 0)}
        </p>
        <button className="btn btn-primary sm:w-[200px]">Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
