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

export const CreateUserInput = inputObjectType({
  name: 'CreateUserInput',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('username');
    t.nonNull.string('password');
  },
});
export const LoginUserInput = inputObjectType({
  name: 'LoginUserInput',
  definition(t) {
    t.nonNull.string('email_or_username');
    t.nonNull.string('password');
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
    t.nonNull.string('id');
    t.nullable.string('caption');
    t.nullable.list.string('images');
  },
});
