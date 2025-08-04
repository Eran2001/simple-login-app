// components/ui/Modal.jsx
import React, { useEffect, useState } from "react";

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  const [show, setShow] = useState(false);

  // Control the animation delay so it can smoothly slide down/up
  useEffect(() => {
    if (isOpen) {
      setShow(true);
      document.body.style.overflow = "hidden"; // prevent background scroll
    } else {
      // delay hiding to let animation play
      const timer = setTimeout(() => setShow(false), 300);
      document.body.style.overflow = "auto";
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      tabIndex={-1}
    >
      <div
        className={`bg-white rounded-xl shadow-2xl max-w-lg w-full m-3 sm:mx-auto mt-7 transform transition-all duration-300 ease-out
          ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200">
          <h3 id="modal-title" className="font-bold text-gray-800">
            {title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="size-8 inline-flex justify-center items-center rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
          >
            <svg
              className="size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-4 overflow-y-auto">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
