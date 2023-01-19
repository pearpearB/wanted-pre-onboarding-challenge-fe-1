import React, { useState } from "react";
import { useInput } from "../hooks/useInput";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { deleteTodo, updateTodo } from "../utils/apis";

interface deleteTodoProps {
  id: string;
}

interface todoItemProps {
  id: string;
  title: string;
  content: string;
}

function TodoItem({ id, title, content }: todoItemProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id: curID } = useParams();
  const [isEdit, setEdit] = useState(false);
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
  const updateTodoMutation = useMutation(
    ({ id, title, content }: todoItemProps) =>
      updateTodo(id, { title, content }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todoList");
        queryClient.invalidateQueries(["todoList", id]);
      },
    }
  );
  const onDeleteButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    deleteTodoMutation.mutate({ id });
  };
  const onEditButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEdit((cur) => !cur); //전체실행되고 바뀜....?! 네...?!?!?!?!??!?!
    if (editTodoTitle.value === "") return; //버튼을 비활성화??
    if (isEdit) {
      updateTodoMutation.mutate({
        id,
        title: editTodoTitle.value,
        content: editTodoContent.value,
      });
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
      <button onClick={onEditButton}> edit </button>
    </div>
  );
}

export default TodoItem;
