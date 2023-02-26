

// type OmitUndefined<T> = Pick<T, { [K in keyof T]-?: T[K] extends undefined ? never : K }[keyof T]>;

// function omitUndefined<T extends object>(obj: T): OmitUndefined<T> {
//   const newObj = {} as OmitUndefined<T>;
//   for (const [key, value] of Object.entries(obj)) {
//     if (value !== undefined) {
//       newObj[key as keyof T] = value as T[keyof T];
//     }
//   }
//   return newObj;
// }

// 从T中选择属性
// type OmitUndefined<T> = Pick<T, Exclude<keyof T, undefined>>;
type OmitUndefined<T> = Pick<T, keyof T>;

function omitUndefined<T extends object>(obj: T): OmitUndefined<T> {

  const result = {} as OmitUndefined<T>;

  for (const key of Object.keys(obj)) {

    const val = obj[key as keyof T];
    if (val !== undefined) {
      // @ts-ignore
      result[key as keyof OmitUndefined<T>] = val;
    }
  }
  return result;
}

export default omitUndefined