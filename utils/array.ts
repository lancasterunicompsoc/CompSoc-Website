
declare global {
  interface Array<T> {
    insert(index: number, item: T): void;
  }
}

Array.prototype.insert = function(index, item) {
  this.splice(index, 0, [item]);
}


export default {}

