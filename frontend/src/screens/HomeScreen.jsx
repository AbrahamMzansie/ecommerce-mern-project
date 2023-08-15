import React from "react";
import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productSlice";
import { useParams } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Pagenate from "../components/Pagenate";


const HomeScreen = () => {
  const {pageNumber} = useParams();
  const { data, isLoading, error } = useGetProductsQuery({pageNumber});
  

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
            {data.products.map((product) => (
              <Col key={product._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Pagenate pages={data.pages} page={data.page} >

          </Pagenate>
        </>
      )}
    </>
  );
};

export default HomeScreen;
