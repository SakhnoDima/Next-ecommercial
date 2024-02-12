import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import Logo from "../../assets/logo.png";
import { redirect } from "next/navigation";
import { getCard } from "@/lib/db/card";
import ShoppingCartButton from "./ShoppingCartButton";

const searchProducts = async (formData: FormData) => {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
};

const Navbar: FC<{}> = async () => {
  const cart = await getCard();

  return (
    <header className="bg-base-100">
      <div className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            <Image src={Logo} alt="Flomazon logo" height={40} width={40} />
            Flowmazon
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={searchProducts}>
            <div className="form-control">
              <input
                type="text"
                name="searchQuery"
                placeholder="Search"
                className="input input-bordered w-full min-w-[100px]"
              />
            </div>
          </form>
          <ShoppingCartButton cart={cart} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
