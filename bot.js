var axios = require('axios');

var { CLIENT_EVENTS, RTM_EVENTS, RtmClient, WebClient } = require('@slack/client');

<<<<<<< HEAD
var bot_token = 'xoxb-213951919538-KRIoEVWljTojdrAfOESAnA3a';
=======
var bot_token = 'xoxb-213951919538-bJriEM0KyuH5n8DTzVXelHVO';
>>>>>>> carokun

var rtm = new RtmClient(bot_token);

var web = new WebClient(bot_token);

var Models = require('./models/models');
var User = Models.User;
<<<<<<< HEAD

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
    console.log(rtmStartData.self.name);
})

let messageInProgess = false;

rtm.on(RTM_EVENTS.MESSAGE, (msg) => {
=======
var Task = Models.Task;
var Meeting = Models.Meeting;

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
<<<<<<< HEAD
    console.log(rtmStartData.self.name);
=======
  console.log(rtmStartData.self.name);

>>>>>>> d8e295320cac22e2c0ff55ae84edf99e70b283a6
})

var toStore = {};

rtm.on(RTM_EVENTS.MESSAGE, (msg) => {
<<<<<<< HEAD
>>>>>>> carokun
    //when yes or no is clicked reset messageInProgess to be false
    //FIX THIS
    if (msg.message && msg.message.username === 'SachaTheScheduler') {
        messageInProgess = false;
<<<<<<< HEAD
=======
    }
=======
  //ensure the bot will ignore the message if it is not sent via DM
  var dm = rtm.dataStore.getDMByUserId(msg.user);
  if (!dm || dm.id !== msg.channel || msg.type !== 'message') {
    return;
  }

  //check that the user has gone through authentication
  User.findOne({slackId: msg.user})
  .then(function(user) {
    if (!user) {
      return new User({
        slackId: msg.user,
        slackDmId: msg.channel
      }).save();
>>>>>>> carokun
    }
    user.pendingRequest = '';
    user.save()
    return user;
  })
  .then(function(user){
    if (!user.google) {
      rtm.sendMessage(`Hello!
        This is scheduler bot. In order to schedule things for you, I need
        access to your google calendar.
>>>>>>> d8e295320cac22e2c0ff55ae84edf99e70b283a6

    //ensure the bot will ignore the message if it is not sent via DM
    var dm = rtm.dataStore.getDMByUserId(msg.user);
    if (!dm || dm.id !== msg.channel || msg.type !== 'message') {
        return;
    }

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> carokun
    //check that the user has gone through authentication
    User.findOne({slackId: msg.user})
    .then(function(user) {
        if (!user) {
            return new User({
                slackId: msg.user,
                slackDmId: msg.channel
            }).save();
        }
        return user;
    })
    .then(function(user){
        if (!user.google) {
            rtm.sendMessage(`Hello!
                This is scheduler bot. In order to schedule things for you, I need
                access to your google calendar.

                Please visit http://d31adc8e.ngrok.io/connect?user=${user._id} to setup Google Calendar`, msg.channel);
                return;
            }

            if (messageInProgess) {
                rtm.sendMessage('Please complete previous request!', user.slackDmId);
                return;
            }
            axios.get('https://api.api.ai/api/query', {
                params: {
                    v: 20150910,
                    lang: 'en',
                    timezone: '2017-07-17T14:01:03-0700',
                    query: msg.text,
                    sessionId: user.slackId
                },
                headers: {
                    Authorization: 'Bearer 30cb48540bc14e0ab93dd24392ec801c'
                }
            })
            .then((res) => {
                // check that action is complete
                if (res.data.result.actionIncomplete) {
                    rtm.sendMessage(res.data.result.fulfillment.speech, user.slackDmId)
                    return;
                } else if (res.data.result.action === "remind.add") {
                    user.pendingRequest = JSON.stringify(res.data.result);
                    console.log(user.pendingRequest);
                    user.save()
                    .then(function(user) {
                        web.chat.postMessage(msg.channel, '', {
                            "attachments": [
                                {
                                    "fallback": "fallback",
                                    "title": res.data.result.fulfillment.speech,
                                    "callback_id": msg.user,
                                    "color": "#3AA3E3",
                                    "attachment_type": "default",
                                    "actions": [
                                        {
                                            "name": "Yes",
                                            "text": "Yes",
                                            "type": "button",
                                            "value": "good"
                                        },
                                        {
                                            "name": "No",
                                            "text": "No",
                                            "type": "button",
                                            "value": "bad"
                                        }
                                    ]
                                }
                            ]
                        });
                    })

                }
            })
            .catch((err) => {
                console.log(err);
            })

        })
    })
<<<<<<< HEAD
=======
=======
    if (user.pendingRequest && JSON.parse(user.pendingRequest).action) {
      rtm.sendMessage('Please complete previous request!', user.slackDmId);
      return;
    }
    msg.text = msg.text.replace(/(<@)(\w+)(>)/g, function(a, b, userId) {
      const name = rtm.dataStore.getUserById(userId).profile.first_name
      toStore[name] = a
      return name + ', ';
    })
    axios.get('https://api.api.ai/api/query', {
      params: {
        v: 20150910,
        lang: 'en',
        timezone: '2017-07-17T14:01:03-0700',
        query: msg.text,
        sessionId: user.slackId
      },
      headers: {
        Authorization: 'Bearer 30cb48540bc14e0ab93dd24392ec801c'
      }
    })
    .then((res) => {
      // check that action is complete
      if (res.data.result.actionIncomplete) {
        rtm.sendMessage(res.data.result.fulfillment.speech, user.slackDmId)
        return;
      } else if (res.data.result.action === "remind.add") {
        user.pendingRequest = JSON.stringify(Object.assign({}, (res.data.result).parameters, {action: 'remind.add', userId: user._id}));
        user.save()
        .then(function(user) {
          web.chat.postMessage(msg.channel, '', {
            "attachments": [
              {
                "fallback": "fallback",
                "title": res.data.result.fulfillment.speech,
                "callback_id": msg.user,
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                  {
                    "name": "Yes",
                    "text": "Yes",
                    "type": "button",
                    "value": "good"
                  },
                  {
                    "name": "No",
                    "text": "No",
                    "type": "button",
                    "value": "bad"
                  }
                ]
              }
            ]
          })
          .catch(function(err) {
            console.log(err);
          })
        })
      } else if (res.data.result.action === "meeting.add") {
        user.pendingRequest = JSON.stringify(Object.assign({}, (res.data.result).parameters, {action: 'meeting.add', conversions: toStore}));
        user.save()
        .then(function(user) {
          let speech = res.data.result.fulfillment.speech;
          let conversions = JSON.parse(user.pendingRequest).conversions;
          for (var name in conversions) {
            speech = speech.replace(name, conversions[name]);
          }
          web.chat.postMessage(msg.channel, '', {
            "attachments": [
              {
                "fallback": "fallback",
                "title": speech,
                "callback_id": msg.user,
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                  {
                    "name": "Yes",
                    "text": "Yes",
                    "type": "button",
                    "value": "good"
                  },
                  {
                    "name": "No",
                    "text": "No",
                    "type": "button",
                    "value": "bad"
                  }
                ]
              }
            ]
          });
        })
      } else {
        rtm.sendMessage(res.data.result.fulfillment.speech, user.slackDmId)
      }
    })
    .catch((err) => {
      console.log(err);
    })
  })
})
>>>>>>> d8e295320cac22e2c0ff55ae84edf99e70b283a6
>>>>>>> carokun

    rtm.start();
