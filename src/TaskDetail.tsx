import React, { useEffect, useState } from "react";
import type { FC } from "react";
import { Form, useLoaderData, useParams } from "react-router-dom";
import { type Todo } from "./schema";
import type { LoaderFunction } from "react-router-dom";
import { backendApi, getContacts } from "./App";

export const Detail: FC = () => {
  const params = useParams();
  const [detaildata, setDetaildata] = useState<responseType | null>(null);

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
        setDetaildata(targetTodo || null);
      } catch (error) {
        console.error("Error fetching data from server: ", error);
      }
    };
    // コンポーネントがマウントされたときにデータを取得
    fetchDataFromServer();
  }, [params.id]);

  return (
    <div>
      <div>
        <h1>hey</h1>
        {detaildata && (
          <>
            <div>title:{detaildata.title}</div>
            <div>id:{detaildata.id}</div>
            <div>description:{detaildata.description}</div>
            <div>create date:{detaildata.created_at}</div>
            <div>status:{detaildata.status}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Detail;
