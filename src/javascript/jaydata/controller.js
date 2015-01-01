/// <reference path="model.js" />

var yxs;

(function (yxs) {

    var c = (function () {

        function c($scope) {

            $scope.key_Id="";
            $scope.key_Task="";
            $scope.key_Person="";


            $scope.deletedb = function () { };
            $scope.initdb = function () {
                yxs.jay_db.open();
            };

            $scope.Todos = {};
            var peopleArr = ["yxs", "dd", "aa"];
            var taskArr = ['Step0: Get this this list', 'Step1: Define your data model', 'Step2: Initialize data storage'];

            $scope.insertdb = function () {
                //Create
                var tasks = yxs.jay_db.db.Todos.addMany([
                    { Task: taskArr[Math.round(Math.random() * 100) % 3], DueDate:new Date(),Completed: true, Person: { Name: peopleArr[Math.round(Math.random() * 100) % 3] } }
                ]);
                yxs.jay_db.db.saveChanges(function () {
                    getall();
                });

            };

            $scope.batchinsert = function () {
                //Create
              
                for (var i = 0, l = $scope.insertCount; i < l; i++) {
                    var tasks = yxs.jay_db.db.Todos.addMany([
                        { Task: taskArr[Math.round(Math.random() * 100) % 3], Completed: true,DueDate:new Date(), Person: { Name: peopleArr[Math.round(Math.random() * 100) % 3] } }
                    ]);
                }
                yxs.jay_db.db.saveChanges(function () {
                   $scope.getall();
                });
                 
            };

            $scope.getall = function () {

                yxs.jay_db.open(function () {

                    yxs.jay_db.db.Todos.include("Person").toArray(function (todos) {

                        $scope.Todos = todos;
                        $scope.$apply();

                    });
                });
            };


            $scope.myfilter=function(e){

                var ret1=(e.Person&&e.Person.Name.toLowerCase().indexOf($scope.key_Person.toLowerCase())!=-1);
                var ret2=(e.Task&&e.Task.toLowerCase().indexOf($scope.key_Task.toLowerCase())!=-1 );
                var ret3= (e.Completed == $scope.key_Completed);

                // console.log(ret1);
                // console.log(ret2);
                // console.log(ret3);

                var ret=ret1 && ret2 && ret3;
               return ret;

            }


        }
        return c;
    })();

    yxs.c_jay = c;

})(yxs || (yxs = {}));