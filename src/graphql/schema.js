/* eslint-disable no-console */
import { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';

const assert = require('assert');
const TimezoneType = new GraphQLObjectType({
  name: 'Timezone',
  fields: () => ({
    offset: { type: GraphQLString },
    places: { type: GraphQLList(GraphQLString) }
  })
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    timezone: {
      type: TimezoneType,
      args: { offset: { type: GraphQLString }},
      async resolve(parent, { offset }, db) {
        try {
          // throw new Error('arrrg');
          // let docs;

          const col = db.collection('timezones');
          const docs = await col.find({ offset }).toArray();
          console.log('dddddd', docs);
          assert.equal(1, docs.length);
          return docs[0];



        } catch (err) {
          console.log('sch', err.stack);
          return err;
        }
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery
});

export default schema;
