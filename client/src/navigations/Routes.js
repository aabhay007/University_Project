import React from "react";
import Login from "../containers/login/Login";
import Register from "../containers/register/Register";
import University from "../containers/admin/university/University";
import Product from "../containers/admin/product/Product";
import Department from "../containers/admin/department/Department";
import Cart from "../containers/user/cart/Cart";
import UserDepartment from "../containers/user/department/UserDepartment";
import Home from "../containers/user/home/Home";
import UserProduct from "../containers/user/product/UserProduct";
import ProductDetail from "../containers/user/productdetail/ProductDetail";
import About from "../containers/about/About";
import Summary from "../containers/user/summary/Summary";
import CheckoutForm from "../containers/user/summary/CheckoutForm";
import Movies from "../containers/admin/university/Movies";
import PaymentForm from "../containers/user/summary/PaymentForm";
import ChatBot from "../Bots/ChatBot";
import ChatBotReact from "../Bots/ChatBotReact";

const ROUTES = {
  login: { name: "/login", component: <Login /> },
  about: { name: "/about", component: <About /> },
  register: { name: "/register", component: <Register /> },
  universityAdmin: { name: "/university", component: <University /> },
  university: { name: "/university", component: <University /> },
  productAdmin: { name: "/product", component: <Product /> },
  departmentAdmin: { name: "/department", component: <Department /> },
  cart: { name: "/cart", component: <Cart /> },
  department: { name: "/userdepartment", component: <UserDepartment /> },
  product: { name: "/userproduct", component: <UserProduct /> },
  productdetail: { name: "/productdetail", component: <ProductDetail /> },
  home: { name: "/", component: <Home /> },
  summary:{name:"/summary",component:<Summary/>},
  CheckoutForm:{name:"/checkoutform",component:<CheckoutForm/>},
  Movies:{name:"/movies",component:<Movies/>},
  PaymentForm:{name:"/paymentform",component:<PaymentForm/>},
  ChatBot:{name:"/chatbot",component:<ChatBot/>},
  ChatBotReact:{name:"/reactchatbot",component:<ChatBotReact/>}
  // navy:{name:"/navy",component: <Navy /> },
};

export default ROUTES;
