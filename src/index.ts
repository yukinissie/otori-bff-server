import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Book, Query } from './generated/graphql';

const typeDefs = `#graphql
  enum Status {
    UNREAD
    READING
    READED
  }

  type Book {
    title: String
    author: String
    status: Status
  }

  type Query {
    books: [Book!]!
  }
`;

enum Status {
  Unread = 'UNREAD',
  Reading = 'READING',
  Readed = 'READED',
}

const books: Book[] = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
    status: Status.Reading,
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
    status: Status.Unread,
  },
];

const bookResolver: () => Book[] = () => books;

const resolvers = {
  Query: {
    books: bookResolver,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
