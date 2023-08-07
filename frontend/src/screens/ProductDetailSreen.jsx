import React from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import { useParams } from "react-router-dom";

import products from "../products";
import Rating from "../components/Rating";

const ProductDetailSreen = () => {
  const { id: productId } = useParams();
  const product = products.find((product) => product._id === productId);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Home
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
                <strong>Description {product.description}</strong>
              </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price </Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              
              <ListGroup.Item>
                <Row>
                  <Col>Status</Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  disabled={product.countInStock === 0}
                  className="btn-block"
                  type="submit"
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetailSreen;
