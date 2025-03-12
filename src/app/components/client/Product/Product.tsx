import Link from "next/link";
import { FaRegHeart, FaStar, FaRegStar  } from "react-icons/fa6";
import config from "@/app/config";
import { BsStar, BsStarFill } from "react-icons/bs";
function Product(props: { product: IProduct }) {
  return (
    <>
      <div className="border rounded-2xl shadow-lg p-4 w-full bg-white flex flex-wrap gap-3">
        <Link
          className="flex flex-wrap gap-2.5"
          href={`${config.routes.client.productDetail}/${props.product.id}`}
        >
          <div className="w-full aspect-square">
            <img
              className="w-full h-full object-contain"
              src={props.product.variants[0].colors[0].image}
              alt=""
            />
          </div>
          <div className="text-base w-full h-12 line-clamp-2 font-medium">
            {props.product.name}
          </div>
          <div className="text-xl text-red-500 font-bold w-full">
            {(
              props.product.variants[0].price -
              props.product.variants[0].price_sale
            ).toLocaleString("vi-VN")}{" "}
            đ
          </div>
          <div className="flex gap-2.5">
            {props.product.variants[0].price -
              props.product.variants[0].price_sale <
              props.product.variants[0].price && (
              <del className="text-base font-extralight text-gray-400">
                {props.product.variants[0].price.toLocaleString("vi-VN")} đ
              </del>
            )}
            {Math.ceil(
              100 -
                ((props.product.variants[0].price -
                  props.product.variants[0].price_sale) /
                  props.product.variants[0].price) *
                  100
            ) > 0 && (
              <div className="bg-primary text-white px-1.5 py-1 rounded-md text-xs font-bold">
                {Math.ceil(
                  100 -
                    ((props.product.variants[0].price -
                      props.product.variants[0].price_sale) /
                      props.product.variants[0].price) *
                      100
                )}{" "}
                %
              </div>
            )}
          </div>
        </Link>
        <div className="flex justify-between w-full">
          {/* {props.product.rating}   */}
          <div className="center-flex justify-start">
            {/* <FaStar className="w-4.5 h-4.5 text-yellow-500" />
            <FaStar className="w-4.5 h-4.5 text-yellow-500" />
            <FaStar className="w-4.5 h-4.5 text-yellow-500" />
            <FaStar className="w-4.5 h-4.5 text-yellow-500" />
            <FaStar className="w-4.5 h-4.5 text-yellow-500" /> */}
            {Array.from({ length: props.product.rating }).map((_, i: number) => (
              <FaStar 
              className="w-4.5 h-4.5 text-yellow-500"
              key={i} />
            ))}
            {Array.from({ length: 5 - props.product.rating }).map(
              (_, i: number) => (
                <FaRegStar key={i}  className="w-4.5 h-4.5 text-yellow-500" />
              )
            )}
          </div>
          <div className="center-flex gap-1">
            <p>Yêu thích</p>
            <FaRegHeart />
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
