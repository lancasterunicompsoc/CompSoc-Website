declare global {
  interface Array<T> {
    insert(index: number, item: T): void;
  }
}

// eslint-disable-next-line no-extend-native
Array.prototype.insert = function (index, item) {
  this.splice(index, 0, [item]);
};

export default {};
