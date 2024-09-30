/**
 * Test that we preserve order of evaluation on the following case scope@0
 * ```js
 * // simplified HIR
 * scope@0
 *    ...
 *    $0 = arr.length
 *    $1 = arr.length = 0
 *
 * scope@1 <-- here we should depend on $0 (the value of the property load before the
 *             property store)
 *   [$0, $1]
 * ```
 */
function useFoo(source: Array<number>): [number, number] {
  const arr = [1, 2, 3, ...source];
  return [arr.length, (arr.length = 0)];
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [[5, 6]],
};
