var webPush = require('web-push');
var pushSubscription = {
    "endpoint": "https://android.googleapis.com/gcm/send/f4mMhTw-pnY:APA91bGQDqUIsMtUJQT6BfypQrmTILOLeUNQ9oY4K6J1ie3kN2xzetxVTs14WAdkCsacCRYOZIZQZZSnV-K6_AD_MpvzB7dFIK3KmSL8wNM28jC18zIv3MN-aXrgVPT01DfQsrbIX8kK",
    "keys": {
        "p256dh": "BKoF/6Xg8ZTxrxZkDP02FOn3bPcReEy8z8WS2j4eG8uVIODcxs5kfKy4rnJV36iqTI1HqmApIpzuBAAMQEj5mfo=", 
        "auth": "it6DHqYDlm2XP7j2/3a9Fw===="
    }
};
var payload = 'Here is a payload!';
var options = {
    gcmAPIKey: 'AAAAcpL3o5g:APA91bEArlQ-wpB-0PcYYcQ4fZtwc06CialgOO0h3hbG5LtIA0wc9QgjsVyRDzv1lkeuR0qTQ8VAGnH9sROzsJF6PC2LYD5dX7rgPoaZvs_zH1l1NSXWDmh-Bw9F9ZcmiSS8yaNmH7z-',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);
