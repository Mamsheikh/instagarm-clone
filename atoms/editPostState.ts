import { atom } from 'recoil';

export const editPostState = atom({
  key: 'editPostState',
  default: null,
});

export const editPostModalState = atom({
  key: 'editPostModalState',
  default: false,
});
