import { useCallback, useEffect, useState } from "react";
import { NUMBER_OF_ITEMS_PER_ROW } from "../types";

export const useKeyboardNavigation = (
  totalItems: number,
  onToggleFavorite: (id: number) => void
) => {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  );
  const itemsPerRow = NUMBER_OF_ITEMS_PER_ROW;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIndex === undefined) return;

      let newIndex: number | undefined = selectedIndex;

      if (e.key === "Enter") {
        onToggleFavorite(selectedIndex);
      } else if (
        e.key === "ArrowDown" &&
        selectedIndex + itemsPerRow < totalItems
      ) {
        newIndex = selectedIndex + itemsPerRow;
      } else if (e.key === "ArrowUp" && selectedIndex - itemsPerRow >= 0) {
        newIndex = selectedIndex - itemsPerRow;
      } else if (e.key === "ArrowRight" && selectedIndex + 1 < totalItems) {
        newIndex = selectedIndex + 1;
      } else if (e.key === "ArrowLeft" && selectedIndex - 1 >= 0) {
        newIndex = selectedIndex - 1;
      }

      if (newIndex !== selectedIndex) {
        setSelectedIndex(newIndex);
      }
    },
    [selectedIndex, itemsPerRow, onToggleFavorite, totalItems]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return { selectedIndex, setSelectedIndex };
};
