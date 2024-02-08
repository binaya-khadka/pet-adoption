const getItem = <T>(key: string): T | undefined => {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) return undefined
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

const setItem = <T>(key: string, value: T): boolean => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage?.setItem(key, serializedState);
    return true
  } catch (err) {
    return false
  }
}

const removeItem = (key: string): boolean => {
  try {
    localStorage.removeItem(key);
    return true
  } catch (err) {
    return false
  }
}

const clear = async () => {
  try {
    if (typeof window !== 'undefined') {
      await localStorage.clear()
    }
  } catch (err) {
    return undefined
  }
}

export { getItem, setItem, removeItem, clear }