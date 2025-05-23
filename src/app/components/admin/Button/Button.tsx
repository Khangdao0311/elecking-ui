import { useRouter } from "next/navigation";

function Button({ back = "", onClick, loading = false }: any) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (!loading && onClick) {
      onClick(e);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleClick}
        disabled={loading}
        className={`text-sm font-bold rounded px-5 py-2  text-green-800 bg-green-100
          ${loading
            ? "opacity-30 cursor-not-allowed"
            : ""
          }`}
      >
        Lưu lại
      </button>
      <button
        onClick={() => router.push(back)}
        className="text-sm font-bold text-red-800 bg-red-100 rounded px-5 py-2"
      >
        Hủy bỏ
      </button>
    </div>
  );
}

export default Button;
