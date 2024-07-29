"use client";

import { Checkbox, IconButton, Spinner } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { TodoRow, updateTodo } from "actions/todo-actions";
import { queryClient } from "config/ReactQueryClientProvider";
import { useState } from "react";

export default function Todo({ todo }: { todo: TodoRow }) {
  const [isEditing, setIsEditing] = useState(false);
  const [completed, setCompleted] = useState(todo.completed);
  const [title, setTitle] = useState(todo.title);

  const updateTodoMutation = useMutation({
    mutationFn: () =>
      updateTodo({
        id: todo.id,
        title,
        completed,
      }),
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({
        queryKey: ["todo"],
      });
    },
  });

  const handleCheckboxChange = async (e) => {
    await setCompleted(e.target.checked);
    await updateTodoMutation.mutate();
  };

  const handleUpdateClick = async () => {
    await updateTodoMutation.mutate();
  };

  return (
    <div className="w-full flex items-center gap-1">
      <Checkbox checked={completed} onChange={handleCheckboxChange} />

      {isEditing ? (
        <input
          className="flex-1 border-b border-b-black pb-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <p className={`flex-1 ${completed && "line-through"}`}>{title}</p>
      )}

      {isEditing ? (
        <IconButton onClick={handleUpdateClick}>
          {updateTodoMutation.isPending ? (
            <Spinner />
          ) : (
            <i className={`fas fa-check`} />
          )}
        </IconButton>
      ) : (
        <IconButton onClick={() => setIsEditing(true)}>
          <i className={`fas fa-pen`} />
        </IconButton>
      )}

      <IconButton>
        <i className="fas fa-trash" />
      </IconButton>
    </div>
  );
}
