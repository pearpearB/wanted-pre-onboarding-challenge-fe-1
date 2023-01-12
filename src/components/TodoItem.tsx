import React from "react";
import { instance } from "../utils/axios";

interface todoItemProps {
  id: string;
  title: string;
  content: string;
  update: () => void;
}
function TodoItem({ id, title, content, update }: todoItemProps) {
  const deleteTodo = async () => {
    try {
      await instance.delete(`todos/${id}`);
    } catch {
      console.log("failed deletTodo");
    }
  };
  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    deleteTodo();
    update();
  };
  return (
    <div>
      <div>{title}</div>
      <div>{content}</div>
      <button onClick={onClickHandler}> x </button>
    </div>
  );
}

export default TodoItem;
