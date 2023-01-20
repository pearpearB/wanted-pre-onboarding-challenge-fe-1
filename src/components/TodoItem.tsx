import React, { useState } from "react";
import { useInput } from "../hooks/useInput";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { deleteTodo, updateTodo } from "../utils/apis";
import styled from "styled-components";

const TodoItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0.2rem;
  margin-top: 0.2rem;
`;
const StyledButton = styled.button`
  width: auto;
  height: 1rem;
  font-size: 0.2rem;
  background-color: white;
  border: 1px solid black;
  :hover {
    background: #e7e7e7;
    cursor: pointer;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
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
    <TodoItemContainer>
      {isEdit ? (
        <div>
          <div>
            title
            <input
              value={editTodoTitle.value}
              onChange={editTodoTitle.onChange}
            />
          </div>
          content
          <input
            value={editTodoContent.value}
            onChange={editTodoContent.onChange}
          />
        </div>
      ) : (
        <StyledLink to={`/todos/${id}`}>{title}</StyledLink>
      )}
      <div>
        <StyledButton onClick={onDeleteButton}> x </StyledButton>
        <StyledButton onClick={onEditButton}> edit </StyledButton>
      </div>
    </TodoItemContainer>
  );
}

export default TodoItem;
