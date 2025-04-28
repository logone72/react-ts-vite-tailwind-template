const checkJsonValid = (json: string) => {
  if (typeof json !== 'string') return false;

  try {
    JSON.parse(json);

    return true;
  } catch {
    return false;
  }
};

export default checkJsonValid;
