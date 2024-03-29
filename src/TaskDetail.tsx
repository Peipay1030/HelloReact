import React from "react";
import type { FC } from "react";
import { Form, useLoaderData, useParams } from "react-router-dom";
import { type Todo } from "./schema";
import type { LoaderFunction } from "react-router-dom";
import { getContacts } from "./App";

export const Detail: FC = () => {
  const prams = useParams();
  console.log(prams.id);
  return (
    <div>
      <div>
        <h1>hey</h1>
        <div>heyhey</div>
      </div>
    </div>
  );
};

export default Detail;
