import { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

const NotificationModalRoot = document.querySelector(
  "#modal-root"
) as HTMLElement;
console.log(NotificationModalRoot);

type ModalProps = {
  children: ReactNode;
};

export function NotificationModal({ children }: ModalProps) {
  // create div element only once using ref
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) elRef.current = document.createElement("div");

  console.log(elRef.current!);
  useEffect(() => {
    const el = elRef.current!; // non-null assertion because it will never be null
    console.log(el);
    NotificationModalRoot.appendChild(el);
    return () => {
      NotificationModalRoot.removeChild(el);
    };
  }, []);

  return createPortal(children, elRef.current);
}
