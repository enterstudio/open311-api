var models = require('../models');
var express = require('express');
var util = require('../helpers/util.js');
var js2xmlparser = require("js2xmlparser");
var objectAssign = require('object-assign');
var router = express.Router();
var env = process.env.NODE_ENV || "development";

var getServiceList = function(req, res) {
  if (req.query.jurisdiction_id) {

  }
  var skeleton = {
    services: [{
      "service_code": "HGW1",
      "service_name": "Huiselijk geweld",
      "description": "Vermoeden van huiselijk geweld. Zal worden voorgelegd aan hulpverleners.",
      "metadata": true,
      "type": "realtime",
      "keywords": "geweld, huiselijk, relationeel, overlast",
      "group": "overlast"
    }, {
      "service_code": "ZVL1",
      "metadata": true,
      "type": "realtime",
      "keywords": "vuil, rommel, smerig",
      "group": "omgeving",
      "service_name": "Zwerfvuil",
      "description": "Constatering van vervuiling in de openbare ruimte"
    }, {
      "service_code": "FPV1",
      "metadata": true,
      "type": "realtime",
      "keywords": "parkeren, auto, stoep",
      "group": "omgeving",
      "service_name": "Foutief geparkeerde auto",
      "description": "Constatering van onjuist geplaatste voertuigen"
    }]
  };
  switch (req.params.format) {
    case 'xml':
      var final = js2xmlparser.parse("services", skeleton, {
        arrayMap: {
          services: "service"
        }
      });
      res.set('Content-Type', 'text/xml');
      res.send(final);
      break;
    default:
      res.json(skeleton.services);
  }
  /**
   * The numbers represent the HTTP status code returned for each error type:
   * 404 - jurisdiction_id provided was not found (specify in error response)
   * 400 - jurisdiction_id was not provided (specify in error response)
   * 400 - General service error (Anything that fails during service list processing. The client will need to notify us)
   */

};

var getServiceDefinition = function(req, res) {
  var skeleton = {
    service_definition: {
      "service_code": "FPV1",
      "attributes": [{
        "variable": true,
        "code": "WHISHETN",
        "datatype": "singlevaluelist",
        "required": true,
        "datatype_description": null,
        "order": 1,
        "description": "Hoe ernstig is de vervuiling?",
        "values": [{
          "key": 1,
          "name": "Klein, zelf verwijderd"
        }, {
          "key": 2,
          "name": "Matig, gemeentewerker gewenst"
        }, {
          "key": 3,
          "name": "Ernstig, reinigingsploeg nodig"
        }]
      }]
    }

  };
  if (req.query.jurisdiction_id) {
  }
  switch (req.params.format) {
    case 'xml':
      var final = js2xmlparser.parse("service_definition", skeleton ,{
        arrayMap: {
          values: "value",
          attributes: "attribute"
        }
      });
      res.set('Content-Type', 'text/xml');
      res.send(final);
      break;
    default:
      res.json(skeleton.service_definition);
  }
  /**
   * The numbers represent the HTTP status code returned for each error type:
   * 404 - jurisdiction_id provided was not found (specify in error response)
   * 400 - jurisdiction_id was not provided (specify in error response)
   * 400 - General service error (Anything that fails during service list processing. The client will need to notify us)
   */

};

var postServiceRequest = function(req, res) {
  if (req.params.jurisdiction_id) {
  }
  var skeleton = [{
    "service_request_id": -1,
    "service_notice": "This is a dummy, not implemented",
    "account_id": null
  }];
  switch (req.params.format) {
    case 'xml':
      var final = js2xmlparser.parse("service_request", skeleton);
      res.set('Content-Type', 'text/xml');
      res.send(final);
      break;
    default:
      res.json({});
  }
  /**
   * The numbers represent the HTTP status code returned for each error type:
   * 404 - jurisdiction_id provided was not found (specify in error response)
   * 400 - jurisdiction_id was not provided (specify in error response)
   * 400 - General service error (Anything that fails during service list processing. The client will need to notify us)
   */

};

router.route('/api/v1/services.:format').get(getServiceList);
router.route('/api/v1/services/:service_code.:format').get(getServiceDefinition);
router.route('/api/v1/request.:format').post(postServiceRequest);
module.exports = router;
