"use client";
import Sidebar from "@/app/components/client/sidebar_user";
import { FaUser } from "react-icons/fa6";
function AccountHome() {
  return (
    <>
      <div className="container-custom flex gap-4 py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <Sidebar />
        <div className="w-[956px] flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-gray-300 w-[92px] h-[92px] rounded-full flex items-center justify-center">
              <FaUser className="w-[45px] h-[45px]" />
            </div>
            <div className="flex flex-col gap-2.5">
              <p className="text-xl font-bold">Nguyễn Đặng</p>
              <p className="text-sm font-semibold">0976232323</p>
            </div>
          </div>
          <div className="py-4 flex border-gray-200 border shadow-md ">
            <div className="w-[478px] border-r-[1px] border-r-gray-200">
              <p className="text-xl font-bold w-full text-center">3</p>
              <p className="text-base font-normal w-full text-center">đơn hàng</p>
            </div>
            <div className="w-[478px] ">
              <p className="text-xl font-bold w-full text-center">65.580.000 đ</p>
              <p className="text-base font-normal w-full text-center">Tổng tiền đã tích lũy</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountHome;
