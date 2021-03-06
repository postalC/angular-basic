'use strict';

angular.module('confusionApp')

.controller('MenuController', ['$scope', 'menuFactory', function($scope,
  menuFactory) {

  $scope.tab = 1;
  $scope.filtText = '';
  $scope.showDetails = false;
  $scope.showMenu = false;
  $scope.message = "Loading ...";

  // -- Get Menu Dishes --
  $scope.dishes = menuFactory.getDishes().query(function(response) {
      $scope.dishes = response;
      $scope.showMenu = true;
    },
    function(response) {
      $scope.message = "Error: " + response.status + " " + response.statusText;
      $scope.showMenu = false;
    });

  $scope.select = function(setTab) {
    $scope.tab = setTab;

    if (setTab === 2) {
      $scope.filtText = "appetizer";
    } else if (setTab === 3) {
      $scope.filtText = "mains";
    } else if (setTab === 4) {
      $scope.filtText = "dessert";
    } else {
      $scope.filtText = "";
    }
  };

  $scope.isSelected = function(checkTab) {
    return ($scope.tab === checkTab);
  };

  $scope.toggleDetails = function() {
    $scope.showDetails = !$scope.showDetails;
  };
}])

.controller('ContactController', ['$scope', function($scope) {

  $scope.feedback = {
    mychannel: "",
    firstName: "",
    lastName: "",
    agree: false,
    email: ""
  };

  var channels = [{
    value: "tel",
    label: "Tel."
  }, {
    value: "Email",
    label: "Email"
  }];

  $scope.channels = channels;
  $scope.invalidChannelSelection = false;

}])

.controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope,
  feedbackFactory) {

  $scope.sendFeedback = function() {

    if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
      $scope.invalidChannelSelection = true;
      console.log('incorrect');
    } else {
      $scope.invalidChannelSelection = false;
      console.log($scope.feedback);
      feedbackFactory.getFeedbacks().save($scope.feedback);

      $scope.feedbackForm.$setPristine();
      $scope.feedback = {
        mychannel: "",
        firstName: "",
        lastName: "",
        agree: false,
        email: ""
      };
      console.log($scope.feedback);
      $scope.$parent.feedback = $scope.feedback;
    }
  };
}])

.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory',
  function($scope, $stateParams, menuFactory) {

    $scope.dish = {};
    $scope.showDish = false;
    $scope.message = "Loading ...";
    $scope.dish = menuFactory.getDishes().get({
      id: parseInt($stateParams.id, 10)
    }).$promise.then(
      function(response) {
        $scope.dish = response;
        $scope.showDish = true;
      },
      function(response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
      }
    );
  }
])

.controller('DishCommentController', ['$scope', 'menuFactory', function($scope,
  menuFactory) {

  $scope.inputs = {
    rating: 5,
    comment: "",
    author: "",
    date: ""
  };

  $scope.submitComment = function() {

    $scope.inputs.rating = parseInt($scope.inputs.rating);
    $scope.inputs.date = new Date().toISOString();
    console.log($scope.inputs);

    $scope.dish.comments.push($scope.inputs);
    // -- Update Dishes --
    menuFactory.getDishes().update({
      id: $scope.dish.id
    }, $scope.dish);

    $scope.commentForm.$setPristine();

    $scope.inputs = {
      rating: 5,
      comment: "",
      author: "",
      date: ""
    };
  };
}])

// implement the IndexController and About Controller here


.controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory',
  function($scope,
    menuFactory, corporateFactory) {
    // Get Dish
    $scope.dish = {};
    $scope.showDish = false;
    $scope.showPromote = false;
    $scope.showLeader = false;
    $scope.message = "Loading ...";
    $scope.dish = menuFactory.getDishes().get({
      id: 0
    }).$promise.then(
      function(response) {
        $scope.dish = response;
        $scope.showDish = true;
      },
      function(response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
        $scope.showDish = false;
      }
    );

    // Get promotion
    $scope.promotion = menuFactory.getPromotions().get({
      id: 0
    }).$promise.then(
      function(response) {
        $scope.promotion = response;
        $scope.showPromote = true;
      },
      function(response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
        $scope.showPromote = false;
      }
    );

    // Get Leader - Id == 3
    $scope.leader = corporateFactory.getLeaders().get({
      id: 3
    }).$promise.then(
      function(response) {
        $scope.leader = response;
        $scope.showLeader = true;
      },
      function(response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
        $scope.showLeader = false;
      }
    );
  }
])

.controller('AboutController', ['$scope', 'corporateFactory', function($scope,
  corporateFactory) {

  $scope.showLeaders = false;
  $scope.leaders = corporateFactory.getLeaders().query(function(response) {
      $scope.leaders = response;
      $scope.showLeaders = true;
    },
    function(response) {
      $scope.message = "Error: " + response.status + " " + response.statusText;
      $scope.showLeaders = false;
    });

}]);
