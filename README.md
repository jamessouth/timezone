# timezones

#### React, Node, GraphQL, MongoDB
-------------------------------------------------------------------------------

##### Heroku nuked the MongoDB add-on I was using and the closest AWS analogue, DocumentDB, doesn't have a free tier. DynamoDB has a free tier, so I pulled the data from Mongo into JSON and seeded a Dynamo table from there. I started fixing the app to use Dynamo and that went fine, except GraphQL expects the data in a certain shape, which I had changed. So while I could keep tinkering, or drop GraphQL, to fix it, I have decided that this app isn't really cool enough to justify the additional effort and that I have more important projects that should be worked on instead, so I think this should be abandoned. I learned a lot and I'm excited to keep going with DynamoDB, but I have taken this offline at Heroku.
-------------------------------------------------------------------------------

Map image by Pixabay user [Pete Linforth](https://pixabay.com/users/TheDigitalArtist-202249/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4181261)
