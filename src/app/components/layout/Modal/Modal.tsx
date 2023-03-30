"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "../../common/Button";
import { AnimatePresence, Variants, motion as m } from "framer-motion";
import { createPortal } from "react-dom";

export interface ModalProps {
  className?: string;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  children?: JSX.Element | JSX.Element[];
}

const bgVariants: Variants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

const contentVariants: Variants = {
  closed: { scale: 0.95, opacity: 0.5, transition: { duration: 0.15 } },
  open: { scale: 1, opacity: 1, transition: { duration: 0.15 } },
};

const Modal = ({
  className,
  children,
  isModalOpen,
  setIsModalOpen,
}: ModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return isBrowser ? (
    createPortal(
      <AnimatePresence mode="wait">
        {isModalOpen && (
          <m.div
            key="modal"
            animate={isModalOpen ? "open" : "closed"}
            variants={bgVariants}
            initial="closed"
            exit="closed"
            onClick={() => setIsModalOpen(false)}
            className="fixed flex justify-center items-center inset-0 bg-black bg-opacity-50 z-50"
          >
            <m.div
              variants={contentVariants}
              onClick={(e) => e.stopPropagation()}
              className={`bg-white rounded-lg ${className}`}
            >
              {children}
            </m.div>
          </m.div>
        )}
      </AnimatePresence>,
      document.getElementById("modal") as Element
    )
  ) : (
    <div>not a browser</div>
  );
};

export default Modal;
