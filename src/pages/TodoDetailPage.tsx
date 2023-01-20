import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { todoListProps } from "../types/types";
import { getTodoById } from "../utils/apis";

const TodoDetailContainer = styled.div`
  border-top: 1px solid black;
  margin-top: 0.2rem;
  padding-top: 0.5rem;
`;
function TodoDetailPage() {
  const { id } = useParams();
  const { data, isLoading, isError, isIdle } = useQuery<todoListProps>(
    ["todoList", id],
    () => getTodoById(id ?? "")
  );
  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>Error</div>;
  if (isIdle) return <div>idle...</div>;
  return (
    <TodoDetailContainer>
      {`<Detail>`}
      <div>{data.title}</div>
      <div>{data.content}</div>
      <div>{data.createdAt}</div>
      <div>{data.updatedAt}</div>
    </TodoDetailContainer>
  );
}

export default TodoDetailPage;
