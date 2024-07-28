"use client";

import { Button, Input } from "@material-tailwind/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTodo, getTodo } from "actions/todo-actions";
import Todo from "components/todo";
import { useState } from "react";

export default function UI() {
  const [searchInput, setSearchInput] = useState<string>("");

  const todoQuery = useQuery({
    queryKey: ["todo"],
    queryFn: () => getTodo({ searchInput }),
  });

  const createTodoMutation = useMutation({
    mutationFn: () =>
      createTodo({
        title: "New Todo",
        completed: false,
      }),

    onSuccess: () => {
      todoQuery.refetch();
    },
  });

  return (
    <div className="w-2/3 mx-auto flex flex-col items-center py-10 gap-2">
      <h1 className="text-xl">TODO LIST</h1>
      <Input
        label="Search TODO"
        placeholder="Search TODO"
        icon={<i className="fas fa-search" />}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      {todoQuery.isPending && <p>Loading...</p>}
      {todoQuery.data &&
        todoQuery.data.map((todo) => <Todo key={todo.id} todo={todo} />)}

      <Button
        onClick={() => createTodoMutation.mutate()}
        loading={createTodoMutation.isPending}
      >
        <i className="fas fa-plus mr-2" />
        ADD TODO
      </Button>
    </div>
  );
}
