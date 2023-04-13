import React from "react";
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  CardFooter,
} from "reactstrap";
import ListGymUser from "./ListGymUser";

export default function HomeUser() {
  return (
    <>
      <Navbar
        className="navbar-horizontal navbar-dark bg-gradient-info"
        expand="lg"
      >
        <Container>
          <NavLink className="navbar-brand" href="/">
            My Website
          </NavLink>
          <button
            aria-controls="navbar-info"
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-target="#navbar-info"
            data-toggle="collapse"
            id="navbar-info"
            type="button"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/about">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contact">Contact</NavLink>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
      <div className="header bg-white py-7 py-lg-8">
        <Container>
          <div className="header-body text-center mb-7">
            <Row className="justify-content-center">
              <Col lg="5" md="6">
                <h1 className="text-black">List GYMS</h1>
                <p className="text-lead text-gray-500"></p>
                {/* <NavLink className="btn btn-success mt-4" href="#!">
                  Learn more
                </NavLink> */}
              </Col>
            </Row>
          </div>
        </Container>
        <div className="separator separator-bottom separator-skew zindex-100"></div>
      </div>
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <ListGymUser />
        </Row>
      </Container>
      <CardFooter className="footer">
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <Nav className="nav-footer justify-content-center justify-content-xl-end">
                <NavItem>
                  <NavLink href="/" target="_blank">
                    My Website
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/about" target="_blank">
                    About
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/contact" target="_blank">
                    Contact
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </CardFooter>
    </>
  );
}
