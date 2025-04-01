"use client";

import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import config from "@/app/config";
import * as categoryService from "@/app/services/categoryService";
import { useStore, actions } from "@/app/store";

function MenuCategory({ onClick }: any) {
  const [state, dispatch] = useStore();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    categoryService
      .getQuery({ limit: 0, orderby: "id-asc", status: 1 })
      .then((res) => setCategories(res.data));
  }, []);

  return (
    <div className="min-w-40 relative flex flex-col overflow-hidden">
      {categories.map((category: ICategory) => (
        <Link
          href={`${config.routes.client.products}?categoryid=${category.id}`}
          key={category.id}
          onClick={() => {
            onClick();
            if (pathname !== config.routes.client.products) dispatch(actions.set_routing(true));
          }}
        >
          <div className="group flex gap-2 p-2 items-center hover:bg-gray-200 cursor-pointer">
            <i
              className={`${category.icon} text-2xl font-bold text-black group-hover:text-primary shrink-0`}
            ></i>
            <p className="w-full text-sm font-base select-none cursor-pointer text-black group-hover:text-primary">
              {category.name}
            </p>
            <FaChevronRight className="shrink-0 text-black group-hover:text-primary" />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default MenuCategory;
