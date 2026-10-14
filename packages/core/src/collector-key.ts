let nextKey = 0;

export function getNextCollectorKey() {
  return String(nextKey++);
}
