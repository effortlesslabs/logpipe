/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

function useOnClickOutside<T>(ref: React.RefObject<T>, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (
        !ref.current ||
        !(ref.current as any).contains(event.target as Node)
      ) {
        handler();
      }
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default useOnClickOutside;
