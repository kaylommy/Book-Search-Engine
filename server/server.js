const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

// Apollo Server and Middleware
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth'); 
const { typeDefs, resolvers } = require('./schemas')

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const startApolloServer = async () => {
await server.start();
server.applyMiddleware({ app })
};

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});

startApolloServer();