"use client";

import { Session } from "next-auth";
import Image from "next/image";
import { FC } from "react";

import NonUser from "@/assets/nonUser.svg";
import UserWithoutAvatar from "@/assets/profile-pic-placeholder.png";
import { signIn, signOut } from "next-auth/react";

interface IUserMenuBtn {
  session?: Session | null;
}

const UserMenuBtn: FC<IUserMenuBtn> = ({ session }) => {
  const user = session?.user;
  return (
    <div className="dropdown dropdown-end ">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        {user ? (
          <Image
            src={user?.image || UserWithoutAvatar}
            alt={user?.name || "Profile Avatar"}
            width={40}
            height={40}
            className="w-10 rounded-full"
          />
        ) : (
          <Image src={NonUser} alt="Non user" />
        )}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-sm bg-base-100-100 z-30 mt-3 w-52 p-2 shadow"
      >
        <li>
          {user ? (
            <button onClick={() => signOut({ callbackUrl: "/" })}>
              Sign Out
            </button>
          ) : (
            <button onClick={() => signIn()}>Sign In</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default UserMenuBtn;
