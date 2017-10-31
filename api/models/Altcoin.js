/**
 * Altcoin.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    "id": {
      type: 'string',
      unique: true,
      primaryKey: true
    },
    "name": {
      type: 'string'
    },
    "symbol": {
      type: 'string'
    },
    "rank": {
      type: 'integer'
    },
    "price_usd": {
      type: 'float'
    },
    "price_btc": {
      type: 'float'
    },
    "24h_volume_usd": {
      type: 'string'
    },
    "market_cap_usd": {
      type: 'string'
    },
    "available_supply": {
      type: 'string'
    },
    "total_supply": {
      type: 'string'
    },
    "percent_change_1h": {
      type: 'float'
    },
    "percent_change_24h": {
      type: 'float'
    },
    "percent_change_7d": {
      type: 'float'
    },

    history_sync: {
      type: "boolean",
      defaultsTo: false
    },

    priceHistory: {
      collection: 'AltcoinPrice',
      via: 'altcoin'
    },

    followByUsers:{
      collection: 'user',
      via: 'altcoin',
      through: 'follow'
    }
  }
};

