const clearLocalStorage = async () => {
  try {
    if (typeof window !== 'undefined') {
      await localStorage.clear()
    }
  } catch (err) {
    return undefined
  }
}

export { clearLocalStorage }