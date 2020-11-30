import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';

const assert = require('assert');

const TimezoneType = new GraphQLObjectType({
  name: 'Timezone',
  fields: () => ({
    offset: { type: GraphQLString },
    places: { type: GraphQLList(PlaceType) }
  })
});

const PlaceType = new GraphQLObjectType({
  name: 'Place',
  fields: () => ({
    name: { type: GraphQLString },
    flag: { type: GraphQLString },
    offsets: { type: GraphQLList(GraphQLString) }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    timezone: {
      type: TimezoneType,
      args: { offset: { type: GraphQLString }},
      async resolve(parent, { offset }, db, info) {
        console.log("eeeeeeee", process.version);
        const ss = info.fieldNodes[0].selectionSet.selections;
        // const ss0 = ss[0].name.value ?? '';
        // const ss1 = ss[1].selectionSet.selections[0].name.value ?? '';
        // const ss2 = ss[1].selectionSet.selections[1].name.value ?? '';
        // console.log('ooooooo:', ss0 + ss1 + ss2);
        const params = {
          TableName: 'demo',
          ProjectionExpression: 'place',
          KeyConditionExpression: '#os = :v1',
          ExpressionAttributeValues: {
            ':v1': offset,
          },
          ExpressionAttributeNames: {
            '#os': 'offset',
          },
        };

        // try {
        //   const docs = await db
        //     .collection('timezones')
        //     .find({ offset })
        //     .toArray();
        //   assert.equal(1, docs.length);
        //   return docs[0];
        // } catch (err) {
        //   return err;
        // }

        const prom = db.query(params).promise();

        const d = await prom;
        console.log('dddd: ', d);
        return d;
          // .then()
          // .catch();

      }
    },
    place: {
      type: PlaceType,
      args: { name: { type: GraphQLString }},
      async resolve(parent, { name }, db) {
        try {
          const docs = await db
            .collection('timezones')
            .find({ 'places.name': name })
            .project({ offset: 1, _id: 0 })
            .toArray();
          const flag = await db
            .collection('timezones')
            .find({ 'places.name': name })
            .project({ 'places.flag.$': 1, _id: 0 })
            .toArray();
          return {
            name,
            flag: flag[0].places[0].flag,
            offsets: [...docs.map(o => o.offset)].sort((a, b) => a.localeCompare(b))
          };
        } catch (err) {
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
