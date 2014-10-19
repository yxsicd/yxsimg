/// <reference path="all.js" />
/// <reference path="../third/then.min.js" />


var yxs;

(function (yxs) {

    var c = (function () {

        function c($scope) {
            var SHA512 = new Hashes.SHA512(), Base64 = new Hashes.Base64();

            $scope.mysrc = "";
            $scope.mysrc_name = "";
            $scope.myfile = "";
            $scope.people = {};

            function myhash() {
                if (!$scope.mypassword) {
                    return "";
                }
                var ret = SHA512.hex($scope.mypassword);
                return ret;
            }


            function showimg() {

                console.log($scope.myxx);
                if (myfile.files.length === 0) {
                    return;
                }
                var xx = myfile.files[0];

                $scope.myfile = xx;
                var fr = new FileReader();
                fr.readAsDataURL(xx);
                fr.onload = function () {
                    var ret = fr.result;
                    $scope.mysrc = ret;
                    $scope.mysrc_name = xx.name;
                };
            }

            $scope.showimg = showimg;
            $scope.initdb = function () {
                var dbversion = 2;
                yxs.s_db.create("yxs", [{ "name": "people", "index": ["age", "firstname", "lastname"] }, { "name": "images", "index": ["name", "type"] }], dbversion);
            };
            $scope.deletedb = function () {
                yxs.s_db.deletedb("yxs");
            };

            $scope.testgetall = function () {
                yxs.s_db.selectall("yxs", "people", function (result) {
                    $scope.people.items = result;
                    $scope.$apply();
                    console.log('getAll() call success. Result:', result);
                });
            };


            function insert(e) {
                if (e) {
                    var dataObj = {
                        lastname: lastnames[Math.floor(Math.random() * 5)],
                        firstname: firstnames[Math.floor(Math.random() * 4)],
                        age: Math.floor(Math.random() * (100 - 20)) + 20,
                        image: e,
                        id: id++
                    }
                    yxs.s_db.insert("yxs", "people", [dataObj]);
                    return true;
                }
                else {
                    return false;
                }
            }

            $scope.clearfile = function () { $scope.myfile = ""; }

            $scope.testadd = function () {
                console.log("add test");

                if (!insert($scope.myfile)) {
                    yxs.s_io.getdataurl("people_image",
                    function (e) {
                        $scope.myfile = e;
                        insert($scope.myfile)
                    });
                }

            };

            $scope.myhash = myhash;
            var lastnames = ['Smith', 'Miller', 'Doe', 'Frankenstein', 'Furter'],
                 firstnames = ['Peter', 'John', 'Frank', 'James'],
                 id = 1;
        }
        return c;
    })();

    yxs.c_db = c;

})(yxs || (yxs = {}));