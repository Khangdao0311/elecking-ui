"use client";

import { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import { TbEyeClosed } from "react-icons/tb";
import Cookies from "js-cookie";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";
import { Modal } from "antd";
import { useRouter } from "next/navigation";

import { useStore } from "@/app/store";
import LogoMobile from "@/app/assets/LogoMobile";
import Loading from "@/app/components/client/Loading";
import * as authServices from "@/app/services/authService";
import config from "@/app/config";
import Link from "next/link";

function AdminLogin() {
  const [state, dispatch] = useStore();
  const [loginStatus, setLoginStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const router = useRouter();

  const validationSchema = Yup.object().shape({
    account: Yup.string().required("Vui lòng nhập tên tài khoản"),
    password: Yup.string().required("Vui lòng nhập mật khẩu"),
  });

  useEffect(() => {
    localStorage.removeItem("admin");
    Cookies.remove("access_token_admin");
    Cookies.remove("refresh_token_admin");
  }, []);

  function handleLogin(values: any) {
    setLoading(true);
    authServices.loginAmin(values.account, values.password).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        localStorage.setItem("admin", JSON.stringify(res.data.user));
        Cookies.set("access_token_admin", res.data.access_token, { expires: 1 });
        Cookies.set("refresh_token_admin", res.data.refresh_token, { expires: 1 });
        setLoginStatus(true);
        setShowModal(true);
        setTimeout(() => {
          router.push(config.routes.admin.dashboard);
        }, 1000);
      } else {
        setLoginStatus(false);
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 1000);
      }
    });
  }

  return (
    <>
      {loading && <Loading />}
      <Modal
        open={showModal}
        footer={null}
        title={null}
        centered
        maskClosable={false}
        closable={false}
        width="auto"
      >
        {loginStatus ? (
          <div className="center-flex flex-col gap-4">
            <div>
              <FaCircleCheck className="w-20 h-20 text-green-500 " />
            </div>
            <div className="text-lg font-medium text-green-700">Đăng nhập thành công !</div>
          </div>
        ) : (
          <div className="center-flex flex-col gap-4">
            <div>
              <FaCircleExclamation className="w-20 h-20 text-red-500 " />
            </div>
            <div className="text-lg font-medium text-red-700">Đăng nhập thất bại !</div>
          </div>
        )}
      </Modal>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 center-flex gap-5 p-24 border border-gray-300 shadow-2xl rounded-2xl bg-white">
        <LogoMobile className="w-[400px] h-[400px]" />
        <Formik
          initialValues={{
            account: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className="flex flex-col gap-5 w-[400px] bg">
              <h1 className="text-3xl font-bold text-primary text-center">ĐĂNG NHẬP HỆ THỐNG</h1>
              <div className="flex flex-col gap-2">
                <p className="text-base font-medium">Tài khoản quản trị</p>
                <Field
                  type="text"
                  value={values.account}
                  name="account"
                  autoComplete="account"
                  placeholder="Nhập tài khoản quản trị"
                  className="p-4 text-sm border border-gray-200 rounded outline-primary shadow-xl"
                />
                {errors.account && touched.account ? (
                  <div className="text-red-500 text-sm">{errors.account}</div>
                ) : null}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-base font-medium">Mật khẩu</p>
                <div className="w-full relative">
                  <Field
                    type={show ? "text" : "password"}
                    value={values.password}
                    name="password"
                    autoComplete="password"
                    placeholder="Nhập mật khẩu"
                    className="w-full p-4 text-sm border border-gray-200 rounded outline-primary shadow-xl"
                  />
                  <div>
                    {show && (
                      <IoEye
                        onClick={() => setShow(false)}
                        className="w-6 h-6 absolute top-1/2 -translate-y-1/2 right-3.5 text-gray-600 cursor-pointer select-none"
                      />
                    )}
                    {!show && (
                      <TbEyeClosed
                        onClick={() => setShow(true)}
                        className="w-6 h-6 absolute top-1/2 -translate-y-1/2 right-3.5 text-gray-600 cursor-pointer select-none"
                      />
                    )}
                  </div>
                </div>
                {errors.password && touched.password ? (
                  <div className="text-red-500 text-sm">{errors.password}</div>
                ) : null}
              </div>
              <div className="flex justify-end">
                <Link
                href={config.routes.client.forgotPassword}
                 className="text-sm font-bold text-blue-500 select-none">Quên mật khẩu ?</Link>
              </div>
              <button className="bg-primary h-12 rounded shadow-lg text-white text-lg font-bold">
                Đăng nhập
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default AdminLogin;
