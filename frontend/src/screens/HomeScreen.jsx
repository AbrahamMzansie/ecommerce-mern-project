import React from "react";
import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productSlice";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const { data: productsList, isLoading, error } = useGetProductsQuery();

  console.log(error)

  return (
    <>
      {isLoading ? (
      <Loader />
      ) : error ? (
        <Message variant = "danger">{error?.data?.message || error?.error}</Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {productsList.map((product) => (
              <Col key={product._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
