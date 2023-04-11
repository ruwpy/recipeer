import { appearVariants } from "./Recipes";
import { motion as m } from "framer-motion";

const Loading = () => {
  return (
    <m.div
      variants={appearVariants}
      className="fixed h-full flex inset-0 justify-center items-center pointer-events-none"
    >
      <div className="p-4 backdrop-blur-lg rounded-lg bg-[#f3f4f6cc] backdrop-opacity-30">
        <div className="w-8 h-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
      </div>
    </m.div>
  );
};

export default Loading;
