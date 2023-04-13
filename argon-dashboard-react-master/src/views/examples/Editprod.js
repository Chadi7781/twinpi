import {
  Badge,
  Card,
  CardHeader,
  Table,
  Container,
  Row,Input,
  UncontrolledTooltip,
  Toast
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { withRouter } from 'react-router-dom';

//   const initialstate={
//     name:'',
//     price:'',
//     image:'',
//     description:'',
//     rating:'',

//   }

const Editprod=  ({ match, history })=> {

  const [name, setName] = useState('');
  const [products, setProducts] = useState([]);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [rating, setRating] = useState('0');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) {
      history.push('/login'); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      return;
    }
    fetch(`http://localhost:5000/products/list/${match.params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setRating(data.rating);
      })
      .catch((error) => console.error(error));
  }, [match.params.id, history]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const accessToken = sessionStorage.getItem('accessToken');
    const role = sessionStorage.getItem('role');
    fetch(`http://localhost:5000/products/update/${match.params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ name, description, price, rating }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          history.push('/admin/icons');
          Swal.fire({
            icon: 'success',
            title: 'Product updated successfully!',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          history.push("/admin/icons");

          Swal.fire({

            icon: 'success',
            title: 'Product updated successfully!',
            showConfirmButton: false,
            timer: 1500,

          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while updating the product.',
        });
      });
  };
    
      // 
    
     
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
                <h3 className="mb-0">Update  product</h3>
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
              onChange={event => setName(event.target.value)}  />
  </div>
  
  <div className="form-group col-md-6">
    <label htmlFor="description">description</label>
    <input type="text"
     className="form-control"
     id="InputPassword4" 
    value={description}
      onChange={event => setDescription(event.target.value)}/>
      
  </div>
</div>
<div className="form-group">
  <label htmlFor="InputAddress">rating</label>
  <Input type="number" className="form-control" value={rating}  onChange={event => setRating(event.target.value)}   placeholder="rating"/>
</div>
<div className="form-group">
  <label htmlFor="price">price </label>
  <Input type="number" className="form-control" value={price}
onChange={event => setPrice(event.target.value)}  id="InputAddress2" placeholder="price"/>
</div>
{/* <div className="form-group">
  <label htmlFor="exampleFormControlFile1">Image</label>
  <Input type="file" className="form-control-file"  onChange={event=> setImage(event.target.value)}value={image}  id="exampleFormControlFile1"/>
</div> */}

<button type="submit" className="btn btn-primary" >edit product</button>

</form>
      </Container>
    </>
  );
};

export default Editprod;