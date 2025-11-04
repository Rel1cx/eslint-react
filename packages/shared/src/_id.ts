// ------------------------------------------------------------------------------
// Public Interface
// ------------------------------------------------------------------------------

/**
 * A generator for unique ids.
 */
class IdGenerator {
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
   * Generates id.
   * @returns A generated id.
   */
  next() {
    this.n = (1n + this.n) | 0n;
    return this.prefix + this.n.toString(16);
  }
}

export { IdGenerator };
