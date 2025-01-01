import React from "react";
import { useParams } from "react-router";

const Book = () => {
  const { id } = useParams();
  return <div>This is room with id : {id}</div>;
};

export default Book;
