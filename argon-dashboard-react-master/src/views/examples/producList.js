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
    Row,
    Button,
    CardBody,
    CardTitle,
    CardSubtitle,
    Col,
    CardImg,
    UncontrolledTooltip
  } from "reactstrap";
  // core components
  import Header from "components/Headers/Header.js";
  import React, { useState, useEffect } from "react";
  import { useHistory } from "react-router-dom";
  
  import axios from "axios";
  
  
  const ProductList = () => {
      const [products, setProducts] = useState([]);
      const [accessToken, setAccessToken] = useState("");
      const history = useHistory();
  
  
      useEffect(() => {
        // Set access token and role in cookie
        document.cookie = "accessToken=" + sessionStorage.getItem("accessToken") + ";path=/";
        document.cookie = "role=" + sessionStorage.getItem("role") + ";path=/";
        // Retrieve access token and role from cookie
        const cookies = document.cookie.split(';');
        let accessToken, role;
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.startsWith("accessToken=")) {
            accessToken = cookie.substring("accessToken=".length, cookie.length);
          } else if (cookie.startsWith("role=")) {
            role = cookie.substring("role=".length, cookie.length);
          }
        }
      
        if (!accessToken || role !== "admin") {
         // history.push("/auth/login"); // rediriger vers la page de login
        } else {
          const fetchProduct= async () => {
            const response = await fetch(`http://localhost:5000/products/list`, {
              headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`
              }
            });
            const data = await response.json();
            if (role !== "admin") {
              setProducts(data.filter((user) => user._id === sessionStorage.getItem("_id")));
            } else {
              setProducts(data);
            }
          };
          fetchProduct();
        }
      }, []);
      
  
    
  
    
    
  
    // methode bloc user en tant que admin
   /* const handleBanUser = async (_id) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken} `,
          },
        };
        await axios.put(
          `http://localhost:5000/api/users/${_id}/ban`,
          null,
          config
        );
        const updatedUsers = users.map((user) =>
          user._id === _id ? { ...user, isBanned: true } : user
        );
        setUsers(updatedUsers);
      } catch (error) {
        console.log(error);
      }
    };*/
   
      //delete user admin
  
    /*const deleteUser = async (id) => {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the headers
        },
      };
    
      try {
        const response = await axios.put(
          `http://localhost:5000/api/users/${id}/delete`,
          config
        );
        console.log(response.data.message); // Log the response message
      } catch (error) {
        console.log(error.response.data.error); // Log the error message
      }
    };*/
   
    
        return (
            <>
            <Header />
            <Container className="mt-4">
              <Row>
                {products.map((prod) => (
                  <Col xs="12" sm="6" md="4" lg="3" key={prod._id}>
                    <Card>
                      <CardImg top width="100%" src={prod.image} alt={prod.name} />
                      <CardBody>
                        <CardTitle tag="h5">{prod.name}</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                          {prod.price} €
                        </CardSubtitle>
                        <Button color="primary" block>Add to cart</Button>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
            </>
          );
        };
  
  export default ProductList;