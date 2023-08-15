import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyWord: urlKeyWord } = useParams();
  const [keyWord, setKeyWord] = useState(urlKeyWord || "");

  const handlerSearchHandler = (e) => {
    e.preventDefault();
    if (keyWord.trim()) {
        setKeyWord("");
      navigate(`/search/${keyWord}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={handlerSearchHandler} className="d-flex">
      <Form.Control
        className="mr-sm-2 ml-sm-5"
        type="text"
        name="search"
        onChange={(e) => setKeyWord(e.target.value)}
        value={keyWord}
        placeholder="search product......"
      />
      <Button type="submit" variant="outline-success" className="p-2 mx-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
