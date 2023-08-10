import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
  Spinner,
} from "react-bootstrap";
import CheckOutSteps from "../components/CheckOutSteps";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../components/Message";
import { useCreateNewOrderMutation } from "../slices/orderSlice";
import { clearCartItems } from "../slices/cartSlice";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;

  const [createNewOrder,{ isLoading } , error] = useCreateNewOrderMutation();

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    } else {
      if (!paymentMethod) {
        navigate("/payment");
      }
    }
  }, [shippingAddress.address, , paymentMethod, navigate]);

  const placeOrderHandler = async () => {
    try {
      const response = await createNewOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      console.log("RESPONSE", response);
      dispatch(clearCartItems());
      navigate(`/order/${response._id}`);
      console.log("CART DATA" , cart);
    } catch (error) {
      console.log("MMMMMMMMMM", error);
      toast.error(error.data.message || error.error);
    }
  };

  return (
    <>
      <CheckOutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Shipping</h3>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}
                <br />
                {shippingAddress.city}, {shippingAddress.postalCode} ,
                {shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Payment Method</h3>
              <p>
                <strong>Method : </strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Order Items</h3>
              {cartItems.length === 0 ? (
                <Message variant="info">
                  <strong>Your Cart is empty !!!</strong>
                </Message>
              ) : (
                <ListGroup>
                  {cartItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={4}>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col>
                          <strong>Price : </strong>
                          {item.price}
                        </Col>
                        <Col>
                          <strong>Quantity : </strong>
                          {item.qty}
                        </Col>
                        <Col>
                          <strong>Total : </strong>
                          {item.price * item.qty}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>Order Summary</h3>
              </ListGroup.Item>
              <ListGroupItem>
                <Row>
                  <Col>Items:</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cart.shippingPice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax Amount:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total Amount:</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroupItem>
              {error && error.data && (
                <ListGroupItem>
                  {error && error.data && (
                    <Message variant="danger">
                      {error?.data?.message || error?.error}
                    </Message>
                  )}
                </ListGroupItem>
              )}

              <ListGroupItem>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  {isLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Place Order"
                  )}
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
