import React, { useState } from "react";
import { useInput } from "../hooks/useInput";
import { instance } from "../utils/axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { deleteTodo } from "../utils/apis";

interface deleteTodoProps {
  id: string;
}

interface todoItemProps {
  id: string;
  title: string;
  content: string;
}

function TodoItem({ id, title, content }: todoItemProps) {
  const [isEdit, setEdit] = useState(false);
  const { id: curID } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { editTodoTitle } = useInput({
    initialValue: title,
    tag: "editTodoTitle",
  });
  const { editTodoContent } = useInput({
    initialValue: content,
    tag: "editTodoContent",
  });
  const deleteTodoMutation = useMutation(
    ({ id }: deleteTodoProps) => deleteTodo(id),
    {
      onSuccess: () => {
        queryClient.removeQueries(["todoList", id]);
        queryClient.invalidateQueries("todoList");
        if (curID === id) navigate("/todos");
      },
    }
  );
  const onDeleteButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    deleteTodoMutation.mutate({ id });
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
          <Link to={`/todos/${id}`}>{title}</Link>
        </div>
      )}
      <button onClick={onDeleteButton}> x </button>
      <button onClick={onEdit}> edit </button>
    </div>
  );
}

export default TodoItem;
