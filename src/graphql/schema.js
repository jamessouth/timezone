import { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

const assert = require('assert');
const TimezoneType = new GraphQLObjectType({
  name: 'Timezone',
  fields: () => ({
    offset: { type: GraphQLString },
    locations: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    timezone: {
      type: TimezoneType,
      args: { offset: { type: GraphQLString }},
      resolve(parent, args, { db }) {
        db.collection('timezones').find({ args.offset }, (err, docs) => {
          assert.equal(null, err);
          assert.equal(1, docs.length);
        });
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery
});

export default schema;
