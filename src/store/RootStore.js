import { DataStore } from './DataStore'
import { FormStore } from './FormStore'

export class RootStore {
  constructor() {
    this.dataStore = new DataStore(this)
    this.formStore = new FormStore(this)
  }
}
