import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/api";
import NotesClient from "./Notes.client";

export default async function Notes() {
  const queryClient = new QueryClient();
  await queryClient.query({
    queryKey: ["notes"],
    queryFn: () => fetchNotes(""),
  });
  return (
    <>
      <div>Notes</div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient />
      </HydrationBoundary>
    </>
  );
}
