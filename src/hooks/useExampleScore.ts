import { type MusicScore } from "~/core/parser";
import useSWRImmutable from "swr/immutable";

/* backend not built yet, use static files in public/examples temporarily */

const scoreFetcher = (id: number) =>
  fetch(`/examples/${id.toString().padStart(3, "0")}.json`).then(
    r => r.json() as Promise<MusicScore>
  );

const parallelScoreFetcher = (...ids: number[]) =>
  Promise.all(ids.map(id => scoreFetcher(id)));

export function useExampleScore(id: number) {
  const { data, error } = useSWRImmutable(id.toString(), scoreFetcher);
  return {
    score: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useExampleScores(ids: number[]) {
  const { data, error } = useSWRImmutable(ids, parallelScoreFetcher);
  return {
    scores: data,
    isLoading: !error && !data,
    isError: error,
  };
}
