const { GraphQLList, GraphQLObjectType, GraphQLString } = require("graphql");

const { OrderBookEntryType } = require("./order_book_entry");

const OrderBookType = new GraphQLObjectType({
  name: "OrderBook",
  fields: {
    lastUpdateId: {
      type: GraphQLString,
    },
    bids: {
      type: new GraphQLList(OrderBookEntryType),
    },
    asks: {
      type: new GraphQLList(OrderBookEntryType),
    },
  },
});

module.exports = {
  OrderBookType,
};
