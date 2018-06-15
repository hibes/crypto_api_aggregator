# Crypto Aggregator

Primarily as an exercise in using GraphQL, this service is intended to aggregate cryptocurrency APIs into a common format, allowing for pulling information down from any one or several of the available cryptocurrency APIs.

## Features

### Order Books

You can get both `binance` and `bittrex` order books for Litecoin and Bitcoin by sending the following query:

```
{
  order_books (id: "LTCBTC") {
    binance {
      bids {
        price
        quantity
      }
      asks {
        price
        quantity
      }
    }
    bittrex {
      bids {
        price
        quantity
      }
      asks {
        price
        quantity
      }
    }
  }
}
```

Since this query is stored in example/order_books_query.gql, you can execute the query like so:

```
curl --get --data-e/order_books_query.gql http://localhost:3000/graphql
```
