import '../imports/api/beacons.js';
import '../imports/api/users.js';
import '../imports/api/kiosks.js';

import { Beacons } from '../imports/api/beacons.js'

// Setup the API route for receiving RSSI updates
var bodyParser = Meteor.npmRequire( 'body-parser' );
Picker.middleware( bodyParser.json() );

var postRoutes = Picker.filter(function(req, res) {
  return req.method == "POST";
});

postRoutes.route('/report/:id', function(params, req, res, next) {
  let data = req.body;
  let eventTime = new Date(data.timestamp*1000);
  let kioskId = params.id;
  handleRssiReport(kioskId, eventTime, data.scan);

  res.setHeader( 'Content-Type', 'application/json' );
  res.statusCode = 200;
  res.end(JSON.stringify({success: true}));
});

function handleRssiReport(kioskId, eventTime, scanList){
  if (scanList == null || scanList.length == 0){
    return;
  }

  scanList.forEach(function(scan){
    console.log(kioskId, eventTime, scan);

    let beacon = Beacons.findOne({mac: scan.addr});
    if ( beacon == null){
      Beacons.insert({
        name: "NA",
        createdAt: new Date(),
        mac: scan.addr,
        uuid: "NA",
        isBeek: false,
        rssi: scan.rssi
      });
    }else{
      Beacons.update(beacon._id, { $set: {
        rssi: scan.rssi,
        updatedAt: eventTime
      } } );
    }
  });
}