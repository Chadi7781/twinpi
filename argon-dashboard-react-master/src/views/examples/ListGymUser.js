import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Container,
  Input,
  FormGroup,
  Row,
} from "reactstrap";

import axios from "axios";

const ListGymUser = ({ history }) => {
  const [gyms, setGyms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState();
  const [unliked, setUnliked] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/gym/getGyms")
      .then((response) => setGyms(response.data))
      .catch((error) => console.error(error));
  }, []);

  const likeGym = (id) => {
    axios
      .put(`http://localhost:5000/gym/like/${id}`, {
        userId: sessionStorage.getItem("_id"),
      })
      .then((response) => {
        setLiked(true);
        setUnliked(false);
        setLikeCount(response.data.likes.length);
        window.location.reload();
      });
  };
  const unlikeGym = (id) => {
    axios
      .put(`http://localhost:5000/gym/unlike/${id}`, {
        userId: sessionStorage.getItem("_id"),
      })
      .then((response) => {
        setLiked(false);
        setUnliked(true);
        setLikeCount(response.data.likes.length);
        window.location.reload();
      });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredGyms = gyms.filter((gym) =>
    gym.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="mt-5" fluid>
      <Row className="justify-content-center">
        <Col md="12" lg="12" className="mb-3">
          <FormGroup>
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {" "}
        {filteredGyms.map((gym) => (
          <Col xs="12" sm="6" md="4" lg="3" className="mb-4" key={gym._id}>
            <Card className="shadow-sm h-100">
              <CardImg
                top
                width="100%"
                height="200px"
                src={`http://localhost:5000/gym/uploads/${gym.image}`}
                alt="gym image"
              />
              <CardBody className="d-flex flex-column">
                <CardTitle tag="h5">Name{gym.name}</CardTitle>
                <CardTitle tag="h5">Location :{gym.location}</CardTitle>
                <CardText>{gym.description}</CardText>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <i
                    className={`fas fa-heart me-2 ${
                      liked
                        ? "text-danger"
                        : gym.likes.includes(sessionStorage.getItem("_id"))
                        ? "text-danger"
                        : ""
                    }`}
                    onClick={() => {
                      if (!gym.likes.includes(sessionStorage.getItem("_id"))) {
                        likeGym(gym._id);
                        setLiked(true);
                      } else {
                        unlikeGym(gym._id);
                        setLiked(false);
                      }
                    }}
                  ></i>
                  <div>{gym.likes.length} Likes</div>
                  <i
                    className={`fas fa-thumbs-down me-2 ${
                      unliked
                        ? "text-orange"
                        : !gym.likes.includes(sessionStorage.getItem("_id"))
                        ? "text-orange"
                        : ""
                    }`}
                    onClick={() => {
                      if (gym.likes.includes(sessionStorage.getItem("_id"))) {
                        unlikeGym(gym._id);
                        setUnliked(true);
                      } else {
                        likeGym(gym._id);
                        setUnliked(false);
                      }
                    }}
                  ></i>{" "}
                </div>{" "}
                <br />
                <Row className="justify-content-center">
                  <a
                    href={`http://localhost:5000/gym/uploads/${gym.video}`}
                    className="text-blue"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch Video
                  </a>
                </Row>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ListGymUser;
