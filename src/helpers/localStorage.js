function saveToLocalStorage (key, dataString) {
  if (!window.localStorage) return undefined
  window.localStorage.setItem(key, JSON.stringify(dataString))
  return true
}

function loadFromLocalStorage (key) {
  if (!window.localStorage) return undefined
  const dataString = window.localStorage.getItem(key)
  let dataObj = {}
  
  try {
    dataObj = JSON.parse(dataString)
  } catch (err) {
    console.error(err)
  }
  
  return dataObj
}

export { saveToLocalStorage, loadFromLocalStorage }
