import React from "react";
import { Card } from "react-bootstrap";
import {Link} from 'react-router-dom';

import Rating from "../components/Rating"

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounder">
      <Link to={`product/${product._id}`}>
        <Card.Img variant="top" src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`product/${product._id}`}>
          <Card.Title className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>

          <Card.Title>
            <Rating value={product.rating} text = {`${product.numReviews} reviews`} />
          </Card.Title>
          <Card.Text>
            <h3>{product.price}</h3>
          </Card.Text>
        </Link>
      </Card.Body>
    </Card>
  );
};
export default Product;
