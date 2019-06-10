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
          let docs;
          if(db.prefix) {
            console.log('here');
            docs = await db.find({ selector: { offset } });
            console.log(docs);
            // assert.equal(1, docs.docs.length);
            return docs.docs[0];
          } else {
            const col = db.collection('timezones');
            docs = await col.find({ offset }).toArray();
            assert.equal(1, docs.length);
            return docs[0];
          }


        } catch (err) {
          console.log(err.stack);
        }
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery
});

export default schema;
