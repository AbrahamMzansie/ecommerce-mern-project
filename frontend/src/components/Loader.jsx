import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loader = ({width = "200px" , height = "200px"}) => {
  return (
    <Spinner
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: width,
        height: height
      }}
      animation="grow"
    />
  );
};

export default Loader;
