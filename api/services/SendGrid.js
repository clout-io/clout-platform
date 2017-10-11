var helper = require('sendgrid').mail;
var sg = require('sendgrid')(sails.config.sendgrid.apiKey);

module.exports.send = function (toEmail, subject, fromEmail, content) {
  if (sails.config.environment.toLowerCase() === "development") {
    return true;
  }
  if (sails.config.environment.toLowerCase() === "test") {
    return true;
  }
  var mail = new helper.Mail(
    {
      "email": fromEmail
    },
    subject,
    {
      "email": toEmail
    }, {
      "value": content,
      type: 'text/plain'
    });
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });
  sg.API(request, function (error, response) {
    if (error) {
    }
  });
}
