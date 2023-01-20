import { useInput } from "../hooks/useInput";
import TodoItem from "../components/TodoItem";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { createTodo, getTodo } from "../utils/apis";
import { simpleTodoProps, todoListProps } from "../types/types";
import { Outlet } from "react-router-dom";

function TodoPage() {
  const { todoTitle } = useInput({ initialValue: "", tag: "todoTitle" });
  const { todoContent } = useInput({ initialValue: "", tag: "todoContent" });
  const { data } = useQuery<todoListProps[]>("todoList", getTodo);
  const queryClient = useQueryClient();
  const addTodoMutation = useMutation(
    ({ title, content }: simpleTodoProps) => createTodo(title, content),
    {
      onSuccess: () => queryClient.invalidateQueries("todoList"),
    }
  );
  const onSubmitButton = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodoMutation.mutate({
      title: todoTitle.value,
      content: todoContent.value,
    });
    todoTitle.setValue("");
    todoContent.setValue("");
  };
  return (
    <div>
      <form onSubmit={onSubmitButton}>
        <input
          type="text"
          value={todoTitle.value}
          onChange={todoTitle.onChange}
        />
        <input
          type="text"
          value={todoContent.value}
          onChange={todoContent.onChange}
        />
        <button type="submit"> + </button>
      </form>
      {data?.map((e) => (
        <TodoItem key={e.id} id={e.id} title={e.title} content={e.content} />
      ))}
      <Outlet />
    </div>
  );
}

export default TodoPage;
