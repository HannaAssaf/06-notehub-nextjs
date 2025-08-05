"use client";

import React, { useState } from "react";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import NoteModal from "../../components/NoteModal/NoteModal";
import NoteForm from "@//components/NoteForm/NoteForm";
import css from "./page.module.css";
import Loading from "@/app/loading";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/app/lib/api";
import { useDebouncedCallback } from "use-debounce";

function App() {
  const [page, setPage] = useState<number>(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [searchNote, setSearchNote] = useState<string>("");

  const updateSearchNote = useDebouncedCallback((newSearchNote: string) => {
    setSearchNote(newSearchNote);
    setPage(1);
  }, 300);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", searchNote, page],
    queryFn: () => fetchNotes(searchNote, page),
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={searchNote} onSearch={updateSearchNote} />
          {isSuccess && (
            <Pagination
              page={page}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
          )}
          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        </header>
        {data && <NoteList notes={data.notes} />}
        {isModalOpen && (
          <NoteModal onClose={closeModal}>
            <NoteForm onCloseModal={closeModal} />
          </NoteModal>
        )}
      </div>
    </>
  );
}

export default App;
