import React from "react";
import { Form , Button} from "react-bootstrap";
import axios from "axios";
import  {useState}  from 'react';
import { Route, Redirect , useHistory , Link} from "react-router-dom";


export default function NewProduct(props) {

  const [product, setProduct] = useState({}); // product info
  const history = useHistory();

    const onChangeInput = ({ target: { name, value } }) =>{
         setProduct({ ...product, [name]: value });
         
    }

    const onsubmitNewProduct = ( event ) => {
      event.preventDefault();
      console.log('product info after submit', product)

      axios
      .post("http://localhost:5000/api/product/new-product", product)
      .then((res) => {

        history.push("/products");

         
      })
      .catch((err) => console.log(err));
      

    }

    const numbersOfQty = 30;

    const qtyNumberDropDown = [...Array(numbersOfQty)].map((e,i)=>{
      return (
      <option>{i+1}</option>
      )

    })
    if (props.auth.isLoggedIn) {

  return (
    <div className="NewProduct">
      <Form className="form">
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>
            <b>Product Name</b>
          </Form.Label>
          <Form.Control type="text" placeholder="Philips Series 3200 Fully Automatic Espresso Machine" name="title"  onChange={(e) => onChangeInput(e)} />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>
            <b>Description</b>
          </Form.Label>
          <Form.Control as="textarea" rows={10} name="description"  onChange={(e) => onChangeInput(e)}/>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>
            <b>Image</b>
          </Form.Label>
          <Form.Control type="text" placeholder="http://" name="img"  onChange={(e) => onChangeInput(e)}/>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>
            <b>Price</b>
          </Form.Label>
          <Form.Control type="text" placeholder="Product Price"  name="price"  onChange={(e) => onChangeInput(e)}/>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>
            <b>State</b>
          </Form.Label>
        <Form.Control size="mm" as="select" name="state" onChange={(e) => onChangeInput(e)} placeholder="http://">
          <option value={-1}></option>
          <option>New</option>
          <option>Like New</option>
          <option>Used</option>
        </Form.Control>
        </Form.Group>
        
        <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>
            <b>Quantity</b>
          </Form.Label>
        <Form.Control  size="sm" as="select" name="qty" onChange={(e) => onChangeInput(e)} className="qty-drop-down">
          <option ></option>
          {qtyNumberDropDown}
        </Form.Control>
        </Form.Group>

        <br/>
        <Link to="/products" className="btn-add-product" > 
        <Button variant="secondary" size="sm" onClick={(e)=>onsubmitNewProduct(e)}>
          Add New Product
        </Button>
        </Link>
        
      </Form>
    </div>
  );
} else {
  return (
    <Route>
      <Redirect to="/login" />
    </Route>
  );
  }
}
