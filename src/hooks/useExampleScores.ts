import { type MusicScore } from "~/core/parser";
import useSWRImmutable from "swr/immutable";

/* backend not built yet, use static files in public/examples temporarily */

const parallelScoreFetcher = (...ids: number[]) =>
  Promise.all(
    ids.map(id => 
      fetch(`/examples/${id.toString().padStart(3, "0")}.json`)
        .then(r => r.json() as Promise<MusicScore>)
    )
  );

function useExampleScores(ids: number[]) {
  const { data, error } = useSWRImmutable(ids, parallelScoreFetcher);
  return {
    exampleScores: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useExampleScores;
