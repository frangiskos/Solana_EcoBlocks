// type RemoveUndefined<T> = {
//   [P in keyof T]: Exclude<T[P], undefined>;
// };

// export function removeUndefined<T extends Record<string, unknown>>(obj: T): RemoveUndefined<T> {
//   const copy = { ...obj };
//   Object.keys(copy).forEach((key) => (copy[key as keyof T] === undefined ? delete copy[key as keyof T] : {}));
//   return copy as RemoveUndefined<T>;
// }

// // returns the type of the object without the undefined properties
// type DefinedOnly<T> = Pick<T, RequiredKeys<T>>;

// type RequiredKeys<T> = {
//     [K in keyof T]-?:
//         ({} extends { [P in K]: T[K] } ? never : K)
// } extends { [_ in keyof T]-?: infer U }
//     ? U
//     : never;

// export function removeUndefined<T extends Record<string, unknown>>(obj: T): DefinedOnly<T> {
//     const copy = { ...obj };
//     Object.keys(copy).forEach((key) =>
//         (copy[key as keyof T] === undefined ? delete copy[key as keyof T] : {}));
//     return copy as DefinedOnly<T>;
// }

export function removeUndefined<T extends Record<string, unknown>>(obj: T): Required<T> {
  const copy = { ...obj };
  Object.keys(copy).forEach((key) => (copy[key as keyof T] === undefined ? delete copy[key as keyof T] : {}));
  return copy as Required<T>;
}
