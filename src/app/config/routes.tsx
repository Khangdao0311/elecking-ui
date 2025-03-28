import oderCancle from "../pages/admin/order/list/cancle";
import oderDelivered from "../pages/admin/order/list/delivered";
import oderShiping from "../pages/admin/order/list/pending";

const routes = {
  client: {
    home: "/home",
    products: "/products",
    productDetail: "/product-detail/",
    cart: "/cart",
    checkout: "/checkout",
    login: "/login",
    register: "/register",
    forgotPassword: "/forgot-password",
    account: "/account",
    accountOrder: "/account/order",
    accountVoucher: "/account/voucher",
    accountProfile: "/account/profile",
    accountAddress: "/account/address",
    accountPassword: "/account/password",
  },
  admin: {
    login: "/admin",
    dashboard: "/admin/dashboard",
    product: {
      list: "/admin/product/list",
      add: "/admin/product/add",
      edit: "/admin/product/edit/",
    },
    category: {
      list: "/admin/category/list",
      add: "/admin/category/add",
      edit: "/admin/category/edit/",
    },
    configuration: {
      list: "/admin/configuration/list",
      add: "/admin/configuration/add",
      edit: "/admin/configuration/edit/",
    },
    voucher: {
      list: {
        expired: "/admin/voucher/list/expired",
        stillexpired: "/admin/voucher/list/stillexpired"
      },
      add: "/admin/voucher/add",
      edit: "/admin/voucher/edit/",
    },
    brand: {
      list: "/admin/brand/list",
      add: "/admin/brand/add",
      edit: "/admin/brand/edit/",
    },
    user: {
      list: "/admin/user/list",
      add: "/admin/user/add",
      edit: "/admin/user/edit/",
    },
    order: {
      list: {
        delivered: "/admin/order/list/delivered",
        cancle: "/admin/order/list/cancle",
        shiping: "/admin/order/list/shiping",
        pending: "/admin/order/list/pending",
      }
    },
  },
};

export default routes;
