"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input, Modal, notification, Upload } from "antd";
import { RcFile, UploadFile } from "antd/es/upload/interface";
import TitleAdmin from "@/components/admin/TitleAdmin";
import Button from "@/components/admin/Button";
import { useParams } from "next/navigation";
import "quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import config from "@/config";
import { useStore } from "@/store";
import Loading from "@/components/client/Loading";
import { Select } from "antd";
import Quill from "quill";
import { IoCloseSharp } from "react-icons/io5";
import * as categoryServices from "@/services/categoryService";
import * as proptypeServices from "@/services/proptypeService";
import * as authServices from "@/services/authService";
import Cookies from "js-cookie";

function CategoryEdit() {
  const { id }: any = useParams();
  const [proptype, setproptype] = useState<IProptype[]>([]);
  const [editProptype, setEditProptype] = useState<IProptype[]>();
  const [status, setStatus] = useState(1);
  const [categoryName, setCategoryName] = useState("");
  const [icon, setIcon] = useState("");
  const [image, setImage] = useState<UploadFile[]>([]);
  const [initialImage, setInitialImage] = useState("");
  const [editImage, setEditImage] = useState<any>();
  const [editorContent, setEditorContent] = useState("");
  const quillRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [state, dispatch] = useStore();
  const [loading, setLoading] = useState(false);

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
    const query = { limit: 0 };
    proptypeServices.getQuery(query).then((res) => {
      if (res.status === 200) {
        setproptype(res.data);
      }
    });
  }, []);

  useEffect(() => {
    categoryServices.getOne(id).then((res) => {
      if (res.status === 200) {
        setEditProptype(res.data.proptypes);
        setCategoryName(res.data.name);
        setEditorContent(res.data.description);
        setInitialImage(res.data.image);
        setIcon(res.data.icon);
        const oldImageName = res.data.image.split("/").pop();
        setEditImage(oldImageName);
        setStatus(res.data.status ?? 1);
        if (res.data.image) {
          setImage([
            {
              uid: generateUUID(),
              name: oldImageName,
              status: "done",
              url: res.data.image,
            },
          ]);
        }
      }
    });
  }, [id]);
  console.log(image);
  
  useEffect(() => {
    if (!quillRef.current || !editorContent) return;

    if (quillRef.current.querySelector(".ql-editor")) return;

    const quillInstance = new Quill(quillRef.current, {
      theme: "snow",
    });

    quillInstance.root.innerHTML = editorContent;

    quillInstance.on("text-change", () => {
      setEditorContent(quillInstance.root.innerHTML);
    });
  }, [editorContent]);

  function handleChange(value: any) {
    setStatus(value);
  }

  function handleEdit() {
    let finalImage = editImage;

    const isNewImageSelected = image[0]?.originFileObj instanceof File;

    if (isNewImageSelected) {
      finalImage = image[0].name;
    }
    if (
      editProptype &&
      typeof status === "number" &&
      categoryName &&
      editorContent &&
      icon
    ) {
      const formData = new FormData();
      formData.append("name", categoryName);
      if (isNewImageSelected) {
        formData.append("image", image[0].originFileObj as File);
      } else {
        formData.append("image", finalImage);
      }
      formData.append("description", editorContent);
      formData.append(
        "proptypes",
        JSON.stringify(editProptype.map((e) => e.id))
      );
      formData.append("icon", icon);
      formData.append("status", "1");
      setLoading(true);

      (function callback() {
        categoryServices.editCategory(id, formData).then((res) => {
          if (res.status === 200) {
            openNotificationWithIcon(
              "success",
              "Thành công",
              "Sửa danh mục thành công"
            );
            setTimeout(() => {
              router.push(`${config.routes.admin.category.list}`);
            }, 1000);
          } else if (res.status === 401) {
            const resfreshTokenAdmin = authServices.getRefreshTokenAdmin();
            if (resfreshTokenAdmin) {
              authServices.getToken(resfreshTokenAdmin).then((res) => {
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
              "Lỗi dữ liệu",
              res.message
            );
          }
        });
      })();
    } else {
      openNotificationWithIcon(
        "error",
        "Lỗi dữ liệu",
        "Vui lòng nhập đầy đủ thông tin"
      );
    }
  }

  const beforeUpload = (file: File) => {
    const newfile: UploadFile = {
      uid: generateUUID(),
      name: file.name,
      status: "uploading",
      originFileObj: file as RcFile,
    };
    setImage((prev) => {
      const newFile = [newfile];
      return newFile;
    });
    setTimeout(() => {
      setImage((prev) =>
        prev.map((item) =>
          item.uid === newfile.uid ? { ...item, status: "done" } : item
        )
      );
    }, 1000);
    return false;
  };
  const removeimage = (file: UploadFile) => {
    setImage((prev) => prev.filter((item) => item.uid !== file.uid));
  };

  return (
    <>
      {state.load && <Loading />}
      {state.load ? (
        state.load
      ) : (
        <>
          <TitleAdmin title="Quản lý danh mục / Sửa danh mục" />
          <div className="bg-white shadow-xl rounded-lg px-4 py-4 flex items-start flex-col gap-4">
            <div className="w-full flex flex-col gap-6">
              <div className="w-full">
                <div className="w-full p-2.5 text-2xl font-semibold border-b-2 border-primary">
                  Sửa Danh Mục
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-0.5 flex-col">
                  <div className="text-sm font-medium">
                    Tên danh mục <span className="text-primary">*</span>
                  </div>
                  <Input
                    className="w-[268px] h-11 shadow-md"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </div>
                <div className="flex gap-0.5 flex-col">
                  <div className="text-sm font-medium">
                    Trạng Thái <span className="text-primary">*</span>
                  </div>
                  <Select
                    className="shadow-md"
                    value={status}
                    style={{ width: 268, height: 44 }}
                    onChange={handleChange}
                    options={[
                      { value: 1, label: "Đang hoạt động" },
                      { value: 0, label: "Ngừng hoạt động" },
                    ]}
                  />
                </div>
                <div className="flex gap-0.5 flex-col">
                  <div className="text-sm font-medium ">
                    Tên Danh Mục Cấu Hình{" "}
                    <span className="text-primary">*</span>
                  </div>
                  <Select
                    mode="multiple"
                    placeholder="Chọn tên danh mục cấu hình"
                    value={editProptype?.map((item) => item.id)}
                    onChange={(selectedIds) => {
                      const updatedList = proptype.filter((item) =>
                        selectedIds.includes(item.id)
                      );
                      setEditProptype(updatedList);
                    }}
                    className="min-w-[268px] h-[44px] flex items-center justify-center"
                    options={proptype.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                  />
                  <style jsx>{`
                    :global(.ant-select-selection-overflow) {
                      height: 44px !important;
                      padding: 0 5px !important;
                      margin-top: 0 !important;
                    }
                    :global(.ant-select-selection-item) {
                      margin-top: 0 !important;
                    }
                  `}</style>
                </div>
                <div className="flex gap-0.5 flex-col">
                  <div className="text-sm font-medium">
                    Biểu Tượng <span className="text-primary">*</span>
                  </div>
                  <Input
                    className="w-[268px] h-11 shadow-md"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">
                  Ảnh <span className="text-primary">*</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  <Upload
                    multiple={false}
                    maxCount={1}
                    listType="picture"
                    fileList={image}
                    beforeUpload={beforeUpload}
                    onRemove={removeimage}
                    showUploadList={false}
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
                        <span>{image.length}</span> Tệp
                      </div>
                    </div>
                  </Upload>

                  <div className="flex items-center flex-wrap gap-3">
                    {image.map((file) => {
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
                            onClick={() => removeimage(file)}
                          >
                            <IoCloseSharp className="text-red-500" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="w-full">
                    <div className="text-sm font-medium">
                      Mô tả <span className="text-primary">*</span>
                    </div>
                    <div
                      ref={quillRef}
                      className="w-full !h-[150px] border border-gray-300 rounded"
                    ></div>
                  </div>
                </div>
              </div>
              {contextHolder}
              <Button
                onClick={handleEdit}
                back={config.routes.admin.category.list}
                loading={loading}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CategoryEdit;
