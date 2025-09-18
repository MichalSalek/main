export type ValueOf<T> = T[keyof T]

export const objectFlip = <T extends Record<string | number, S>, S extends string | number>(obj: T) => {
  const res = {} as any; // I'm not worried about impl safety
  Object.entries(obj).forEach(([key, value]) => {
    res[value] = key;
  });
  return res as { [K in keyof T as T[K]]: K };
}
