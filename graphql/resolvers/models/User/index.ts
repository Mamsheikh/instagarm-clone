import { objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id'),
      t.nonNull.string('name'),
      t.nonNull.string('email'),
      t.nullable.string('username'),
      t.nullable.string('phone'),
      t.nullable.string('image'),
      t.nullable.string('address'),
      t.nullable.string('website'),
      t.nullable.string('bio'),
      t.nonNull.boolean('isAdmin');
  },
});
