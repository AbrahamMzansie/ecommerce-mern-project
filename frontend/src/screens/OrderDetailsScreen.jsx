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
  useUpdateOrderToDeliveredMutation,
} from "../slices/orderSlice";
import Loader from "../components/Loader";

const OrderDetailsScreen = () => {
  const { id: orderId } = useParams();
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [updateOrderToDelivered, { isLoading: loadingUpdateDelivered }] =
    useUpdateOrderToDeliveredMutation();
  const [{ isPending }, payPalDispatch] = usePayPalScriptReducer();
  const {
    data: payPal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIDQuery();
  const {
    data: orderDetails,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  const { userInfo } = useSelector((state) => state.auth);

  const markDeliveredHandler = async () => {
    try {
      const response = await updateOrderToDelivered(orderId);
      console.log(response);
      refetch();
      toast.success("Order marked as delivered");
    } catch (error) {
      toast.error(error.data.message || error.error);
    }
  };

  const onApproveTest = async () => {
    await payOrder({
      orderId,
      details: { payer: {} },
    });
    refetch();
    toast.success("Payment Successfull");
  };
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: orderDetails.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({
          orderId,
          details,
        });
        refetch();
        toast.success("Payment Successfull");
      } catch (error) {
        toast.error(error.data.message || error.error);
      }
    });
  };
  function onError(error) {
    toast.error(error.data.message || error.error);
  }

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
      if (orderDetails && !orderDetails.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [orderDetails, payPal, payPalDispatch, loadingPayPal, errorPayPal]);

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
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
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
              {!orderDetails.isPaid && (
                <ListGroupItem>
                  {loadingPay && <Spinner animation="border" size="sm" />}
                  {isPending ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <div>
                      {/* <Button
                        style={{ marginBottom: "10px" }}
                        onClick={onApproveTest}
                      >
                        Test Pay Order
                      </Button> */}
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroupItem>
              )}

              {userInfo &&
                userInfo.isAdmin &&
                orderDetails.isPaid &&
                !orderDetails.isDelivered && (
                  <ListGroupItem>
                    <Button
                    disabled={loadingUpdateDelivered}
                      onClick={markDeliveredHandler}
                      className="btn btn-block"
                    >
                      {loadingUpdateDelivered ? (
                        <>
                          <Spinner />
                          {"processing"}
                        </>
                      ) : (
                        "Mark Delivered"
                      )}
                    </Button>
                  </ListGroupItem>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderDetailsScreen;
