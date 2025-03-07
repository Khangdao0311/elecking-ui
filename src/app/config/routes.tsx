const routes = {
  client: {
    home: "/home",
    products: "/products",
    productDetail: "/product-detail/",
    cart: "/cart",
    checkout: "/checkout/",
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
    voucher: {
      list: "/admin/voucher/list",
      add: "/admin/voucher/add",
      edit: "/admin/voucher/edit/",
    },
    user: {
      list: "/admin/user/list",
      add: "/admin/user/add",
      edit: "/admin/user/edit/",
    },
    order: {
      list: "/admin/order/list",
    },
  },
};

export default routes;
