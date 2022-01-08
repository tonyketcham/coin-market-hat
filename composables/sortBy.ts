/**
 * Mutably sort a list of coins by a given field.
 *
 * @param sortBy the field to sort by
 * @param coins the array of coins to sort
 */
export function sortBy<T>(sortBy: string, coins: T[]): void {
  coins.sort((coinA: { [x: string]: any }, coinB: { [x: string]: any }) => {
    const fieldA = coinA[sortBy];
    const fieldB = coinB[sortBy];

    if (fieldA < fieldB) {
      return -1;
    }
    if (fieldA > fieldB) {
      return 1;
    }
    // fields must be equal
    return 0;
  });
}
