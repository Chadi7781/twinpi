/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import App from "views/examples/App";
import ListGyms from "views/examples/ListGyms.js";
import AddGym from "views/examples/AddGym.js";
import UpdateGym from "views/examples/UpdateGym.js";
import Chat from "pages/Chat/Chat";
import resetpassword from "views/examples/resetpassword";
import newpassword from "views/examples/newpassword";
import add from "views/examples/add";
import Editprod from "views/examples/Editprod";
import ProductList from "views/examples/producList";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },

 
  {
    path: "/gym",
    name: "Gym",
    icon: "ni ni-istanbul text-red",
    component: ListGyms,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Eshop",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "List",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
  },

  {
    path: "/productList",
    name: "ProductList",
    icon: "ni ni-bullet-list-67 text-red",
    component: ProductList,
    layout: "/admin"
  },

  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: App,
    layout: "/auth",
  },
  {
    path: "/AddGym",
    component: AddGym,
    layout: "/admin",
  },
  {
    path: "/UpdateGym/:id",
    component: UpdateGym,
    layout: "/admin",
  },


  {
    path: "/resetpassword",
    name: "resetpassword",
    icon: "ni ni-key-25 text-info",
    component: resetpassword,
    layout: "/auth"
  },

  {
    path: "/newpassword",
    name: "newpassword",
    icon: "ni ni-key-25 text-info",
    component: newpassword,
    layout: "/auth"
  },
  {
    path: "/addproduct",
    component: add,
    layout: "/admin"
  },
  {
    path: "/editproduct/:id",
    
    component: Editprod,
    layout: "/admin"
  },
 
  
];
export default routes;
