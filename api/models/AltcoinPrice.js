/**
 * AltcoinPrice.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    timestamp: {
      type: "string"
    },
    market_cap_by_available_supply: {
      type: "string"
    },
    price_btc: {
      type: "string"
    },
    price_usd: {
      type: "string"
    },
    volume_usd: {
      type: "string"
    },
    altcoin: {
      model: 'Altcoin'
    }

  }
};

