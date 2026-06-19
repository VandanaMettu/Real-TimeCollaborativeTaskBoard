import { useEffect } from "react";

const useEscapeKey = (callback, isActive) => {
  useEffect(() => {
    if (!isActive) {
      return;
    }
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback]);
};

export default useEscapeKey;
