'use strict';

angular.module('confusionApp')
  .constant("baseURL", "http://localhost:3000/")
  .service('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {

    // Get All Dishes
    this.getDishes = function() {
      //return $http.get(baseURL + "dishes");
      return $resource(baseURL + "dishes/:id", null, {
        'update': {
          method: 'PUT'
        }
      });
    };

    // Get All Promtions
    this.getPromotions = function() {
      return $resource(baseURL + "promotions/:id", null, {
        'update': {
          method: 'PUT'
        }
      });
    };
    // End menuFactory Service
  }])

.service('corporateFactory', ['$resource', 'baseURL', function($resource,
  baseURL) {

  // Get All Leaders
  this.getLeaders = function() {
    return $resource(baseURL + "leadership/:id", null, {});
  };
  // End corporateFactory Service
}])

.service('feedbackFactory', ['$resource', 'baseURL', function($resource,
    baseURL) {

    // Get All Leaders
    this.getFeedbacks = function() {
      return $resource(baseURL + "feedback/:id", null, {
        'save': {
          method: 'POST'
        }
      });
    };
    // End feedbackFactory Service
  }])
  // End Angular Module
;
