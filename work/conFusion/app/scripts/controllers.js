'use strict';

angular.module('confusionApp')

.controller('MenuController', ['$scope', 'menuFactory', function($scope,
  menuFactory) {

  $scope.tab = 1;
  $scope.filtText = '';
  $scope.showDetails = false;
  $scope.dishes = menuFactory.getDishes();

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

.controller('FeedbackController', ['$scope', function($scope) {

  $scope.sendFeedback = function() {

    console.log($scope.feedback);

    if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
      $scope.invalidChannelSelection = true;
      console.log('incorrect');
    } else {
      $scope.invalidChannelSelection = false;
      $scope.feedback = {
        mychannel: "",
        firstName: "",
        lastName: "",
        agree: false,
        email: ""
      };
      $scope.feedback.mychannel = "";
      $scope.feedbackForm.$setPristine();
      console.log($scope.feedback);
    }
  };
}])

.controller('DishDetailController', ['$scope', '$routeParams', 'menuFactory',
  function($scope, $routeParams, menuFactory) {
    $scope.dish = menuFactory.getDish(parseInt($routeParams.id, 10));
  }
])

.controller('DishCommentController', ['$scope', function($scope) {

  //Step 1: Create a JavaScript object to hold the comment from the form
  $scope.inputs = {
    rating: 5,
    comment: "",
    author: "",
    date: ""
  };

  // Submit Comment Function
  $scope.submitComment = function() {
    //Step 2: This is how you record the date
    //"The date property of your JavaScript object holding the comment" = new Date().toISOString();
    $scope.inputs.date = new Date().toISOString();
    // -- Parse Rating to Int to ensure sorting work --
    $scope.inputs.rating = parseInt($scope.inputs.rating);
    //console.log($scope.inputs);

    // Step 3: Push your comment into the dish's comment array
    $scope.dish.comments.push($scope.inputs);

    //Step 4: reset your form to pristine
    $scope.commentForm.$setPristine();

    //Step 5: reset your JavaScript object that holds your comment
    $scope.inputs = {
      rating: 5,
      comment: "",
      author: "",
      date: ""
    };
    $scope.$parent.inputs = {
      rating: 5,
      comment: "",
      author: "",
      date: ""
    };
    //console.log($scope.inputs);
  }
}])

;
