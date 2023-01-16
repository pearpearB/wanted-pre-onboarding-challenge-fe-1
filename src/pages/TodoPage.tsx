import { useInput } from "../hooks/useInput";
import TodoItem from "../components/TodoItem";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { createTodo, getTodo } from "../utils/apis";
import { simpleTodoProps, todoListProps } from "../types/types";
import { Outlet } from "react-router-dom";

function TodoPage() {
  // const [isUpdate, setUpdate] = useState(false);
  // const [todoList, setTodoList] = useState<todoListProps[]>([]);
  const { todoTitle } = useInput({ initialValue: "", tag: "todoTitle" });
  const { todoContent } = useInput({ initialValue: "", tag: "todoContent" });
  const { data } = useQuery<todoListProps[]>("todoList", getTodo);
  const queryClient = useQueryClient();
  // const update = () => {
  //   setUpdate((cur) => !cur);
  // };

  // const createTodo = async (title: string, content: string) => {
  //   return instance.post("/todos", {
  //     title: title,
  //     content: content,
  //   });
  // };
  const addTodo = useMutation(
    ({ title, content }: simpleTodoProps) => createTodo(title, content),
    {
      onSuccess: () => queryClient.invalidateQueries("todoList"),
    }
  );
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo.mutate({ title: todoTitle.value, content: todoContent.value });
    todoTitle.setValue("");
    todoContent.setValue("");
    // update();
  };
  // const getTodo = async () => {
  //   try {
  //     const { data } = await instance.get("/todos");
  //     console.log(data.data);
  //     setTodoList(data.data);
  //   } catch {
  //     console.log("failed getTodo");
  //   }
  // };
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  return (
    <div>
      <form onSubmit={onSubmit}>
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
