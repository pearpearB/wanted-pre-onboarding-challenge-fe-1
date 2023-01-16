import { instance } from "./axios";

export const getTodo = () => {
  return instance.get("/todos").then((response) => response.data.data);
};

export const getTodoById = (id: string) => {
  return instance.get(`/todos/${id}`).then((response) => response.data.data);
};

export const createTodo = async (title: string, content: string) => {
  return instance.post("/todos", {
    title: title,
    content: content,
  });
};

export const deleteTodo = async (id: string) => {
  return instance.delete(`todos/${id}`);
};
