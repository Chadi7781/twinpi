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
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import Chat from "pages/Chat/Chat";
import AddGym from "views/examples/AddGym";
import HomeUser from "views/examples/HomeUser";
import GymDetail from "views/examples/GymDetail";

import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <ToastContainer />
    <BrowserRouter>
      <Switch>
        <Route
          path="/
        "
          render={(props) => <AdminLayout {...props} />}
        />

        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <Route path="/chat" exact component={Chat} />
        <Route path="/homeuser" exact component={HomeUser} />
        <Route path="/videoGym/:id" exact component={GymDetail} />

        <Redirect from="/" to="/admin/index" />
      </Switch>
    </BrowserRouter>
  </>
);
