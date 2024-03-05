import React, { useState, createContext, useContext, ReactNode } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

type ToastTypes = "normal" | "error";

const ToastContext = createContext(
  ({}: { text: string; type?: ToastTypes }) => {}
);
ToastContext.displayName = "ToastContext";

// useToastを使って深い階層のコンポーネントでもトーストを使えるようにする
export const useToast = () => {
  return useContext(ToastContext);
};

type Props = {
  children?: React.ReactNode;
};

// 大元のコンポーネントを囲うためのProvider。トーストの実態もここに入れておく
export const ToastProvider: React.FC<Props> = ({ children }) => {
  const [showable, setShowable] = useState(false);
  const [toastText, setToastText] = useState("");
  const [toastType, setToastType] = useState<ToastTypes>("normal");

  const showToast = ({
    text,
    type = "normal",
  }: {
    text: string;
    type?: ToastTypes;
  }) => {
    setToastText(text);
    setToastType(type);
    setShowable(true);
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {createPortal(
        <Toast visible={showable} toastType={toastType}>
          {toastText}
        </Toast>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

const Toast = styled.div<{ visible: boolean; toastType: ToastTypes }>`
  display: ${(p) => (p.visible ? "block" : "none")};
  background-color: ${(p) => (p.toastType === "normal" ? "blue" : "red")};
`;
