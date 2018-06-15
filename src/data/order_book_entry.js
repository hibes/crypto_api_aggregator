const { GraphQLList, GraphQLObjectType, GraphQLString } = require("graphql");
const OrderBookEntryType = new GraphQLObjectType({
  name: "OrderBookEntry",
  fields: {
    price: {
      type: GraphQLString,
    },
    quantity: {
      type: GraphQLString,
    },
  },
});

module.exports = {
  OrderBookEntryType,
};
