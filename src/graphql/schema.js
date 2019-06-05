import { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';

const assert = require('assert');
const TimezoneType = new GraphQLObjectType({
  name: 'Timezone',
  fields: () => ({
    // _id: { type: GraphQLString },
    // no: { type: GraphQLString },
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
        console.log('ppppppppppppppppppppppppppppppppppp');
        let col = db.collection('timezones');
        // console.log(col);
        // console.log(db);
        console.log('               ', new Date());
        const docs = await col.find({offset}).toArray();
        console.log('docs ', docs);
        // return col.find({"offset":"UTC+08:45"}).toArray((err, docs) => {
        //   assert.equal(null, err);
        //   assert.equal(1, docs.length);
        // });
        return docs[0];


        // return timezones[0];
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery
});

export default schema;
