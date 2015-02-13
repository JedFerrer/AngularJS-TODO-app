angular.module("todo-app", [])
  .controller("todo-ctrl", function($scope) {
    //Default Configuration
    $scope.toggle = false;
    $scope.toggleClearCompleted = false;
    $scope.todoList = [];

    //Search for Existing Session Storage
    if (typeof(sessionStorage["todoListCollection"]) !== 'undefined') {
      $scope.todoList = JSON.parse(sessionStorage["todoListCollection"]);
      $scope.toggle = true;
    }

    //Clear All Button
    $scope.clearAll = function() {
      $scope.toggle = false;
      $scope.toggleClearCompleted = false;
      $scope.todoList = [];
      sessionStorage.removeItem("todoListCollection");
    };

    //Add a Todo
    $scope.addTodo = function() {
      if (typeof($scope.todoInput) === 'undefined' || $scope.todoInput === '') {
      } else {
        $scope.todoList.push({todoText:$scope.todoInput, done:false});
        $scope.todoInput = '';
        $scope.toggle = true;
      }
      $scope.saveToSessionStorage();
    };

    //Clear Completed Todo
    $scope.clearCompleted = function () {
      var oldList = $scope.todoList;
      $scope.todoList = [];
      angular.forEach(oldList, function(x) {
        if (!x.done) $scope.todoList.push(x);
      });
      $scope.hideButtonIfLengthIsZero();
    };

    //Display Items Left Count
    $scope.itemsLeftCount = function () {
      var totalTodos = $scope.todoList.length;
      $scope.counter = 0;
      angular.forEach($scope.todoList, function(x) {
        if (x.done) {
          $scope.counter++;
        }
      });
      if ($scope.counter) {
        $scope.toggleClearCompleted = true
      } else {
        $scope.toggleClearCompleted = false;
      }
      return totalTodos - $scope.counter; 
    };

    $scope.hideButtonIfLengthIsZero = function () {
      if ($scope.todoList.length === 0) {
        $scope.toggle = false;
        $scope.toggleClearCompleted = false;
        sessionStorage.removeItem("todoListCollection");
      } else {
        $scope.saveToSessionStorage();
      }
    };

    //Remove a Todo
    $scope.removeTodo = function (todo) {
      var index = $scope.todoList.indexOf(todo);
      $scope.todoList.splice(index, 1);
      $scope.hideButtonIfLengthIsZero();
    };

    //Save Todo List to Session Storage
    $scope.saveToSessionStorage = function () {
      sessionStorage["todoListCollection"] = JSON.stringify($scope.todoList);
    };
  });


