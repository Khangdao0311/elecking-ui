import { LuLoaderCircle } from "react-icons/lu";

function Loading() {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-40 center-flex">
      <LuLoaderCircle className="text-white w-28 h-28 animate-spin" />
    </div>
  );
}

export default Loading;
