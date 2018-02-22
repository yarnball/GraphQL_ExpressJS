var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    testQuery: String,
    another: String,
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  testQuery: () => {
    return 'Great success!';
  },
  another: () => {
    return 'Intttense';
  },
};

var app = express();

var cors = require('cors')


app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');