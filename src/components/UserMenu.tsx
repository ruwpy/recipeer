"use client";

import { motion as m, Variants, AnimatePresence } from "framer-motion";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { PlusIcon, TagIcon, ShoppingCartIcon, QueueListIcon } from "@heroicons/react/24/outline";

const userMenuVariants: Variants = {
  closed: {
    scale: 0.95,
    opacity: 0,
    transition: { duration: 0.15 },
  },
  open: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.15 },
  },
};

const MenuLink = ({ children, to, icon }: { children: string; to: string; icon: ReactNode }) => {
  return (
    <Link
      className="pl-2 pr-4 transition-colors whitespace-nowrap hover:bg-gray-100 rounded-md py-1.5 flex gap-2"
      href={to}
    >
      {icon}
      {children}
    </Link>
  );
};

const UserMenu = ({ session }: { session: Session }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <div
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="flex gap-2 items-center max-w-[200px] transition-colors overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer bg-white hover:bg-gray-100 p-2 rounded-lg"
      >
        {session?.user?.image && (
          <Image
            width={36}
            height={36}
            src={session.user.image}
            alt="user profile picture"
            className="rounded-lg"
          />
        )}
        <span className="select-none">{session?.user?.name}</span>
      </div>
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <m.div
            animate={isMenuOpen ? "open" : "closed"}
            initial="closed"
            exit="closed"
            variants={userMenuVariants}
            className="absolute bg-white top-14 left-0 shadow-lg border border-gray-200 w-fit rounded-lg p-3"
          >
            <div className="flex flex-col gap-2">
              <MenuLink icon={<QueueListIcon className="w-6 h-6 opacity-40" />} to="/recipes">
                My recipes
              </MenuLink>
              <MenuLink icon={<PlusIcon className="w-6 h-6 opacity-40" />} to="/createrecipe">
                Create new recipe
              </MenuLink>
              <MenuLink
                icon={<ShoppingCartIcon className="w-6 h-6 opacity-40" />}
                to="/shoppinglist"
              >
                Shopping list
              </MenuLink>
              <MenuLink icon={<TagIcon className="w-6 h-6 opacity-40" />} to="/shoppinglist">
                Recipe categories
              </MenuLink>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;
