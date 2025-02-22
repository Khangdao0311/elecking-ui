import Link from "next/link";
import { FaRegHeart, FaStar } from "react-icons/fa6";

function Product(props: { product: IProduct[] }) {
  return (
    <>
      {props.product.map((pro, index) => (
        <div
          key={index}
          className="border rounded-2xl shadow-lg p-4 w-full bg-white flex flex-wrap gap-3"
        >
          <Link href={`http://localhost:3000/product-detail/${pro.id}`}>
            <div className="w-full aspect-square">
              <img
                className="w-full h-full object-contain"
                src={pro.images[0]}
                alt=""
              />
            </div>
            <div className="text-base w-full line-clamp-2 font-medium">
              {pro.name}
            </div>
            <div className="text-xl text-red-500 font-bold">
              {(
                pro.price +
                pro.variants[0].price_extra -
                pro.variants[0].price_sale
              ).toLocaleString("vi-VN")}{" "}
              đ
            </div>
            <div className="flex gap-2.5">
              <del className="text-base font-extralight text-gray-400">
                34.990.000 đ
              </del>
              <div className="bg-primary text-white px-1.5 py-1 rounded-md text-xs font-bold">
                -6%
              </div>
            </div>
          </Link>
          <div className="flex justify-between w-full">
            <div className="center-flex justify-start">
              <FaStar className="w-4.5 h-4.5 text-yellow-500" />
              <FaStar className="w-4.5 h-4.5 text-yellow-500" />
              <FaStar className="w-4.5 h-4.5 text-yellow-500" />
              <FaStar className="w-4.5 h-4.5 text-yellow-500" />
              <FaStar className="w-4.5 h-4.5 text-yellow-500" />
            </div>
            <div className="center-flex gap-1">
              <p>Yêu thích</p>
              <FaRegHeart />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Product;
