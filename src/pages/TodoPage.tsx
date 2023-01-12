import { instance } from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useInput } from "../hooks/useInput";
import TodoItem from "../components/TodoItem";

interface todoListProps {
  content: string;
  createdAt: string;
  id: string;
  title: string;
  updatedAt: string;
}

function TodoPage() {
  const [isUpdate, setUpdate] = useState(false);
  const [todoList, setTodoList] = useState<todoListProps[]>([]);
  const { todoTitle } = useInput({ initialValue: "", tag: "todoTitle" });
  const { todoContent } = useInput({ initialValue: "", tag: "todoContent" });
  const update = () => {
    setUpdate((cur) => !cur);
  };
  const createTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await instance.post("/todos", {
        title: todoTitle.value,
        content: todoContent.value,
      });
      todoTitle.setValue("");
      update();
    } catch (error) {
      console.log(error);
      alert("faild createTodo");
    }
  };
  const getTodo = async () => {
    try {
      const { data } = await instance.get("/todos");
      console.log(data.data);
      setTodoList(data.data);
    } catch {
      console.log("failed getTodo");
    }
  };
  useEffect(() => {
    getTodo();
  }, [isUpdate]);
  //todolist에 변경이 있을 때만 바꾸고 싶음..을 어케하지?!
  return (
    <div>
      <div>Todo-list</div>
      <form onSubmit={createTodo}>
        <input
          type="text"
          value={todoTitle.value}
          onChange={todoTitle.onChange}
        />
        <button type="submit"> + </button>
      </form>
      {todoList.map((e) => (
        <TodoItem
          key={e.id}
          id={e.id}
          title={e.title}
          content={e.content}
          update={update}
        />
      ))}
    </div>
  );
}

export default TodoPage;
