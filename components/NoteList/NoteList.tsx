import css from "./NoteList.module.css";
import NoteListClient from "./NoteListClient";
import Link from "next/link";
import type { Note } from "../../types/note";

export interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  if (!notes || notes.length === 0) {
    return null;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link className={css.link} href={`/notes/${note.id}`}>
              View details
            </Link>
            <NoteListClient noteId={note.id} />
          </div>
        </li>
      ))}
    </ul>
  );
}
