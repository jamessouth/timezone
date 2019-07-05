# timezones

#### Very much a work-in-progress.  Hasn't been styled much yet.  Not even sure what all it is going to do.  Just playing and building with TDD, React, Node, GraphQL, MongoDB, PouchDB.
-------------------------------------------------------------------------------

The determined programmer will be able to re-enable it if they want, but right now, for dev purposes, hitting the Wikipedia API for the time zone data is disabled in favor of using an uncommitted script file to stream said data to another uncommitted file on my local.  When needed, I stream from this file to seed the DB and go from there.

Latest additions:

*  Replaced the `<textarea>` element used for entering GraphQL queries with a preformatted code block with time zone interpolated
*  Since the user can no longer issue empty, malformed, or other erroneous queries, revised error handling
*  When the DB is seeded, I now immediately read from it to gather the UTC offsets and send them to the front-end to populate a `<select>` dropdown menu
*  The user picks from this dropdown and their choice is interpolated in the prewritten query
*  Added some styles to the preformatted code block


1.  ~~Download and `npm install` this to run it.~~

2.  ~~I'm still developing so for the front-end just run `npm run dev:front` to start webpack-dev-server, then open a browser on `localhost:3100`.~~

3.  ~~For the back-end, open another terminal and run `npm run dev:back`.  This will start `nodemon` watching the server script.  It will beep.~~

4.  ~~Optionally, spin up a MongoDB instance.  You can also, if you want, open up a Mongo shell to see the data in the `tzs` database, `timezones` collection.~~

5.  ~~Click the `data` button to hit Wikipedia's REST API for a table of UTC offsets from the [time zone](https://en.wikipedia.org/wiki/Time_zone) page.~~

6.  ~~The response will be piped through a series of streams, transforming each line in the table into an object that (so far) includes the offset and a list of places in that time zone.~~

7.  ~~The last stream in the pipeline is a writable stream that seeds a NoSQL database.  If you started up your MongoDB instance, it will use that and you can now view the data in your Mongo shell.  Otherwise, for demo purposes, it will fall back to a PouchDB instance.~~

8.  ~~Once the database is seeded, you can issue queries through the front-end.  A GraphQL server is running and will resolve your query with a database lookup.  The result is sent back to the front-end and displayed.~~

9.  ~~I'm working on the GraphQL schema.  Right now it only handles requests for the places in a given time zone, styled like this:~~

```
{
  timezone(offset: "UTC+08:45") {
    places
  }
}
```

10.  That's it so far, thanks for checking it out!
