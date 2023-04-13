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
// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,Input,
    UncontrolledTooltip,
    Toast

  } from "reactstrap";

  // core components
  import Swal from "sweetalert2";

  import Header from "components/Headers/Header.js";
  import React, { useState, useEffect } from "react";
  import { useHistory } from "react-router-dom";

//   const initialstate={
//     name:'',
//     price:'',
//     image:'',
//     description:'',
//     rating:'',

//   }
  
function Add() {
  

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState(0);

  const [price, setPrice] = useState(10);
  const [successMessage, setSuccessMessage] = useState("");

  const history = useHistory();

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      history.push("/auth/login");
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const product = {
      name,
      description,
      price,
      image,
      rating,
    };
  
    const accessToken = sessionStorage.getItem("accessToken");
    const role = sessionStorage.getItem("role");
    
  
    fetch("http://localhost:5000/products/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(product),
    })
    
      .then((response) => response.json())
      .then((data) => {
        setSuccessMessage("Product created successfully!");
        setName("");
        setDescription("");
        setPrice(0);
        setRating(0);
        setImage("");
        history.push("/admin/icons");
  
        Swal.fire({
          icon: "success",
          title: "Product added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Product could not be added!",
        });
      });
  };
  
  
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Add  product</h3>
                </CardHeader>

              
              </Card>
            </div>
          </Row>
          <h1>add croduct</h1>

          <form onSubmit={handleSubmit}>
             <div className="form-row">
              <div className="form-group col-md-6">
            <label htmlFor="name">name</label>
              <Input type="text"  value={name}
                onChange={(event) => setName(event.target.value)}  />
    </div>
    
    <div className="form-group col-md-6">
      <label htmlFor="description">description</label>
      <input type="text"
       className="form-control"
       id="InputPassword4" 
      value={description}
        onChange={(event) => setDescription(event.target.value)}/>
        
    </div>
  </div>
  <div className="form-group">
    <label for="InputAddress">rating</label>
    <Input type="number" className="form-control" value={rating} onChange={(event) => setRating(event.target.value)}   placeholder="rating"/>
  </div>
  <div className="form-group">
    <label htmlFor="price">price </label>
    <Input type="number" className="form-control" value={price}
onChange={(event) => setPrice(event.target.value)}  id="InputAddress2" placeholder="price"/>
  </div>
  <div className="form-group">
    <label for="exampleFormControlFile1">Image</label>
    <Input type="file" className="form-control-file"  value={image} onChange={(event) => setImage(event.target.value)}  id="exampleFormControlFile1"/>
  </div>
  
  <button type="submit" className="btn btn-primary" >add product</button>
  
</form>
        </Container>
      </>
    );
  };
  
  export default Add;