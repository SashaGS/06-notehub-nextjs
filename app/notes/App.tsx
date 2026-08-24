import { useEffect, useState } from 'react';
import { fetchNotes } from '../../services/noteService';
import css from './App.module.css';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import toast, { Toaster } from 'react-hot-toast';

import Modal from '../Modal/Modal';
import SearchBox from '../SearchBox/SearchBox';
import NoteList from '../NoteList/NoteList';
import NoteForm from '../NoteForm/NoteForm';
import Pagination from '../Pagination/Pagination';
import Loader from '../Loader/Loader';

function App() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenModal, setisOpenModal] = useState(false);

  const {
    data: notes,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['notes', search, currentPage],
    queryFn: () => fetchNotes(search, currentPage),
    retry: 1,
    staleTime: 5000,
    placeholderData: keepPreviousData,
  });

  const handleClick = () => {
    setisOpenModal(!isOpenModal);
  };

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, 500);

  useEffect(() => {
    if (isError || notes?.notes.length === 0) {
      toast('Failed to load notes or no matches found. Please try again.');
    }
  }, [isError, notes]);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {<SearchBox updateSearchQuery={updateSearchQuery} />}
          {notes && notes.notes.length > 0 && notes?.totalPages > 1 && (
            <Pagination
              totalPages={notes?.totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
          {
            <button className={css.button} onClick={handleClick}>
              Create note +
            </button>
          }
        </header>
        {isLoading && <Loader />}
        <Toaster
          toastOptions={{
            className: '',
            style: {
              border: '1px solid #713200',
              background: '#d67719cb',
            },
          }}
        />
        {isOpenModal && (
          <Modal onClose={handleClick} isOpen={isOpenModal}>
            <NoteForm onClose={handleClick} />
          </Modal>
        )}

        {isSuccess && notes && <NoteList notes={notes?.notes} />}
      </div>
    </>
  );
}

export default App;
