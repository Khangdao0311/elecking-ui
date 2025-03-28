"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input, Modal, notification, Upload } from "antd";
import { RcFile, UploadFile } from "antd/es/upload/interface";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import Button from "@/app/components/admin/Button";
import { Select } from "antd";
import { IoCloseSharp } from "react-icons/io5";
import * as categoryService from "@/app/services/categoryService";
import { useParams } from "next/navigation";
import * as proptypeService from "@/app/services/proptypeService";
import * as uploadService from "@/app/services/uploadService";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { HiCheckCircle } from "react-icons/hi";
import { useRouter } from "next/navigation";
import config from "@/app/config";

function CategoryEdit() {
  const { id }: any = useParams();
  const [proptype, setproptype] = useState<IProptype[]>([]);
  const [editProptype, setEditProptype] = useState<IProptype[]>();
  const [status, setStatus] = useState(1);
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState<UploadFile[]>([]);
  const [initialImage, setInitialImage] = useState("");
  const [editImage, setEditImage] = useState<any>();
  const [editorContent, setEditorContent] = useState("");
  const quillRef = useRef<HTMLDivElement>(null);
  const [editSuccess, setEditSuccess] = useState(false);
  const router = useRouter();



  type NotificationType = 'success' | 'info' | 'warning' | 'error';
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType, message: any, description: any) => {
    api[type]({
      message: message,
      description: description,
    });
  }


  useEffect(() => {
    const query = { limit: 0 };
    proptypeService.getQuery(query).then((res) => setproptype(res.data));
  }, []);

  useEffect(() => {
    categoryService.getOne(id).then((res) => {
      setEditProptype(res.data.proptypes);
      setCategoryName(res.data.name);
      setEditorContent(res.data.description);
      setInitialImage(res.data.image);
      const oldImageName = res.data.image.split("/").pop();
      setEditImage(oldImageName);
      setStatus(res.data.status ?? 1);
      if (res.data.image) {
        setImage([
          {
            uid: crypto.randomUUID(),
            name: oldImageName,
            status: "done",
            url: res.data.image,
          },
        ]);
      }
    });
  }, [id]);

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

  const handleChangeProptype = (value: any) => {
    setEditProptype(value);
  };

  function handleChange(value: any) {
    setStatus(value);
  }

  function handleEdit() {
    let finalImage = editImage;
    if (image[0]?.originFileObj) {
      const formData = new FormData();
      formData.append("image", image[0].originFileObj as File);
      uploadService.uploadSingle(formData);
      finalImage = image[0].name;
    }

    if (editProptype && typeof status === "number" && categoryName && editorContent) {
      categoryService
        .editCategory(id, {
          name: categoryName,
          image: finalImage,
          status: status,
          proptypes: JSON.stringify(editProptype.map(e => e.id)),
          description: editorContent,
        })
        .then((res) => {
          if (res.status === 200) {
            openNotificationWithIcon('success', "Thành công", "Sửa thành công");
            setTimeout(() => {
              router.push(`${config.routes.admin.category.list}`)
            }, 1000)
          } else {
            openNotificationWithIcon('error', "Thất bại", "Sửa thất bại");
          }
        });
      
    }
  }
 
  const beforeUpload = (file: File) => {
    const newfile: UploadFile = {
      uid: crypto.randomUUID(),
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
                Biến thể <span className="text-primary">*</span>
              </div>
              <Select
                mode="multiple"
                placeholder="Chọn biến thể"
                value={editProptype?.map((item) => item.id)}
                onChange={(selectedIds) => {
                  const updatedList = proptype.filter((item) => selectedIds.includes(item.id));
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

              {/* Hiển thị danh sách ảnh đã chọn */}
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
          <Button onClick={handleEdit} back="category/list" />
        </div>
      </div>

      {/* <Modal
        open={editSuccess}
        closeIcon={<div className="hidden" />}
        onCancel={() => setEditSuccess(false)}
        footer={null}
        title={null}
        centered
        maskClosable={false}
      >
        {editSuccess && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 w-[519px] h-[250px] p-10 bg-white rounded-2xl z-50 items-center justify-center shadow-lg">
              <div>
                <HiCheckCircle className="w-24 h-24 fill-green-500 text-white" />
              </div>
              <div className="text-2xl font-bold">Sửa danh mục thành công!</div>
              <button
                onClick={() => `${router.push(config.routes.admin.category.list)}`}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Tiếp tục
              </button>
            </div>
          </>
        )}
      </Modal> */}
    </>
  );
}

export default CategoryEdit;
