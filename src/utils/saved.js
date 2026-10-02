const KEY = "hostelhub_saved";

export const getSavedIds = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};

// Adds the id if it isn't saved, removes it if it is. Returns the new list.
export const toggleSavedId = (id) => {
  const current = getSavedIds();
  const updated = current.includes(id)
    ? current.filter((x) => x !== id)
    : [...current, id];
  localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
};