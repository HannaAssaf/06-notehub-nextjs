import NotesClient from "./Notes.client";
import { fetchNotes } from "@/app/lib/api";

export default async function NotesAll() {
  const dataNotes = await fetchNotes();

  return <NotesClient notes={dataNotes.notes} />;
}
