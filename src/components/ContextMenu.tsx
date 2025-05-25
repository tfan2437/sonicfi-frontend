import { EllipsisIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ContextMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleWheel = () => setIsOpen(false);

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("wheel", handleWheel);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="flex items-center justify-center size-8 text-zinc-100 group-hover:opacity-100 opacity-0"
      >
        <EllipsisIcon className="size-5" />
      </button>
      {isOpen && (
        <div
          className="absolute right-0 top-6 flex w-40 flex-col gap-2 rounded-md border border-zinc-700 bg-zinc-800 p-4 z-50"
          ref={contextMenuRef}
        >
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div onClick={() => setIsOpen(false)}>Close</div>
        </div>
      )}
    </div>
  );
};
export default ContextMenu;
