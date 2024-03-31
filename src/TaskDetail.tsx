import React, { useEffect, useState } from "react";
import type { FC } from "react";
import { Form, useLoaderData, useParams } from "react-router-dom";
import { type Todo } from "./schema";
import type { LoaderFunction } from "react-router-dom";
import { backendApi, getContacts } from "./App";

export const Detail: FC = () => {
  const params = useParams();
  const [detaildata, setDetaildata] = useState<{
    detaildata: responseType | null;
    status: "loading" | "error" | "success";
  }>({ detaildata: null, status: "loading" });

  type responseType = {
    id: string;
    title: string;
    description: string;
    status: "todo" | "doing" | "done";
    archived_at: any;
    update_at: string;
    created_at: string;
  };

  useEffect(() => {
    const fetchDataFromServer = async () => {
      try {
        // サーバーからデータを取得
        const response = await backendApi.get("/todo");
        const todos: responseType[] = response.data;
        const targetTodo = todos.find((todo) => todo.id === params.id);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setDetaildata({ detaildata: targetTodo || null, status: "success" });
      } catch (error) {
        console.error("Error fetching data from server: ", error);
        setDetaildata({ detaildata: null, status: "error" });
      }
    };
    // コンポーネントがマウントされたときにデータを取得
    fetchDataFromServer();
  }, [params.id]);

  const details = detaildata.detaildata;

  const pageRequest = () => {
    switch (detaildata.status) {
      case "success":
        return (
          <div>
            <div>title:{details.title}</div>
            <div>id:{details.id}</div>
            <div>description:{details.description}</div>
            <div>create date:{details.created_at}</div>
            <div>status:{details.status}</div>
          </div>
        );
      case "loading":
        return <div>loading</div>;
      case "error":
        return <div>error</div>;
    }
  };

  return (
    <div>
      <h1>hey</h1>
      {pageRequest()}
    </div>
  );
};

export default Detail;
