export function chunk<T>(arr: readonly T[], size: number): T[][] {
  if (!Number.isInteger(size) || size <= 0) {
    throw new Error("Size must be an integer greater than zero.");
  }

  const chunkLength = Math.ceil(arr.length / size);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const result: T[][] = Array(chunkLength);

  for (let index = 0; index < chunkLength; index++) {
    const start = index * size;
    const end = start + size;

    result[index] = arr.slice(start, end);
  }

  return result;
}
