const { GraphQLList, GraphQLObjectType, GraphQLString } = require("graphql");

const { OrderBookType } = require("./order_book");

const OrderBookSetType = new GraphQLObjectType({
  name: "OrderBookSet",
  fields: {
    binance: {
      type: OrderBookType,
    },
    bittrex: {
      type: OrderBookType,
    },
  },
});

module.exports = {
  OrderBookSetType,
};
