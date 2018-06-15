const {
  graphql,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require("graphql");

const binance = require("./data/binance");
const bittrex = require("./data/bittrex");
const rp = require("request-promise");

const { OrderBookSetType } = require("./data/order_book_set");

const insplog = unq => val => {
  console.log(unq);
  console.log(JSON.stringify(val));
  return val;
};

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "root",
    fields: {
      order_books: {
        type: OrderBookSetType,
        args: {
          id: {
            type: GraphQLString,
          },
        },
        resolve: (obj, args, context) => {
          // TODO promiseMap
          return Promise.all([
            binance
              .getOrderBook(rp)(args.id, 5)
              .then(res => res.body)
              .then(binance.formatBody)
              .then(insplog(37)),
            bittrex
              .getOrderBook(rp)(args.id)
              .then(res => res.body)
              .then(bittrex.formatBody)
              .then(insplog(41)),
          ]).then(results => ({
            binance: results.shift(),
            bittrex: results.shift(),
          }));
        },
      },
    },
  }),
});

module.exports = {
  schema,
};
