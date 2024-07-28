"use client";

import { Checkbox, IconButton, Input } from "@material-tailwind/react";
import { TodoRow } from "actions/todo-actions";
import { useState } from "react";

export default function Todo({ todo }: { todo: TodoRow }) {
  const [isEditing, setIsEditing] = useState(false);
  const [completed, setCompleted] = useState(todo.completed);
  const [title, setTitle] = useState(todo.title);
  return (
    <div className="w-full flex items-center gap-1">
      <Checkbox checked={completed} onChange={() => setCompleted(!completed)} />

      {isEditing ? (
        <input
          className="flex-1 border-b border-b-black pb-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <p className={`flex-1 ${completed && "line-through"}`}>{title}</p>
      )}

      <IconButton onClick={() => setIsEditing(!isEditing)}>
        <i className={`fas ${isEditing ? "fa-check" : "fa-pen"}`} />
      </IconButton>
      <IconButton>
        <i className="fas fa-trash" />
      </IconButton>
    </div>
  );
}
