import { CreateNoteRequest, Note } from '@/types/note';
import axios from 'axios';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const fetchNotes = async (
  page: number = 1,
  searchValue: string,
): Promise<FetchNotesResponse> => {
  const { data } = await axios.get<FetchNotesResponse>('/notes', {
    params: { page, search: searchValue },
  });

  return data;
};

export const fetchSingleNote = async (id: string) => {
  console.log('getSingleNote');
  const { data } = await axios.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (data: CreateNoteRequest) => {
  const res = await axios.post<Note>('/notes', data);

  return res.data;
};

export const deleteNote = async (noteId: string) => {
  const res = await axios.delete<Note>(`/notes/${noteId}`);
  console.log(res.data);

  return res.data;
};
