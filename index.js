var http = require('http');
var Botmaster = require('botmaster');

var messengerSettings = {
  credentials: {
    verifyToken: 'YOUR verifyToken',
    pageToken: 'YOUR pageToken',
    fbAppSecret: 'b276dd7c21168dc3e64a594b7e5d09eb',
  },
  webhookEndpoint: '/webhook1234'
};

var botsSettings = [{ messenger: messengerSettings }];

var botmaster = new Botmaster({ botsSettings });

botmaster.on('update', function(bot, update){
  bot.reply(update, 'Right back at you');
});
