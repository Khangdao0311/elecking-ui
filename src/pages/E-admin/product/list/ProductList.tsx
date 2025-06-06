"use client";
import TitleAdmin from "@/components/admin/TitleAdmin";
import Boxsearchlimit from "@/components/admin/boxsearchlimtit";
import React, { useEffect, useState } from "react";
import * as productServices from "@/services/productService";
import Link from "next/link";
import config from "@/config";
import { useStore } from "@/store";
import Loading from "@/components/client/Loading";
import { FiEdit } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { Pagination, Rate } from "antd";
import { CiCircleMore } from "react-icons/ci";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { Modal } from "antd";

function ProductList() {
  const [statusProductDetail, setStatusProductDetail] = useState(false);
  const showproductdetail = () => setStatusProductDetail(true);
  const closeproductdetail = () => setStatusProductDetail(false);
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [productDetail, setProductDetail] = useState<IProduct>();
  const [state, dispatch] = useStore();

  useEffect(() => {
    const query: any = {};
    query.limit = limit;
    query.page = page;
    if (search != "") {
      query.search = search;
    }
    productServices.getQuery(query).then((res) => {
      if (res.status === 200) {
        setProducts(res.data);
        setTotalPages(res.total);
      }
    });
  }, [limit, page, search]);

  const columns: TableProps<IProduct>["columns"] = [
    {
      title: "STT",
      align: "center",
      dataIndex: "index",
      width: 80,
      key: "index",
      render: (_, __, index) => (page - 1) * limit + index + 1,
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "name",
      width: 150,
      key: "name",
      render: (e) => <div className="line-clamp-2">{e}</div>,
    },
    {
      title: "Tên Danh Mục",
      dataIndex: "category",
      key: "category",
      width: 150,
      render: (e) => e.name,
    },
    {
      title: "Tên Thương Hiệu",
      dataIndex: "brand",
      key: "brand",
      width: 150,
      render: (e) => e.name,
    },
    {
      title: "Lượt Xem",
      dataIndex: "view",
      key: "view",
      width: 120,
      render: (view) => view.toLocaleString("vi-VN"),
    },
    {
      title: "Mô Tả",
      dataIndex: "description",
      width: 200,
      key: "description",
      render: (e) => (
        <div
          className="line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: ` ${e}`,
          }}
        ></div>
      ),
    },
    {
      title: "Đánh giá",
      align: "center",
      width: 130,
      dataIndex: "rating",
      key: "rating",
      render: (rating) =>
        rating ? (
          <div className="center-flex justify-start items-start ">
            <Rate
              className="text-secondaryDark text-sm"
              defaultValue={Math.ceil(rating * 2) / 2}
              allowHalf
              disabled
              characterRender={(char) => (
                <span style={{ marginInlineEnd: "2px" }}>{char}</span>
              )}
            />
          </div>
        ) : (
          "Chưa có đánh giá"
        ),
    },
    {
      title: "Số Lượng",
      align: "center",
      dataIndex: "variants",
      width: 130,
      key: "quantity",
      render: (variants) =>
        variants
          .reduce(
            (total: number, variant: IProductVariant) =>
              (total += variant.colors.reduce(
                (sumQuatity: number, color: IProductColor) =>
                  (sumQuatity += color.quantity),
                0
              )),
            0
          )
          .toLocaleString("vi-VN"),
    },

    {
      title: "Chức năng",
      align: "center",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Link
            href={`${config.routes.admin.product.edit}${record.id}`}
            className="w-6 h-6 bg-yellow-100 rounded text-yellow-800 center-flex"
          >
            <FiEdit className="w-5 h-5" />
          </Link>
          <button
            onClick={() => {
              showproductdetail();
              productServices
                .getProById(record.id)
                .then((res) => setProductDetail(res.data));
            }}
            className="w-6 h-6 bg-red-100 rounded text-thirdary center-flex"
          >
            <CiCircleMore className="w-5 h-5" />
          </button>
        </Space>
      ),
    },
  ];

  const getTableScroll = (dataLength: any) => {
    if (dataLength <= 30) return undefined;
    return { x: 50, y: "max-content" };
  };

  return (
    <>
      {state.load && <Loading />}
      {state.load ? (
        ""
      ) : (
        <>
          <TitleAdmin title="Danh Sách Sản Phẩm" />
          <Boxsearchlimit
            title="Sản Phẩm"
            onLimitChange={(newLimit: any) => {
              setLimit(newLimit);
              setPage(1);
            }}
            onSearch={(value: string) => {
              setSearch(value);
              setPage(1);
            }}
          />
          <div className=" shadow-xl bg-white rounded-lg px-4 py-4 flex min-h-0 items-start flex-col gap-4">
            <Link
              href={config.routes.admin.product.add}
              className="flex items-center gap-2.5 p-2.5 bg-green-100 rounded"
            >
              <GoPlus className="w-6 h-6" />
              <p className="text-sm font-bold">Tạo sản phẩm mới</p>
            </Link>
            <div style={{ width: "100%", overflowX: "auto", maxWidth: "100%" }}>
              <Table<IProduct>
                columns={columns}
                dataSource={products}
                rowKey="id"
                scroll={getTableScroll(products.length)}
                pagination={false}
                tableLayout="auto"
              />
            </div>
            {totalPages > limit && (
              <div className="flex w-full justify-end">
                <Pagination
                  current={page}
                  onChange={(e) => setPage(e)}
                  defaultCurrent={1}
                  align="end"
                  pageSize={limit}
                  total={totalPages}
                  showSizeChanger={false}
                />
              </div>
            )}
          </div>
        </>
      )}

      <Modal
        open={statusProductDetail}
        onCancel={() => setStatusProductDetail(false)}
        footer={null}
        centered
        closeIcon={<div className="hidden" />}
      >
        {statusProductDetail && (
          <>
            <div className="ant-modal-header hidden"></div>
            <div className="ant-modal-close hidden"></div>
            <div className="ant-modal-header hidden"></div>
            <div className=" bg-white  h-[600px] center-fixed flex flex-col gap-2.5 rounded-lg shadow-xl z-50">
              <div className="min-h-[64px] flex items-center px-4 border-b border-gray-200">
                <p className="text-xl font-semibold w-full">
                  Thông tin sản phẩm
                </p>
              </div>

              <div className="px-4 py-2">
                <div className="flex px-3 py-2.5 gap-2.5 border border-gray-200 rounded bg-gray-50">
                  <p className="text-sm font-medium">Tên sản phẩm:</p>
                  <p className="text-sm font-medium text-gray-700">
                    {productDetail?.name}
                  </p>
                </div>
              </div>

              <div className="flex-col gap-3 px-4 py-1 overflow-y-auto h-full">
                <table className="w-full bg-white shadow-xl rounded-lg overflow-hidden text-sm font-normal border-collapse">
                  <thead className="bg-stone-100 sticky top-0 z-10">
                    <tr>
                      <th className="px-3 py-3 w-12 text-center font-semibold text-gray-700">
                        STT
                      </th>
                      <th className="min-w-24 px-3 py-3 text-center font-semibold text-gray-700">
                        Hình ảnh
                      </th>
                      <th className="min-w-[180px] px-3 py-3 text-center font-semibold text-gray-700">
                        Biến thể
                      </th>
                      <th className="min-w-[140px] px-3 py-3 text-center font-semibold text-gray-700">
                        Màu sắc
                      </th>
                      <th className="min-w-[150px] px-3 py-3 text-center font-semibold text-gray-700">
                        Giá bán
                      </th>
                      <th className="w-[144px] min-w-[144px] px-3 py-3 text-center font-semibold text-gray-700">
                        Trạng Thái
                      </th>
                      <th className="w-[96px] min-w-[96px] px-3 py-3 text-center font-semibold text-gray-700">
                        Số lượng
                      </th>
                    </tr>
                  </thead>

                  <tbody className="max-h-[450px]">
                    {productDetail?.variants?.map((product, variantIndex) =>
                      product.colors.map((color, colorIndex) => (
                        <tr
                          key={`${variantIndex}-${colorIndex}`}
                          className="even:bg-gray-50 hover:bg-gray-100 transition-all duration-200 h-[80px]"
                        >
                          <td className="px-3 py-3 text-center text-gray-700">
                            {variantIndex * product.colors.length +
                              colorIndex +
                              1}
                          </td>
                          <td className="px-3 py-3">
                            <img
                              className="w-16 h-16 object-cover text-center rounded-md border"
                              src={color.image}
                              alt="product"
                            />
                          </td>
                          <td className="px-3 py-3 text-center text-gray-700">
                            {product.properties.length > 0
                              ? product.properties
                                  .map((prop) => prop.name)
                                  .join(" - ")
                              : "Không có"}
                          </td>
                          <td className="px-3 py-3 text-center text-gray-700">
                            {color.name}
                          </td>
                          <td
                            className="test-xs font-medium text-red-500 flex-col items-center justify-center
                          "
                          >
                            <div className="center-flex flex-col">
                              <div className="w-full text-center">
                                {(
                                  product.price -
                                  product.price_sale +
                                  color.price_extra
                                ).toLocaleString("vi-VN")}{" "}
                                đ
                              </div>
                              {product.price -
                                product.price_sale +
                                color.price_extra !==
                                product.price && (
                                <del className="w-full text-center text-gray-500 font-normal text-xs flex-col">
                                  {product.price.toLocaleString("vi-VN")} đ
                                </del>
                              )}
                            </div>
                          </td>
                          <td className="px-3 py-3 text-center">
                            <span
                              className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
                                color.status === 1
                                  ? "text-green-800 bg-green-100"
                                  : "text-red-800 bg-red-100"
                              }`}
                            >
                              {color.status === 1 ? "Hoạt động" : "Ngừng bán"}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-center text-gray-700">
                            {color.quantity}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className=" py-3 bottom-0 flex gap-4 justify-end items-center px-4 border-t border-gray-200 bg-gray-50">
                <p
                  className="px-6 bg-red-100 text-red-800 h-10 flex items-center justify-center rounded text-sm font-bold cursor-pointer hover:bg-red-200 transition-all duration-200"
                  onClick={closeproductdetail}
                >
                  Trở lại
                </p>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}

export default ProductList;
