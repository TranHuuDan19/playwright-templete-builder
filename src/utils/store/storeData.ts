let store: { [key: string]: any } = {};

function saveData(key: string | number, data: any): void {
  store[key.toString()] = data;
}

function getData(key: string | number): any {
  return store[key.toString()];
}

module.exports = { saveData, getData };
