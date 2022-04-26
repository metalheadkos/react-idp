export class DataStore {
  data = []

  constructor(rootStore) {
    this.rootStore = rootStore
  }

  addData = (row) => {
    this.rootStore.dataStore.data.push(row)
  }

  getData = () => this.rootStore.dataStore.data

  clearData = () => {
    this.rootStore.dataStore.data = []
  }
}
