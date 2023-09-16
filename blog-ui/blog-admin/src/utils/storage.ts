class LocalStorage {
  private constructor() {}
  static getItem(key: string): any {
    const item = localStorage.getItem(key)
    if (item == null) {
      return ''
    } else {
      try {
        return JSON.parse(item)
      } catch {
        return ''
      }
    }
  }
  static setItem(key: string, val: any) {
    if (val == null) {
      val = ''
    } else {
      val = JSON.stringify(val)
    }
    localStorage.setItem(key, val)
  }
  static removeItem(key: string) {
    localStorage.removeItem(key)
  }
}

export default LocalStorage
