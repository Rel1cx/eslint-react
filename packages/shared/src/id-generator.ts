/**
 * A generator for unique ids.
 */
export class IdGenerator {
  private n: bigint;
  private prefix: string;
  /**
   * @param prefix Optional. A prefix of generated ids.
   */
  constructor(prefix: string = "id_") {
    this.prefix = prefix;
    this.n = 0n;
  }
  /**
   * Generates an id.
   * @returns A generated id.
   */
  next() {
    this.n = 1n + this.n;
    return this.prefix + this.n.toString(16);
  }
}
