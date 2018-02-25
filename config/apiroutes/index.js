const IcoRoutes = require('./ico.route');
const CoinRoutes = require('./coin.route');
const CommentRoutes = require('./comment.route');
const FollowRoutes = require('./follow.route');
const ImgRoutes = require('./img.route');
const LikeRoutes = require('./like.route');
const PostRoutes = require('./post.route');
const PressRoutes = require('./press.route');
const TagRoutes = require('./tag.route');
const TrendingRoutes = require('./trending.route');
const UrlRoutes = require('./url.route');
const UserRoutes = require('./user.route');
const VoteRoutes = require('./vote.route');
const CountryRoutes = require('./country.route');
const PaymentRoutes = require('./payment.route');

let routes = [
    { method: "GET", path: "/altcoins/sync", target: "AltcoinController.sync" },
    { method: "GET", path: "/icos/sync/:type", target: "IcoController.sync" },
    { method: "GET", path: "/icos/syncphoto/", target: "IcoController.syncPhoto" },
    { method: "GET", path: "/altcoins/syncphoto/", target: "AltcoinController.syncPhoto" },
    { method: "GET", path: "/altcoins/synchistory/", target: "AltcoinController.syncHistory" },
    {
        method: "GET",
        path: "/press/sync/",
        target: {
            controller: 'PressController',
            action: 'sync',
            skipAssets: 'true',
            swagger: {
                methods: ['GET'],
                summary: '',
                description: '',
                produces: [
                    'application/json'
                ],
                tags: [],
                responses: {
                    '200': {
                        description: ''
                    }
                },
                parameters: [
                    { in: "query", name: "url" }
                ]
            }
        }

    },


];

routes = routes.concat(
    IcoRoutes.routes,
    CoinRoutes.routes,
    CommentRoutes.routes,
    FollowRoutes.routes,
    ImgRoutes.routes,
    LikeRoutes.routes,
    PostRoutes.routes,
    PressRoutes.routes,
    TagRoutes.routes,
    TrendingRoutes.routes,
    UrlRoutes.routes,
    UserRoutes.routes,
    VoteRoutes.routes,
    CountryRoutes.routes,
    PaymentRoutes.routes
);

let prefix = "/api/v1";

let routeObject = {};
for (let router of routes) {
    routeObject[`${router.method} ${prefix}${router.path}`] = router.target
}


routeObject["GET /admin/login"] = "AdminController.login";
routeObject["POST /admin/login"] = "AdminController.login";
routeObject["GET /activate"] = "SignUpController.activate";
routeObject["GET /image/ico/:imgName"] = "ImgController.getIcoPhoto";
routeObject["GET /image/:imgName"] = "ImgController.getPhoto";
routeObject["GET /to"] = "UrlController.redirect";


module.exports.routes = routeObject;