/**
 * PaymentController
 *
 * @description :: Server-side logic for managing payments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    charge: function(req, res) {
        res.json({ status: 'ok' });
    },
};