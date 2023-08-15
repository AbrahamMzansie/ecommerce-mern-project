import React from "react";
import { useGetProductsQuery } from "../../slices/productSlice";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button, Row, Col, Spinner, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  useCreateNewProductMutation,
  useDeleteProductMutation,
} from "../../slices/productSlice";
import { useParams } from "react-router-dom";
import Pagenate from "../../components/Pagenate";

const ProductListScreen = () => {
  const {pageNumber} = useParams();
  const {
    data,
    error,
    isLoading: isLoadingProducts,
    refetch,
  } = useGetProductsQuery({pageNumber});

  const [createNewProduct, { isLoading: createProductLoading }] =
    useCreateNewProductMutation();
  const [deleteProduct, { isLoading: loadingDeleteProduct }] =
    useDeleteProductMutation();

  const createNewProductHandler = async () => {
    try {
      const newProduct = await createNewProduct().unwrap();
      refetch();
      console.log(newProduct);
      toast.success("Product created successfully");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const deleteHandler = async (productId) => {
    try {
      await deleteProduct(productId).unwrap();
      toast.success("product deleted Successfully");
      refetch();
    } catch (error) {
      toast.error(error?.data.message || error.error);
    }

   
  };
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
          <Button
            disabled={createProductLoading}
            onClick={createNewProductHandler}
            className="btn-sm m-3"
          >
            {createProductLoading ? (
              <>
                <Spinner animation="border" size="sm" />
                {"processing"}
              </>
            ) : (
              <>
                <FaEdit /> Create Product
              </>
            )}
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
          {data.products.map((product, index) => (
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
                  {loadingDeleteProduct ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <FaTrash style={{ color: "white" }} />
                  )}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagenate isAdmin = {true} pages={data.pages} page={data.page} >

</Pagenate>
    </>
  );
};

export default ProductListScreen;
