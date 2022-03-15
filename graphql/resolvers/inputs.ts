import { inputObjectType } from 'nexus';

export const UpdateProfileInput = inputObjectType({
  name: 'UpdateProfileInput',
  definition(t) {
    t.nullable.string('name'),
      t.nullable.string('username'),
      t.nullable.string('website'),
      t.nullable.string('bio');
    t.nullable.string('image');
    t.nullable.string('phone');
    t.nullable.string('address');
  },
});

export const CreatePostInput = inputObjectType({
  name: 'CreatePostInput',
  definition(t) {
    t.nullable.string('caption');
    t.list.string('images');
  },
});

export const UpdatePostInput = inputObjectType({
  name: 'UpdatePostInput',
  definition(t) {
    t.nonNull.string('id'), t.nullable.string('caption');
    // t.nullable.list.string('images');
  },
});
