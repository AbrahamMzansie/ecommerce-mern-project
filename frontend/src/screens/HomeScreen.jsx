import React from "react";
import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productSlice";
import { Link, useParams } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Pagenate from "../components/Pagenate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const HomeScreen = () => {
  const { pageNumber, keyWord } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber,
    keyWord,
  });

  return (
    <>
      {!keyWord ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Pagenate
            pages={data.pages}
            page={data.page}
            keyWord={keyWord ? keyWord : ""}
          ></Pagenate>
        </>
      )}
    </>
  );
};

export default HomeScreen;
