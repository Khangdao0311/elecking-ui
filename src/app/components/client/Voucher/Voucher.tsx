"use client";

import { useEffect, useState } from "react";
import { SlTag } from "react-icons/sl";
import { TbTicket } from "react-icons/tb";
import * as voucherService from "@/app/services/voucherService";
import moment from "moment";


function Voucher({ onClick, onSelect, totalPrice, selectedVoucher }: any) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [disabledIndex] = useState<number[]>([1, 3]);
  const [vouchers, setVouchers] = useState<any[]>([]);
  useEffect(() => {
    voucherService.getVoucher({}).then((res: any) => setVouchers(res.data));
  }, []);

  useEffect(() => {
    if (selectedVoucher) {
      const index = vouchers.findIndex(v => v.id === selectedVoucher.id);
      if (index !== -1) setSelectedIndex(index);
    }
  }, [selectedVoucher, vouchers]);

  const handleSelectVoucher = (index: number) => {
    if (selectedIndex === index) {
      setSelectedIndex(null);
      onSelect?.(null);
    } else {
      setSelectedIndex(index);
      onSelect?.(vouchers[index]);
    }
  };



  return (
    <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
      <div className="bg-white rounded-lg shadow-xl w-[426px] center-fixed flex flex-col gap-4 z-50 ">
        <div className="flex items-center w-full gap-3 bg-white p-2.5 rounded-t-2xl">
          <TbTicket className="w-6 h-6 text-blue-600" />
          <h2 className="text-blue-600 font-bold text-base flex items-center">
            KHUYẾN MÃI
          </h2>
        </div>

        <div className="flex flex-col gap-1.5 border-b-[1px] border-t-[1px] border-gray-300 p-2.5">
          {Array.isArray(vouchers) && vouchers.length > 0 ? (
            vouchers.map((voucher, index) => {
              const isDisabled = totalPrice < voucher?.min_order_value;

              return (
                <div
                  key={index}
                  className={`flex relative items-center border justify-between rounded-lg p-2 shadow-lg cursor-pointer
                    ${selectedIndex === index ? "border-primary" : "border-gray-300"}
                    ${isDisabled ? "opacity-50 pointer-events-none" : "bg-white"}
                `}
                  onClick={() => handleSelectVoucher(index)}
                >
                  <div className="flex items-start gap-1.5">
                    <div className="bg-primary text-white w-16 h-16 rounded-lg flex items-center justify-center">
                      <SlTag className="text-2xl" />
                    </div>
                    <div className="flex flex-col items-start">
                      <p className="text-primary text-base font-semibold">
                        Giảm {(voucher?.discount_value).toLocaleString('vn-VN')} đ
                      </p>
                      <p className="text-xs font-light text-gray-500">
                        Đơn Tối Thiểu {((voucher?.min_order_value).toLocaleString('vn-VN'))} đ
                      </p>
                      <p className="text-xs font-light text-gray-500">
                        HSD: <span>{moment(voucher?.end_date, "YYYYMMDD").format("DD/MM/YYYY")}</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="coupon"
                      className="ml-2"
                      checked={selectedIndex === index}
                      readOnly
                      disabled={isDisabled}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500">Không có voucher nào.</p>
          )}
        </div>

        <div className="flex justify-end gap-2.5 p-2.5">
          <div
            className="px-10 text-base font-normal py-2.5 border rounded-lg text-primary border-primary cursor-pointer"
            onClick={onClick}
          >
            Hủy
          </div>
          <div
            onClick={() => {
              if (selectedIndex !== null) {
                onSelect?.(vouchers[selectedIndex]);
              } else {
                onSelect?.(null);
              }
              onClick?.();
            }}
            className="px-10 text-base font-bold py-2.5 bg-primary text-white rounded-lg cursor-pointer"
          >
            Chọn
          </div>
        </div>
      </div>
    </div>
  );
}

export default Voucher;
