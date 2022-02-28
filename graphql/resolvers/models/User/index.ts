import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('username'),
      t.nonNull.string('username'),
      t.nonNull.string('username'),
      t.nonNull.string('username')
  },
})
