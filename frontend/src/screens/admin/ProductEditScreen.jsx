import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Spinner } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useUpdateProductMutation,
  useGetPorductByIdQuery,
  useUploadProductImageMutation,
} from "../../slices/productSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetPorductByIdQuery(productId);
  const [updateProduct, { isLoading: isLoadingUpdateProduct }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: isLoadingUploadProductImage }] =
    useUploadProductImageMutation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const uploadImageHandler = async (e) => {
    console.log("MMMMMMMMMMMMMMMMM");
    const formData = new FormData();
    console.log("MMMMMMMMMMMMMMMMM", e.target.files[0]);
    formData.append("image", e.target.files[0]);
    try {
      const response = await uploadProductImage(formData).unwrap();
      console.log(response);
      toast.success("Product updated Successfull");
      setImage(response.image);
    } catch (error) {
      console.log(error);
      toast.error(error.data.message || error.error);
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setImage(product.image);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProduct({
        _id: productId,
        name,
        description,
        price,
        category,
        countInStock,
        brand,
        image
      }).unwrap();
      refetch();
      toast.success("Product updated Successfull");
      navigate("/admin/product-list");
    } catch (error) {
      toast.error(error.data.message || error.error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Message variant="danger">{error.data.message || error.error}</Message>;
  }
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        GO Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="description" className="my-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="description"
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="price" className="my-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Product Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="category" className="my-3">
            <Form.Label>Product category</Form.Label>
            <Form.Control
              type="category"
              placeholder="Product Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="stock" className="my-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="stock"
              placeholder="Count in stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="stock" className="my-3">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="brand"
              placeholder="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="stock" className="my-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Image upload url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <Form.Control
              type="file"
              label="Choose a file"
              onChange={uploadImageHandler}
            />
            {isLoadingUploadProductImage && (
              <Spinner animation="border" size="sm" />
            )}
          </Form.Group>
          <Button
            disabled={isLoadingUpdateProduct}
            type="submit"
            variant="primary"
            className="mt-2 px-4"
          >
            {isLoadingUpdateProduct ? (
              <>
                <Spinner animation="border" size="sm" />
                {"processing"}
              </>
            ) : (
              "Edit Porduct"
            )}
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
