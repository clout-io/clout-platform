/**
 * PressController
 *
 * @description :: Server-side logic for managing presses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {

    var dummy = {
      "message": "Data retrieved successfully",
      "data": [
        {
          id: "press_fs121wqwdazxzcgifij",
          title: "Closing the Curtains On Segwit2x and the Following Aftermath",
          description: "In less than eight days Bitcoin network market participants were ready for the planned Segwit2x fork, canceled yesterday. Now cryptocurrency proponents everywhere are expressing opinions about the Segwit2x plan in general, and the working group’s decision to give up on forking the protocol. Also Read: Openbazaar Sees a Variety of New Vendors After Privacy Enhancements Segwit2x",
          pubDate: "Thu, 09 Nov 2017 06:36:37 +0000",
          image: "https://news.bitcoin.com/wp-content/uploads/2017/11/hhgfdrdrdrdghgh-768x768.jpg",
          link:"https://news.bitcoin.com/millennials-are-big-on-bitcoin-but-over-65s-not-so-sure/"
        }
      ],
      "meta": {
        "page": 1,
        "perPage": 20,
        "previousPage": false,
        "nextPage": 2,
        "pageCount": 64,
        "total": 1265
      }
    };

    return res.json(dummy)
  }

};

