"use client";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import Boxsearchlimit from "@/app/components/admin/boxsearchlimtit";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { Pagination } from "antd";
import { CiCircleMore } from "react-icons/ci";
function ProductList() {
  const [productdetail, setProductdetail] = useState(false)

  const showproductdetail = () => setProductdetail(true)
  const closeproductdetail = () => setProductdetail(false)
  return (
    <>
      <TitleAdmin title="Danh Sách Sản Phẩm" />
      <Boxsearchlimit title="Sản Phẩm" />
      <div className=" bg-white shadow-xl rounded-lg px-4 py-4 flex items-start flex-col gap-4">
        <div className="flex items-center gap-2.5 p-2.5 bg-green-100 rounded">
          <GoPlus className="w-6 h-6" />
          <p className="text-sm font-bold">Tạo sản phẩm mới</p>
        </div>
        <table className="w-full bg-white shadow-xl rounded-lg overflow-hidden text-sm font-normal">
          <thead className="bg-stone-100">
            <tr>
              <th className="px-2 py-2.5 min-w-12 text-sm font-bold">STT</th>
              <th className=" min-w-16 px-2 py-2.5  text-sm font-bold">Ảnh</th>
              <th className="px-2 py-2.5 w-full text-left text-sm font-bold ">
                <span className="w-full h-full line-clamp-1">Tên Sản Phẩm</span>
              </th>
              <th className="px-2 py-2.5 w-[128px] text-left text-sm font-bold ">
                Giá Sản Phẩm
              </th>
              <th className="px-2 py-2.5 w-[96px] text-center text-sm font-bold ">
                Số Lượng
              </th>
              <th className="px-2 py-2.5 w-[200px] text-center  text-sm font-bold ">
                Biến Thể
              </th>
              <th className="px-2 py-2.5 w-[112px] text-center text-sm font-bold ">
                Màu Sắc
              </th>
              <th className="px-2 py-2.5 w-[144px] text-sm font-bold">
                Trạng Thái
              </th>
              <th className="px-2 py-2.5  w-24 text-sm font-bold">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            <tr className="even:bg-gray-100">
              <td className="px-2 py-2.5 w-12 text-center">1</td>
              <td className="px-2 min-w-12 py-1 text-center">
                <div className="flex items-center justify-center">
                  <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
                    alt="Điện thoại"
                    className="w-8 h-8 rounded"
                  />
                </div>
              </td>
              <td className="px-2 w-full py-2.5">
                <span className="line-clamp-1">Samsung Galaxy S25 Ultra</span>
              </td>
              <td className="px-2 max-h-[40px] min-w-[128px] py-1 flex flex-col gap-0">
                <div className="text-xs font-medium text-red-500"> 30.990.000 đ</div>
                <del className="text-xs font-light text-gray-500">33.990.000 đ</del>
              </td>
              <td className="px-2 min-w-[96px] text-center py-2.5">10</td>
              <td className="px-2 min-w-[200px] py-2.5 text-center">
                256 GB
              </td>
              <td className="px-2 min-w-[112px] text-center py-2.5">
                Xám
              </td>
              <td className="px-2 min-w-[144px] py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Còn hàng
                </span>
              </td>
              <td className="p-2">
                <div className="flex min-w-24 items-center justify-center gap-2">
                  <button className="w-6 h-6 bg-yellow-100 rounded text-yellow-800 center-flex">
                    <FiEdit className="w-5 h-5" />
                  </button>
                  <button onClick={showproductdetail} className="w-6 h-6 bg-red-100 rounded text-thirdary center-flex">
                    <CiCircleMore className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
            
          </tbody>
        </table>
        <div className="flex w-full justify-end">
          <Pagination
            defaultCurrent={1}
            align="end"
            total={500}
            showSizeChanger={false}
          />
        </div>
      </div>
      {productdetail && (
        <>
        <div className="bg-white w-[600px] center-fixed flex-col gap-5 rounded-lg shadow-xl z-50">
          <div className="h-[64px] flex items-center px-4">
            <p className="text-xl font-semibold w-full">Thông tin sản phẩm</p>
          </div>
          <div className="px-4">
            <div className="flex px-3 py-2.5 gap-2.5 border border-gray-200 rounded">
              <p className="text-sm font-medium">Tên sản phẩm:</p>
              <p className="text-sm font-medium">iphone 16 Pro Max | Chính hãng VN/A</p>
            </div>
          </div>
          <div className="flex-col gap-3 px-4 py-1">
            <div className="flex-col gap-2 py-2 px-3">
              <div className="flex">
                <p className="min-w-[64px]">Hình ảnh</p>
                <p className="w-full text-center">Màu</p>
                <p className="w-full text-center">Dung lượng</p>
                <p className="min-w-[64px]">Số lượng</p>
              </div>
              <div className="flex">
                <div className="min-w-[64px]">
                  <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16e-128gb.png" alt=""  className="w-16 h-16"/>
                </div>
                <div className="w-full text-center flex items-center">
                  <p className="w-full text-sm font-medium">Titan tự nhiên</p>
                </div>
                <div className="w-full flex-col py-1.5 gap-1.5">
                  <p className="text-sm text-center font-normal border-b border-gray-200">256 GB</p>
                  <p className="text-sm text-center font-normal border-b border-gray-200">512 GB</p>
                  <p className="text-sm text-center font-normal ">1 TB</p>
                </div>
                <div className="min-w-[64px]">
                  <p className="text-sm text-center font-normal">10</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overlay"></div>
        </>
      )}
    </>
  );
}

export default ProductList;
