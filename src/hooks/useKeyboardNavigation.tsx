import { useEffect, useState } from "react";
import { NUMBER_OF_ITEMS_PER_ROW } from "../types";

export const useKeyboardNavigation = (
  totalItems: number,
  onToggleFavorite: (id: number) => void
) => {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  );
  const itemsPerRow = NUMBER_OF_ITEMS_PER_ROW;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && selectedIndex !== undefined) {
      onToggleFavorite(selectedIndex);
    } else if (e.key === "ArrowDown" && selectedIndex !== undefined) {
      setSelectedIndex((prev) =>
        prev === undefined || prev + itemsPerRow >= totalItems
          ? prev
          : prev + itemsPerRow
      );
    } else if (e.key === "ArrowUp" && selectedIndex !== undefined) {
      setSelectedIndex((prev) =>
        prev === undefined || prev - itemsPerRow < 0 ? prev : prev - itemsPerRow
      );
    } else if (e.key === "ArrowRight" && selectedIndex !== undefined) {
      setSelectedIndex((prev) =>
        prev === undefined || prev + 1 >= totalItems ? prev : prev + 1
      );
    } else if (e.key === "ArrowLeft" && selectedIndex !== undefined) {
      setSelectedIndex((prev) =>
        prev === undefined || prev - 1 < 0 ? prev : prev - 1
      );
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems]);

  return { selectedIndex, setSelectedIndex };
};
