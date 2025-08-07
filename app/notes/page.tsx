import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export default async function NotesAll() {
  const { notes, totalPages } = await fetchNotes("", 1);
  return <NotesClient initialNotes={notes} initialTotalPages={totalPages} />;
}
