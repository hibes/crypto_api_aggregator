const { GraphQLList, GraphQLObjectType, GraphQLString } = require("graphql");

const { OrderBookType } = require("./order_book");

const baseUri = "https://api.binance.com";

const orderBookEndpoint = "/api/v1/depth";

const getOrderBook = rp => (symbol, limit) => {
  const uri = `${baseUri}${orderBookEndpoint}?symbol=${symbol}&limit=${limit}`;

  return rp({
    uri,
    resolveWithFullResponse: true,
    json: true,
  });
};

const filterOutEmptyElements = ray => ray.filter(x => x && x.length !== 0);

const toOrderBookEntries = entryRay => ({
  price: entryRay[0],
  quantity: entryRay[0],
});

const formatBody = body => {
  return {
    lastUpdateId: body.lastUpdateId,
    bids: body.bids.map(filterOutEmptyElements).map(toOrderBookEntries),
    asks: body.asks.map(filterOutEmptyElements).map(toOrderBookEntries),
  };
};

module.exports = {
  formatBody,
  getOrderBook,
};
