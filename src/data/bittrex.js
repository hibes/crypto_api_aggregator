const { GraphQLList, GraphQLObjectType, GraphQLString } = require("graphql");

const { OrderBookType } = require("./order_book");

const baseUri = "https://bittrex.com";

const orderBookEndpoint = "/api/v1.1/public/getorderbook";

const symbolTranslator = symbol =>
  `${symbol.substr(3, 3)}-${symbol.substr(0, 3)}`;

const getOrderBook = rp => symbol => {
  const uri = `${baseUri}${orderBookEndpoint}?market=${symbolTranslator(
    symbol
  )}&type=both`;

  return rp({
    uri,
    resolveWithFullResponse: true,
    json: true,
  });
};

const fixOrderBookEntry = orderBookEntry => ({
  quantity: orderBookEntry.Quantity,
  price: orderBookEntry.Rate,
});

const formatBody = body =>
  Object.assign({}, body, {
    result: undefined,
    bids: body.result.buy.map(fixOrderBookEntry),
    asks: body.result.sell.map(fixOrderBookEntry),
  });

module.exports = {
  formatBody,
  getOrderBook,
};
