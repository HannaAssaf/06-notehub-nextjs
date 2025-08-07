"use client";

import css from "./NoteList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../lib/api";

export default function NoteListClient({ noteId }: { noteId: string }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <>
      <button className={css.button} onClick={() => mutation.mutate(noteId)}>
        Delete
      </button>
    </>
  );
}
