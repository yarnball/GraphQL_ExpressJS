var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

const { createRelation, createPerson, getPeople, getPerson, getApiAction } = require('./data');

const schema = buildSchema(`
  type getApiAction {
    Model_Name: String!
    Model_ID: String!
  }

  type Person {
    id: ID!
    name: String!
    age: Int
    friend: Person
  }
  
  type Query {
    hello: String
    people: [Person]
    person (id: ID!): Person
    getApi (make: String!): [getApiAction]
  }
  type Mutation {
    createPerson(name: String!, age: Int): Person
    createRelation(personId: Int, friendId: Int): Person
  }  
`);
// USING exclimation means requied field (EG id:ID!)
// The root provides a resolver function for each API endpoint
const root = {
  // Queries
  getApi: args => getApiAction(args),
  hello: () => 'Hello world!',
  people: () => getPeople(),
  person: ({ id }) => getPerson(id),
  // Mutations
  createPerson: ({ name, age }) => createPerson(name, age),
  createRelation: ({personId, friendId}) => createRelation(personId, friendId)
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


// query people{
//   people {
//     name
//     age
//   }
// }
// Generic Query
// Use shift+ space to auto compelete available fields


// mutation {
//   createPerson(name: "SuperMan", age: 5000) {
//     id
//     name
//   }
// }

// Above creates a new person entry, and returns the id & name of the person created


// mutation {
//   createRelation(personId: 1, friendId: 2) {
//     name
//   }
// }

// Make sure the ID's actually exist