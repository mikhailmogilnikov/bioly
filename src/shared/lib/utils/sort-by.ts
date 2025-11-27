/**
 * Sorts an array of objects by a given key
 * @param array - The array to sort
 * @param key - The key to sort by
 * @returns The sorted array
 */
export const sortBy = <T>(array: T[], key: keyof T) =>
  array.sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;

    return 0;
  });
