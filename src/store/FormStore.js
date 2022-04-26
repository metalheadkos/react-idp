export class FormStore {
  form = {}

  constructor(rootStore) {
    this.rootStore = rootStore
  }

  update(formData) {
    this.rootStore.formStore.form = { ...this.form, ...formData }
  }

  clear() {
    this.rootStore.formStore.form = {}
  }
}
