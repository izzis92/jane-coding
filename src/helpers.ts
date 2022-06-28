function includesText(query, name, description) {
  if (name && name.toLowerCase().includes(query)) return true;
  if (description && description.toLowerCase().includes(query)) return true;
  return false;
}

export { includesText };
