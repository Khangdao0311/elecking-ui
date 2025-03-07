"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { BiCategory } from "react-icons/bi";

import Logo from "@/app/assets/Logo";
import { FaCaretDown } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaAngleLeft, FaAngleRight, FaCircleUser } from "react-icons/fa6";
import Link from "next/link";
import { useState } from "react";

import config from "@/app/config";
import LogoMobile from "@/app/assets/LogoMobile";
import MenuCategory from "../MenuCategory";
import ModalLogin from "../ModalLogin";
function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <header className="sticky top-0 w-full z-30">
        <div className="bg-[#E9EFFF] h-11 p-2 hidden md:block">
          <Swiper
            className="container-custom h-full relative "
            slidesPerView={3}
            spaceBetween={16}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            navigation={true}
            // navigation={{
            //   nextEl: ".custom-next",
            //   prevEl: ".custom-prev",
            // }}
            modules={[Autoplay, Navigation]}
            breakpoints={{
              1024: { slidesPerView: 3 },
              0: { slidesPerView: 2 },
            }}
          >
            <SwiperSlide className="">
              <img
                className="w-full h-full object-cover px-10 "
                src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/Top%20banner_Giao%20hang.svg"
                alt="Benner"
              />
            </SwiperSlide>
            <SwiperSlide className="">
              <img
                className="w-full h-full object-cover px-10 "
                src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/Top%20banner_Chinh%20hang.svg"
                alt="Benner"
              />
            </SwiperSlide>
            <SwiperSlide className="">
              <img
                className="w-full h-full object-cover px-10 "
                src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/Top%20banner_Thu%20cu.svg"
                alt="Benner"
              />
            </SwiperSlide>
            <SwiperSlide className="">
              <img
                className="w-full h-full object-cover px-10 "
                src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/Top%20banner_Giao%20hang.svg"
                alt="Benner"
              />
            </SwiperSlide>
            {/* navigation custom */}
            {/* <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10">
              <FaAngleLeft className="w-7 h-7" />
            </button>
            <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10">
              <FaAngleRight className="w-7 h-7" />
            </button> */}
          </Swiper>
        </div>
        <div className="bg-primary py-3 px-3 md:px-3.5 md:py-3.5 lg:px-4 lg:py-4 xl:px-0 ">
          <div className="container-custom flex gap-4">
            {/* Logo elecking */}
            <Link href={config.routes.client.home} className=" w-12 md:w-[200px] h-12">
              <Logo className="hidden md:block" />
              <LogoMobile className="block md:hidden" />
            </Link>

            {/* Icon category list */}
            <div className=" hidden md:block">
              <div
                className=" w-[92px] h-12 items-center justify-center flex hover:bg-white/20 cursor-pointer rounded-lg"
                onClick={() => setShowMenu(showMenu ? false : true)}
              >
                <BiCategory className="w-9 h-9 text-white" />
                <FaCaretDown className="w-6 h-6 text-white" />
              </div>
              {showMenu && <MenuCategory />}
            </div>

            {/* Search */}
            <div className=" flex-1 h-12 relative">
              <input
                type="text"
                className="w-full h-full rounded-lg border border-stone-300 pl-4 pr-20 outline-primaryDark"
                placeholder="Bạn cần tìm gì ?"
              />
              <button className="w-16 h-8 center-flex bg-primary rounded absolute top-2 right-2">
                <IoSearchSharp className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Icon Cart */}
            <div className="w-[92px] h-12 center-flex">
              <div className="relative">
                <AiOutlineShoppingCart className="w-9 h-9 text-white" />
                <div className="absolute w-7 h-7 border border-white font-semibold text-base center-flex bg-secondary center-flex rounded-full top-0 right-0 translate-x-1/2	-translate-y-1/3 md:-translate-y-1/2	">
                  1
                </div>
              </div>
            </div>

            {/* Icon login / register */}
            <div
              className="hidden w-[92px] h-12 bg-white rounded-lg md:center-flex flex-col cursor-pointer select-none"
              onClick={() => setShowLogin(true)}
            >
              <FaCircleUser className="text-base w-6 h-6" />
              <p className="text-black text-xs font-medium">Emember</p>
            </div>
          </div>
        </div>
      </header>
      {showLogin && (
        <>
          <ModalLogin onClick={() => setShowLogin(false)} />
          <div className="overlay"></div>
        </>
      )}
      {showMenu && (
        <div
          onClick={() => setShowMenu(false)}
          className="bg-black/30 fixed inset-0 z-20 cursor-pointer"
        ></div>
      )}
    </>
  );
}

export default Header;
