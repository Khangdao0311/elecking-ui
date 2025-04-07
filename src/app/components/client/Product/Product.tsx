"use client";
import Link from "next/link";
import { FaRegHeart, FaStar, FaRegStar, FaHeart } from "react-icons/fa6";
import { Fragment, useEffect, useState } from "react";
import { Rate } from "antd";

import config from "@/app/config";
import * as authServices from "@/app/services/authService";
import { useStore, actions } from "@/app/store";
import { usePathname } from "next/navigation";

function Product(props: { product: IProduct }) {
  const [state, dispatch] = useStore();

  const pathname = usePathname();

  function handleAddToWish(id: string) {
    authServices.wish(state.user.id, id).then((res) => {
      dispatch(actions.re_render());
    });
  }

  function handleRemoveFromWish(id: string) {
    authServices.wish(state.user.id, id).then((res) => {
      dispatch(actions.re_render());
    });
  }

  return (
    <div className="border rounded-2xl p-4 w-full !h-full bg-white flex flex-wrap gap-2 cursor-pointer transition-all duration-150  ">
      <Link
        href={`${config.routes.client.productDetail}/${props.product.id}`}
        onClick={() => {
          if (pathname !== `${config.routes.client.productDetail}/${props.product.id}`)
            dispatch(actions.set_routing(true));
        }}
        className="w-full !aspect-square"
      >
        <img
          className="w-full !aspect-square object-contain opacity-"
          src={props.product.variants[0].colors[0].image}
          alt=""
        />
      </Link>
      <Link
        href={`${config.routes.client.productDetail}/${props.product.id}`}
        onClick={() => {
          if (pathname !== `${config.routes.client.productDetail}/${props.product.id}`)
            dispatch(actions.set_routing(true));
        }}
        className="text-base w-full h-12 line-clamp-2 font-medium"
      >
        {props.product.name}
      </Link>
      <div className="text-lg text-primary font-bold w-full text-nowrap">
        {(props.product.variants[0].price - props.product.variants[0].price_sale).toLocaleString(
          "vi-VN"
        )}{" "}
        đ
      </div>

      <div
        className={`flex gap-2.5 flex-wrap text-nowrap ${
          props.product.variants[0].price_sale === 0 ? "opacity-0" : "opacity-100"
        }`}
      >
        {props.product.variants[0].price - props.product.variants[0].price_sale <
          props.product.variants[0].price && (
          <del className="text-base font-normal text-gray-400">
            {props.product.variants[0].price.toLocaleString("vi-VN")} đ
          </del>
        )}
        <div className={`bg-primary text-white px-1.5 py-1 rounded-md text-xs font-bold`}>
          {Math.ceil(
            100 -
              ((props.product.variants[0].price - props.product.variants[0].price_sale) /
                props.product.variants[0].price) *
                100
          )}{" "}
          %
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="center-flex justify-start items-start ">
          {props.product.rating !== null && (
            <Fragment>
              <Rate
                className="text-secondaryDark text-base shrink-0"
                defaultValue={Math.ceil(props.product.rating * 2) / 2}
                allowHalf
                disabled
                characterRender={(char) => <span style={{ marginInlineEnd: "1px" }}>{char}</span>}
              />{" "}
              <span className="text-xs select-none"> ({props.product.rating})</span>
            </Fragment>
          )}
        </div>
        <div className="center-flex gap-1 cursor-pointer">
          <p className="text-gray-700 line-clamp-1 hidden sm:flex">Yêu thích</p>
          {state.wish.includes(props.product.id) ? (
            <div
              className="group relative"
              onClick={() => {
                if (state.user) {
                  handleRemoveFromWish(props.product.id);
                } else {
                  dispatch(actions.set({ show: { ...state.show, login: true } }));
                }
              }}
            >
              <FaHeart className="text-primary group-hover:scale-125 transition-all duration-300" />
              <FaHeart className="hidden absolute inset-0 animate-ping group-hover:block text-primary" />
            </div>
          ) : (
            <div
              className="group relative"
              onClick={() => {
                if (state.user) {
                  handleAddToWish(props.product.id);
                } else {
                  dispatch(actions.set({ show: { ...state.show, login: true } }));
                }
              }}
            >
              <FaRegHeart className="text-primary group-hover:scale-125 transition-all duration-300" />
              <FaHeart className="hidden absolute inset-0 animate-ping group-hover:block text-primary" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
