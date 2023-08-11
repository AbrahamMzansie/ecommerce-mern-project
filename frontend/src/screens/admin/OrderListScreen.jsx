import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetAllOrdersQuery } from "../../slices/orderSlice";

const OrderListScreen = () => {
  const {
    data: orderList,
    isLoading: orderListLoading,
    error,
  } = useGetAllOrdersQuery();
  console.log(orderList);

  if (orderListLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <Message variant="danger">
        {error.message || error.error || error.data.message}
      </Message>
    );
  }

  return (
    <>
      <h1>Orders</h1>
      {/* <Table striped  hover responsive className="table-sm"> */}
      <Table striped hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user && order.user.name}</td>
              <td>{order.createdAt && order.createdAt.substring(0, 10)}</td>
              <td>{order.totalPrice}</td>
              <td>
                {order.isPaid && order.paidAt ? (
                  order.paidAt.substring(0, 10)
                ) : (
                  <FaTimes style={{ color: "red" }} />
                )}
              </td>

              <td>
                {order.isDelivered && order.deliveredAt? (
                  order.deliveredAt.substring(0, 10)
                ) : (
                  <FaTimes style={{ color: "red" }} />
                )}
              </td>
              <td>
                <LinkContainer to = {`/order/${order._id}`}>
                  <Button variant="light" className="btn-sm">View</Button>
                  </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default OrderListScreen;
