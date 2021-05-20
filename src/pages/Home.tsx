import React, { useState } from "react";
import { Alert, InteractionManager } from "react-native";

import { Header } from "../components/Header";
import { MyTasksList } from "../components/MyTasksList";
import { TodoInput } from "../components/TodoInput";

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle !== "") {
      const dataTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      };
      setTasks((oldState) => [...oldState, dataTask]);
    }
  }

  function handleMarkTaskAsDone(id: number) {
    const find = tasks.find((item) => item.id === id);
    if (find) find.done = !find.done;
    handleRemoveTask(id);
    const dataTask = {
      id: find?.id || new Date().getTime(),
      title: find?.title || "",
      done: find?.done || false,
    };
    setTasks((oldState) => [dataTask, ...oldState]);
  }

  function handleRemoveTask(id: number) {
    setTasks((oldState) => oldState.filter((item) => item.id !== id));
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList
        tasks={tasks}
        onPress={handleMarkTaskAsDone}
        onLongPress={handleRemoveTask}
      />
    </>
  );
}
