import { atom } from 'recoil';

export const modalState = atom({
  key: 'modalState',
  default: false,
});

export const followersState = atom({
  key: 'followrsState',
  default: false,
});

export const followingState = atom({
  key: 'followingState',
  default: false,
});
