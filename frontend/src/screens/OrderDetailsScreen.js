import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
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
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../components/Message";
import {
  useGetOrderDetailsQuery,
  useGetPayPalClientIDQuery,
  usePayOrderMutation,
} from "../slices/orderSlice";
import Loader from "../components/Loader";

const OrderDetailsScreen = () => {
  const { id: orderId } = useParams();
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation;
  const [order, payPalDispatch] = usePayPalScriptReducer();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: payPal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIDQuery;

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && payPal.clientId) {
      const loadPayPalScript = async () => {
        payPalDispatch({
          type: "resetOPtions",
          value: {
            "client-id": payPal.clientId,
            currency: "USD",
          },
        });
        payPalDispatch({
          type: "setLoadingStatus",
          value: "pending",
        });
      };
    }
  }, []);
  const {
    data: orderDetails,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  console.log(orderDetails);
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Message variant="danger">{error.message}</Message>;
  }
  return (
    <>
      <h1>Order : {orderDetails._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Shipping</h2>
              <p>
                <strong>Name : </strong>
                {orderDetails.user.name}
              </p>
              <p>
                <strong>Email : </strong>
                {orderDetails.user.email}
              </p>
              <p>
                <strong>Phone : </strong> <strong>Address: </strong>
                {orderDetails.shippingAddress.address}
                <br />
                {orderDetails.shippingAddress.city},{" "}
                {orderDetails.shippingAddress.postalCode} ,
                {orderDetails.shippingAddress.country}
              </p>
              {orderDetails.isDelivered ? (
                <Message variant="info">
                  Delivered on {orderDetails.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment Method</h2>
              <p>
                <strong>Method :</strong>
                {orderDetails.paymentMethod}
              </p>
              {orderDetails.isPaid ? (
                <Message variant="info">Paid On {orderDetails.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Items</h2>
              {orderDetails.orderItems.map((item, index) => (
                <ListGroupItem key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
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
            </ListGroupItem>
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
                  <Col>${orderDetails.itemsPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${orderDetails.shippingPice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax Amount:</Col>
                  <Col>${orderDetails.taxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total Amount:</Col>
                  <Col>${orderDetails.totalPrice}</Col>
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
                {/* <Button
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
                </Button> */}
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderDetailsScreen;
