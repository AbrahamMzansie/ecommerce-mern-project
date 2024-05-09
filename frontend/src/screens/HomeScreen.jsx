import React,{useState, useEffect} from "react";
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

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            console.log(error.message);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };
    getLocation();
  }, []);

  const { pageNumber, keyWord } = useParams();
  
 
  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber,
    keyWord,
    latitude, longitude 
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
