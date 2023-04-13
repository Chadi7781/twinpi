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
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { useHistory } from "react-router-dom";

const Profile = () => {
  const [currentUser,setCurrentUser]=useState("");
  const [name, setName] = useState("");
  
  const getCuurentuser = async ()=>{
    let mytoken = await sessionStorage.getItem("accessToken");
    let jwtcookies = await sessionStorage.getItem("accessToken");
    var config = {
      method: 'get',
      url: 'http://localhost:5000/api/users/currentuser',
      headers: { 
      
        Authorization: `Bearer ${mytoken}`,
        Cookie: `jwt=${jwtcookies}`,
      }
    }; 
    try{
      let ressul = axios(config)
      ressul.then(response=>setCurrentUser(response.data))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getCuurentuser()
  },[])
  console.log("my data usr",currentUser)

  // 




  const history = useHistory();
  const updateUser = async (userId, updatedUserData) => {
    try {
      const mytoken = await sessionStorage.getItem("accessToken");
      const jwtcookies = await sessionStorage.getItem("accessToken");
      const requestOptions = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${mytoken}`,
          Cookie: `jwt=${jwtcookies}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      };
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}/update`,
        requestOptions
      );
      const data = await response.json();
      console.log(data); // log the response data to the console
    } catch (error) {
      console.log(error); // log any errors to the console
    }
  };
  
  const handleUpdateUser = (event) => {
    event.preventDefault();
    const updatedUserData = {
      name,
     
    };
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update user!'
    }).then((result) => {
      if (result.isConfirmed) {
        updateUser(currentUser._id, updatedUserData)
          .then((data) => {
            Swal.fire(
              'Updated!',
              'The user has been updated.',
              'success'
            ).then(() => {
              // perform any necessary actions after the user has been updated
            });
          })
          .catch((error) => {
            Swal.fire(
              'Error!',
              'An error occurred while updating the user.',
              'error'
            );
          });
      }
    });
  };
  

  const deleteUser = async (userId) => {
    try {
      const mytoken = await sessionStorage.getItem("accessToken");
      const jwtcookies = await sessionStorage.getItem("accessToken");
      const requestOptions = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${mytoken}`,
          Cookie: `jwt=${jwtcookies}`,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
         `http://localhost:5000/api/users/${userId}/delete`,
        requestOptions
      );
      const data = await response.json();
      if (data.message === "User not found") {
        console.log("User not found.");
      } else {
        console.log(data); // log the response data to the console
      }
    } catch (error) {
      console.log(error); // log any errors to the console
    }
  };
  
  const handleDeleteUser = (event) => {
    event.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete user!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(currentUser._id)
          .then((data) => {
            Swal.fire(
              'Deleted!',
              'The user has been deleted.',
              'success'
            ).then(() => {
              history.push('/login');
            });
          })
          .catch((error) => {
            Swal.fire(
              'Error!',
              'An error occurred while deleting the user.',
              'error'
            );
          });
      }
    });
  };
  const deactivateUser = async (userId) => {
    try {
      let mytoken = await sessionStorage.getItem("accessToken");
      let jwtcookies = await sessionStorage.getItem("accessToken");
      const requestOptions = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${mytoken}`,
          Cookie: `jwt=${jwtcookies}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ desactivate: true }),
      };
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}/des`,
        requestOptions
      );
      const data = await response.json();
      if (data.message === "User already deactivated") {
        console.log("This user has already been deactivated.");
      } else {
        console.log(data); // log the response data to the console
        
      }
    } catch (error) {
      console.log(error); // log any errors to the console
    }
  };
  
  const handleDeactivateUser = (event) => {
    event.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, deactivate user!'
    }).then((result) => {
      if (result.isConfirmed) {
        deactivateUser(currentUser._id)
          .then((data) => {
            Swal.fire(
              'Deactivated!',
              'The user has been deactivated.',
              'success'
            ).then(() => {
              history.push('/login');
            });
          })
          .catch((error) => {
            Swal.fire(
              'Error!',
              'An error occurred while deactivating the user.',
              'error'
            );
          });
      }
    });
  };

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../../assets/img/theme/team-4-800x800.jpg")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Message
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                  {currentUser.name}
                    <span className="font-weight-light"></span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {currentUser.email}
                  </div>
                 
                 
                  <hr className="my-4" />
                 
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Settings
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={currentUser.name}
                            id="input-username"
                            placeholder=" Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">  
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input 
                            className="form-control-alternative"
                            id="input-email"
                            defaultValue={currentUser.email}
                            placeholder=" Email"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-birthDate"
                          >
                            birthDate
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={currentUser.birthDate}
                            id="input-birthDate"
                            placeholder="birthDate"
                            type="text"  
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            role
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={currentUser.role}
                            id="input-role"
                            placeholder="role"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Specialite
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={currentUser.specialite }
                            id="input-address"
                            placeholder=" Specialite"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label" 
                            htmlFor="input- Gender"
                          >
                            Gender
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={currentUser.gender}
                            id="input- Gender"
                            placeholder=" Gender"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          
                         
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                         
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" /> 
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">About me</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>About Me</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about you ..."
                        rows="4"
                        defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                        Open Source."
                        type="textarea"
                      />
                    </FormGroup>
                    <Button color="danger" onClick={handleDeleteUser}>
    Delete
  </Button>
  <Button color="warning" onClick={handleDeactivateUser}>
    Deactivate
  </Button>
  <Button color="primary" onClick={handleUpdateUser}>
    Update
  </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
