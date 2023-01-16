import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { todoListProps } from "../types/types";
import { getTodoById } from "../utils/apis";

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
    <div>
      <div>{data.title}</div>
      <div>{data.content}</div>
      <div>{data.createdAt}</div>
      <div>{data.updatedAt}</div>
    </div>
  );
}

export default TodoDetailPage;
