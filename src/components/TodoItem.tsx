import React, { useState } from "react";
import { useInput } from "../hooks/useInput";
import { instance } from "../utils/axios";
import { Link } from "react-router-dom";

interface todoItemProps {
  id: string;
  title: string;
  content: string;
}

function TodoItem({ id, title, content }: todoItemProps) {
  const [isEdit, setEdit] = useState(false);
  // const detailMatch = useMatch("/:id");
  const { editTodoTitle } = useInput({
    initialValue: title,
    tag: "editTodoTitle",
  });
  const { editTodoContent } = useInput({
    initialValue: content,
    tag: "editTodoContent",
  });
  const deleteTodo = async () => {
    try {
      await instance.delete(`todos/${id}`);
    } catch {
      console.log("failed deletTodo");
    }
  };
  const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    deleteTodo();
  };
  const updateTodo = async () => {
    try {
      await instance.put(`/todos/${id}`, {
        title: editTodoTitle.value,
        content: editTodoContent.value,
      });
    } catch {
      console.log("failed updateTodo");
    }
  };
  const onEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEdit((cur) => !cur); //전체실행되고 바뀜....?! 네...?!?!?!?!??!?!
    if (isEdit) {
      updateTodo();
    }
  };
  return (
    <div>
      {isEdit ? (
        <div>
          <div>
            <input
              value={editTodoTitle.value}
              onChange={editTodoTitle.onChange}
            />
          </div>
          <input
            value={editTodoContent.value}
            onChange={editTodoContent.onChange}
          />
        </div>
      ) : (
        <div>
          <div>
            <Link to={`/todos/${id}`}>{title}</Link>
          </div>
          {/* <div>{`content: ${content}`}</div> */}
        </div>
      )}
      <button onClick={onDelete}> x </button>
      <button onClick={onEdit}> edit </button>
    </div>
  );
}

export default TodoItem;
