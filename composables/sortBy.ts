/**
 * Mutably sort a list of coins by a given field.
 *
 * @param sortBy the field to sort by
 * @param coins the array of coins to sort
 */
export function sortBy<T>(sortBy: string, coins: T[]): void {
  coins.sort((coinA: { [x: string]: any }, coinB: { [x: string]: any }) => {
    let fieldA = coinA[sortBy];
    let fieldB = coinB[sortBy];

    if (typeof fieldA === 'string') {
      fieldA = fieldA.toLowerCase();
      fieldB = fieldB.toLowerCase();
    }

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
