export function getFromStorage(key) {
  if (!key) {
    return null;
  }
  try {
    const strValue = localStorage.getItem(key);
    if (strValue) {
      return JSON.parse(strValue);
    }
    return null;
  } catch (err) {
    return null;
  }
}

export function setInstorage(key, obj) {
  if (!key) {
    console.error("Key is Missing");
    return null;
  }
  try {
    localStorage.setItem(key, JSON.stringify(obj));
  } catch (err) {
    console.error(err);
    return null;
  }
}
