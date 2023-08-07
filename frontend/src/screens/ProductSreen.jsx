import React from "react";
import { useParams } from "react-router-dom";

import products from "../products";

const ProductSreen = () => {
  const { id: productId } = useParams();
  const product = products.find((product) => product.id === productId);

  return <div>ProductSreen</div>;
};

export default ProductSreen;
