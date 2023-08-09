import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  ListGroupItem,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };

  const removeItemHandler = async (item) => {
    dispatch(removeFromCart(item));
  };

  const checkOutHandler = async () => {
   navigate( "/login?redirect=/shipping")
  };
  

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your Cart is empty{" "}
            <Link to="/">
              <strong>Continue Shopping</strong>
            </Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroupItem key={item.id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid />
                  </Col>

                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => {
                        addToCartHandler(item, Number(e.target.value));
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeItemHandler(item)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      {cartItems.length > 0 && (
 <Col md={4}>
 <Card>
   <h4 style={{ marginBottom: "20px" }}>Order Summary</h4>
   <ListGroup variant="flush">
     <ListGroupItem>
       <h2>
         SubTotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
         items
       </h2>
       ${" "}
       {cartItems
         .reduce((acc, item) => acc + item.qty * item.price, 0)
         .toFixed(2)}
     </ListGroupItem>
     <ListGroupItem>
       <Button
         type="button"
         className="btn-block"
         disabled={cartItems.length === 0}
         onClick = {checkOutHandler}
       >
         Proceed To Checkout
       </Button>
     </ListGroupItem>
   </ListGroup>
 </Card>
</Col>
      )}
     
    </Row>
  );
};

export default CartScreen;
