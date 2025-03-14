const parseIsFavourite = (isFavourite) => {
  if (typeof isFavourite === 'boolean') return isFavourite;
  if (typeof isFavourite === 'string') {
    if (isFavourite === 'true') return true;
    if (isFavourite === 'false') return false;
  }
  return false;
};

const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return 'personal';
  const types = ['work', 'home', 'personal'];
  return types.includes(contactType) ? contactType : 'personal';
};

export const parseFilterParams = (query) => {
  const { isFavourite, contactType } = query;
  const parsedIsFavourite = parseIsFavourite(isFavourite);
  const parsedContactType = parseContactType(contactType);
  return {
    isFavourite: parsedIsFavourite,
    contactType: parsedContactType,
  };
};
