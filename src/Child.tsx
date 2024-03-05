import { useToast } from "./useToast";

export const Child = () => {
  const showToast = useToast();
  return (
    <button
      type="submit"
      onClick={() => showToast({ text: "絶対終わらせろよ" })}
    >
      登録
    </button>
  );
};
