export const checkImage = (file) => {
  let err = '';
  if (!file) return (err = 'File does not exist');

  if (file.size > 1024 * 1024) return (err = 'File must be less than 1mb');

  if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
    return (err = 'Invalid image format');
  }

  return err;
};
