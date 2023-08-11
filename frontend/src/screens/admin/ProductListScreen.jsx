import React from "react";
import { useGetProductsQuery } from "../../slices/productSlice";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
  Spinner,
  Table,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const ProductListScreen = () => {
  const {
    data: productList,
    error,
    isLoading: isLoadingProducts,
  } = useGetProductsQuery();
  
  const deleteHandler = () =>{
    toast.error("Deleted Successfully");
  }
  if (isLoadingProducts) {
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
      <Row className="align-item-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3">
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      <Table striped hover responsive className="table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>
                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                  <Button variant="light" className="btn-sm mx-2">
                    <FaEdit />
                  </Button>
                </LinkContainer>
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => deleteHandler(product._id)}
                >
                  <FaTrash style={{ color: "white" }} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ProductListScreen;
