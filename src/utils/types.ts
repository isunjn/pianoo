export type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

export type Result<T, E> = { type: "Ok"; value: T } | { type: "Err"; error: E };
