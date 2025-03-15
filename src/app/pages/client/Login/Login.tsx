"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { FaEye, FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { LuEyeClosed } from "react-icons/lu";
import * as authServices from "@/app/services/authService";
import config from "@/app/config";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    account: Yup.string().required("Vui lòng nhập tài khoản"),
    password: Yup.string().required("Vui lòng nhập mật khẩu"),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<IUser>();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleLogin(values: any) {
    const { account, password } = await values;
    authServices.login(account, password).then((res) => {
      if (res.status === 200) {
        setUser(res.data);
        localStorage.setItem('user_id', JSON.stringify(res.data?.user.id))
        localStorage.setItem('fullname', JSON.stringify(res.data?.user.fullname))
        localStorage.setItem('access_token', JSON.stringify(res.data?.access_token))
        localStorage.setItem('refresh_token', JSON.stringify(res.data?.refresh_token))
        router.push("/home")
      }
    });
  }


  console.log(user);

  return (
    <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
      <section>
        <div className="flex justify-center items-center my-20">
          <Formik
            initialValues={{
              account: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ errors, touched }) => (
              <Form className="bg-white p-8 rounded-lg border-gray-200 border shadow-xl w-[524px] flex items-center gap-5 flex-col">
                <h2
                  className="text-2xl font-bold text-primary text-center w-full"
                  style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
                >
                  Đăng nhập
                </h2>
                <div className="w-full flex flex-col gap-2">
                  <label className="block text-gray-700 font-medium text-base">
                    Tên đăng nhập
                  </label>
                  <Field
                    className="w-full px-4 py-4 text-sm font-normal border rounded-[4px] focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    name="account"
                    type="text"
                    placeholder="Nhập tên tài khoản"
                  />
                </div>

                <div className="relative w-full flex flex-col gap-2">
                  <label className="block text-gray-700  font-medium text-base">
                    Mật khẩu
                  </label>
                  <Field
                    className="w-full px-4 py-4 text-sm font-normal border rounded-[4px] focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập tên tài khoản"
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-4 h-full flex items-center cursor-pointer text-gray-500"
                  >
                    {showPassword ? (
                      <FaEye className="w-6 h-6" />
                    ) : (
                      <LuEyeClosed className="w-6 h-6" />
                    )}
                  </span>
                </div>

                <div className="text-right w-full">
                  <div className="text-blue-500 text-sm font-bold hover:underline">
                    Quên mật khẩu?
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-red-600 text-white text-lg font-bold py-2 rounded-[4px] shadow-lg transition duration-300"
                >
                  Đăng nhập
                </button>

                <div className="gap-5 flex items-center justify-center text-center text-gray-500 relative w-full">
                  <div className="border-t absolute right-0 top-1/2 w-[180px] transform -translate-y-1/2 bg-gray-200"></div>
                  <span className="bg-white text-gray-400 text-sm font-medium">
                    HOẶC
                  </span>
                  <div className="border-t absolute left-0 top-1/2  w-[180px] transform -translate-y-1/2 bg-gray-200"></div>
                </div>

                <div className="flex justify-center gap-4 w-full">
                  <div className="flex w-1/2 items-center gap-2 border border-gray-200 rounded-md py-2 px-4 shadow-md transition duration-300">
                    <FcGoogle className="w-6 h-6" />
                    <div className="text-sm font-medium">Google</div>
                  </div>
                  <div className="flex w-1/2 items-center gap-2 border border-gray-200 rounded-md py-2 px-4 shadow-md transition duration-300">
                    <FaFacebook className="w-6 h-6 text-blue-600" />
                    <div className="text-sm font-medium">Facebook</div>
                  </div>
                </div>

                <div className="flex items-center justify-center w-full gap-1.5">
                  <div>Bạn mới đến ElecKing ?</div>
                  <div className="text-primary font-semibold text-sm hover:underline cursor-pointer">
                    Đăng ký
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </div>
  );
}

export default Login;
