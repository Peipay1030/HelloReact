import React, { useState, createContext, useContext, ReactNode } from "react";
import "./toast.css"; // CSSファイルのインポート
import CheckmarkIcon from "./Checkmark";
import NGmarkIcon from "./NGmark";

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
    setTimeout(() => {
      setShowable(false);
    }, 5000);
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {showable && (
        <div className={`toast ${toastType === "normal" ? "normal" : "error"}`}>
          <ToastIcon toastType={toastType} />
          {toastText}
        </div>
      )}
    </ToastContext.Provider>
  );
};

const ToastIcon = ({ toastType }: { toastType: ToastTypes }) => {
  return toastType === "normal" ? <CheckmarkIcon /> : <NGmarkIcon />;
};
