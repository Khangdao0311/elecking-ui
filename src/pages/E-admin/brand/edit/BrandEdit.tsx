"use client";
import { Input, Upload, Select } from "antd";
import { notification } from "antd";
import "quill/dist/quill.snow.css";
import type { RcFile } from "antd/es/upload/interface";
import { UploadFile } from "antd/es/upload/interface";
// import Quill from "quill";

import Button from "@/components/admin/Button";
import TitleAdmin from "@/components/admin/TitleAdmin";
import React, { useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import config from "@/config";
import Cookies from "js-cookie";

import * as authServices from "@/services/authService";
import * as brandServices from "@/services/brandService";
import * as uploadServices from "@/services/uploadService";

function BrandEdit() {
  const quillRef = useRef<HTMLDivElement>(null);
  const [editorContent, setEditorContent] = useState("");
  const [brandedit, setBrandedit] = useState<IBrand[]>([]);
  const [logo, setLogo] = useState<UploadFile[]>([]);
  const [banner, setBanner] = useState<UploadFile[]>([]);
  const [storageimglogo, setStorageimglogo] = useState("");
  const [storageimgbanner, setStorageimgbanner] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>(
    undefined
  );
  const [name, setName] = useState("");
  const { id }: any = useParams();
  const [loading, setLoading] = useState(false)

  const router = useRouter();
  

  type NotificationType = "success" | "info" | "warning" | "error";
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: any,
    description: any
  ) => {
    api[type]({
      message: message,
      description: description,
    });
  };

  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  useEffect(() => {
    brandServices.getById(`${id}`).then((res) => {
      if (res.status === 200) {
        setBrandedit(res.data);
        setName(res.data.name);
        setSelectedStatus(res.data.status);
        setEditorContent(res.data.description);
        setStorageimglogo(res.data.logo);
        setStorageimgbanner(res.data.banner);
        if (res.data.logo) {
          setLogo([
            {
              uid: generateUUID(),
              name: "logo.png",
              status: "done",
              url: res.data.logo,
            },
          ]);
        }
        if (res.data.banner) {
          setBanner([
            {
              uid: generateUUID(),
              name: "banner.png",
              status: "done",
              url: res.data.banner,
            },
          ]);
        }
      }
    });
  }, [id]);




  useEffect(() => {
    if (!quillRef.current || !editorContent) return;
  
    if (quillRef.current.querySelector('.ql-editor')) return;
  
    import("quill").then((QuillModule) => {
      const Quill = QuillModule.default;
  
      const quillInstance = new Quill(quillRef.current as HTMLElement, {
        theme: "snow",
      });
  
      quillInstance.root.innerHTML = editorContent;
  
      quillInstance.on("text-change", () => {
        setEditorContent(quillInstance.root.innerHTML);
      });
    });
  }, [editorContent]);
  
  





  const handleRemove = (file: UploadFile, type: "logo" | "banner") => {
    if (type === "logo") {
      setLogo([]);
      setStorageimglogo("");
    } else {
      setBanner([]);
      setStorageimgbanner("");
    }
  };

  const handleBeforeUpload = (file: File, type: "logo" | "banner") => {
    const newFile: UploadFile = {
      uid: generateUUID(),
      name: file.name,
      status: "uploading",
      originFileObj: file as RcFile,
    };

    const setState = type === "logo" ? setLogo : setBanner;

    setState((prev) => {
      const newFiles = [newFile];
      return newFiles;
    });

    setTimeout(() => {
      setState((prev) =>
        prev.map((item) =>
          item.uid === newFile.uid ? { ...item, status: "done" } : item
        )
      );
    }, 1000);

    return false;
  };

  return (
    <>
      <TitleAdmin title="Quản lý thương hiệu / Sửa thương hiệu" />
      <div className="bg-white shadow-xl rounded-lg px-4 py-4 flex items-start flex-col gap-4">
        <div className="w-full flex flex-col gap-6">
          <div className="w-full p-2.5 text-2xl font-semibold border-b-2 border-primary">
            Sửa Thương Hiệu
          </div>
          <div className="flex items-center  gap-4">
            <div className="flex gap-0.5 flex-col">
              <div className="text-sm font-medium">
                Tên Thương Hiệu <span className="text-primary">*</span>
              </div>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-[268px] h-11 shadow-md"
                placeholder="Nhập Tên Thương Hiệu"
              />
            </div>
            <div>
              <div className="text-sm font-medium">
                Loại Khuyến Mãi <span className="text-primary"> *</span>
              </div>
              <Select
                className="shadow-md"
                placeholder="Chọn loại khuyến mãi"
                style={{ width: 268, height: 44 }}
                onChange={(value) => setSelectedStatus(value)}
                value={selectedStatus}
                options={[
                  { value: 0, label: "Ngưng hoạt động" },
                  { value: 1, label: "Đang hoạt động" },
                ]}
              />
            </div>
          </div>

          <div>
            <div className="text-sm font-medium">
              Ảnh <span className="text-primary">*</span>
            </div>
            <div className="flex flex-col gap-2.5">
              <Upload
                listType="picture"
                multiple={false}
                fileList={logo}
                beforeUpload={(file) => handleBeforeUpload(file, "logo")}
                onRemove={(file) => handleRemove(file, "logo")}
                showUploadList={false}
                maxCount={1}
              >
                <style jsx>{`
                  :global(.ant-upload-select) {
                    width: 100% !important;
                  }
                `}</style>
                <div className="flex items-center w-full gap-2.5 bg-white border border-gray-100 shadow-md p-1.5 cursor-pointer">
                  <div className="w-[110px] h-auto text-sm font-normal bg-gray-300 border border-gray-100 rounded p-2 text-center">
                    Chọn tệp
                  </div>
                  <div className="w-full text-sm font-normal">
                    <span>{logo.length}</span> Tệp
                  </div>
                </div>
              </Upload>

              <div className="flex items-center flex-wrap gap-3">
                {logo.map((file) => {
                  const imageSrc = file.originFileObj
                    ? URL.createObjectURL(file.originFileObj)
                    : file.url;

                  return (
                    <div key={file.uid} className="w-20 h-20 relative">
                      {file.status === "uploading" ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
                        </div>
                      ) : (
                        <img
                          src={imageSrc}
                          alt={file.name}
                          className="w-full h-full object-cover rounded"
                        />
                      )}
                      <div
                        className="w-5 h-5 bg-white absolute top-0 right-0 flex items-center justify-center mt-1 mr-1 cursor-pointer"
                        onClick={() => handleRemove(file, "logo")}
                      >
                        <IoCloseSharp className="text-red-500" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium">
              Ảnh Bìa <span className="text-primary">*</span>
            </div>
            <div className="flex flex-col gap-2.5">
              <Upload
                maxCount={1}
                multiple={false}
                listType="picture"
                fileList={banner}
                beforeUpload={(file) => handleBeforeUpload(file, "banner")}
                onRemove={(file) => handleRemove(file, "banner")}
                showUploadList={false}
              >
                <div className="flex items-center w-full gap-2.5 bg-white border border-gray-100 shadow-md p-1.5 cursor-pointer">
                  <div className="w-[110px] h-auto text-sm font-normal bg-gray-300 border border-gray-100 rounded p-2 text-center">
                    Chọn tệp
                  </div>
                  <div className="w-full text-sm font-normal">
                    <span>{banner.length}</span> Tệp
                  </div>
                </div>
              </Upload>
              <div className="flex items-center flex-wrap gap-3">
                {banner.map((file) => {
                  const imageSrc = file.originFileObj
                    ? URL.createObjectURL(file.originFileObj)
                    : file.url;

                  return (
                    <div key={file.uid} className="w-20 h-20 relative">
                      {file.status === "uploading" ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
                        </div>
                      ) : (
                        <img
                          src={imageSrc}
                          alt={file.name}
                          className="w-full h-full object-cover rounded"
                        />
                      )}
                      <div
                        className="w-5 h-5 bg-white absolute top-0 right-0 flex items-center justify-center mt-1 mr-1 cursor-pointer"
                        onClick={() => handleRemove(file, "banner")}
                      >
                        <IoCloseSharp className="text-red-500" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="text-sm font-medium">
              Mô tả thương hiệu <span className="text-primary">*</span>
              <div
                ref={quillRef}
                className="w-full min-h-[100px] border border-gray-300 rounded"
              ></div>
            </div>
          </div>
        </div>
        {contextHolder}
        <Button
          loading={loading}
          back={config.routes.admin.brand.list}
          onClick={async () => {
            let imgLogoName = storageimglogo
              ? storageimglogo.split("/").pop()
              : "";
            let imgBannerName = storageimgbanner
              ? storageimgbanner.split("/").pop()
              : "";
            if (
              logo.length > 0 &&
              logo[0].originFileObj &&
              logo[0].originFileObj.name !== storageimglogo
            ) {
              const imgLogo = logo[0].originFileObj as File;
              imgLogoName = imgLogo.name;
            }
            if (
              banner.length > 0 &&
              banner[0].originFileObj &&
              banner[0].originFileObj.name !== storageimgbanner
            ) {
              const imgBanner = banner[0].originFileObj as File;
              imgBannerName = imgBanner.name;
            }
            if (
              !name.trim() ||
              !imgLogoName?.length ||
              !imgBannerName?.length ||
              !editorContent
            ) {
              openNotificationWithIcon(
                "error",
                "Lỗi dữ liệu",
                "Vui lòng nhập đầy đủ thông tin"
              );
              return;
            }
            const formData = new FormData();
            formData.append("name", name.trim());
            formData.append("logo", imgLogoName);
            formData.append("banner", imgBannerName);
            formData.append("status", selectedStatus!.toString());
            formData.append("description", editorContent.toString());
            formData.append("images", logo[0].originFileObj as File);
            formData.append("images", banner[0].originFileObj as File);
            
             
            setLoading(true);
            (async function callback() {
              const brandResponse = await brandServices.editBrand(id, formData);
              if (brandResponse?.status == 200) {
                openNotificationWithIcon(
                  "success",
                  "Thành công",
                  "Sửa thương hiệu thành công"
                );
                setTimeout(() => {
                  router.push(config.routes.admin.brand.list);
                }, 1000);
              } else if (brandResponse.status === 401) {
                const refreshTokenAdmin = authServices.getRefreshTokenAdmin();
                if (refreshTokenAdmin) {
                  authServices.getToken(refreshTokenAdmin).then((res) => {
                    if (res.status === 200) {
                      Cookies.set("access_token_admin", res.data);
                      callback();
                    } else {
                      authServices.clearAdmin();
                      router.push(config.routes.admin.login);
                    }
                  });
                }
              } else {
                setLoading(false);
                openNotificationWithIcon(
                  "error",
                  "Lỗi",
                  "Có lỗi xảy ra, vui lòng thử lại"
                );
              }
            })();
          }}
        />
      </div>
    </>
  );
}

export default BrandEdit;
