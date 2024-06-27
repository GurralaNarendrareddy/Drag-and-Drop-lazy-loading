import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = "ITEM";

const SortableItem = ({ item, index, moveItem }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(draggedItem) {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: "8px",
        margin: "4px",
        backgroundColor: "lightgrey",
        cursor: "move",
        textAlign: "center",
      }}
    >
      {item}
    </div>
  );
};

const SortingLists = () => {
  const [items, setItems] = useState([
    "Example 1",
    "Example 2",
    "Example 3",
    "Example 4",
    "Example 5",
    "Example 6",
  ]);

  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {items.map((item, index) => (
        <SortableItem
          key={index}
          index={index}
          item={item}
          moveItem={moveItem}
        />
      ))}
    </DndProvider>
  );
};

export default SortingLists;
