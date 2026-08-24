import { QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/api";

export default async function Notes() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes(""),
  });
  return (
    <>
      <div>Notes</div>
    </>
  );
}
