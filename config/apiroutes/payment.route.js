module.exports.routes = [{
    method: "GET",
    path: "/payment/charge",
    target: {
        controller: "PaymentController",
        action: "charge",
        swagger: {
            methods: ['GET'],
            summary: 'History info about altcoin',
            description: 'History info about altcoin',
            tags: [
                'Like',
            ],
            parameters: [],
            responses: {
                '200': {
                    description: 'Like is created'
                }
            }
        }
    }
}, ];