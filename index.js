var Botmaster = require('botmaster');
var request = require('request');

var slackSettings = {
  credentials: {
    clientId: '3360347582.109223727493',
    clientSecret: '0c3a693e6b67520aa3290905b61ed186',
    verificationToken: 'zRzmLnabeqUyWXzSbjFhPYyL'
  },
  webhookEndpoint: '/webhookd24sr34se',
  storeTeamInfoInFile: true,
};

var botsSettings = [{ slack: slackSettings }];

var botmaster = new Botmaster({ botsSettings });

botmaster.on('update', function(bot, update){
  if (!update.message.text.includes("<@U3724V0JX>")) {
    return;
  }
  else if (update.message.text.includes("Hi <@U3724V0JX>")) {
    bot.reply(update, "Hi there! What kind of food would you like?");
  }
  else {
    bot.reply(update, "Here are your top five choices:");
    var city = update.message.text.substring(13);
    getRestaurants("61", city, bot, update);
  }
});

function getRestaurants(locationID, cuisine, bot, update){
  var options = {
    url: 'https://developers.zomato.com/api/v2.1/search?count=5&entity_type=city&entity_id='+locationID+'&q='+cuisine,
    headers: {
      'user-key': 'a01bc12b4d4ed181497ca6d155c38015',
      'Accept': 'application/json'
    }
  };
  request(options, function(error, response, body) {
      body = JSON.parse(body);
      var restaurants = body.restaurants.map(function(element){
        var name = element.restaurant.name;
        var location = element.restaurant.location.address;
        var url = element.restaurant.url;
        return "<"+url+"|"+name+" - "+location+">";
      });
      restaurants.forEach(function(element){
        bot.reply(update, element);
      });
  });
}
