//SSR

import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

export default async function NotesPage() {
  const queryClient = new QueryClient();
  const page = 1;
  const searchValue = '';

  await queryClient.prefetchQuery({
    queryKey: ['notes', page, searchValue],
    queryFn: () => fetchNotes(page, searchValue),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
