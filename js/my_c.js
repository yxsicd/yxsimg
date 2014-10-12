/// <reference path="hashes.js" />
/// <reference path="idbstore.min.js" />
/// <reference path="angular.js" />

var yxs;

(function (yxs) {

    var my_c = (function my_c($scope) {
        var SHA512 = new Hashes.SHA512;
        var Base64 = new Hashes.Base64;

        $scope.mysrc = "";
        $scope.mysrc_name = "";
        $scope.myfile = "";
        $scope.people = {};

        createStore();

        function myhash() {
            if (!$scope.mypassword) {
                return "";
            }
            var ret = SHA512.hex($scope.mypassword);
            return ret;
        }


        function showimg() {

            console.log($scope.myxx);
            if (myfile.files.length == 0) {
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
            }
        }

        $scope.openbaidu = function () {
            $.ajax({
                type: 'GET',
                url: 'https://pcs.baidu.com/rest/2.0/pcs/file?method=list&access_token=23.4d8c16c8c150ad8b6b438b076d667bf0.2592000.1415291309.2936333383-238347&path=%2Fapps%2Fpcstest_oauth',
                async: false,
                jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
                jsonpCallback: "callback",//自定义的jsonp回调函数名，默认未jquery自动生成的随机函数名，也可以写“?”jquery会自动处理
                success: function (o) {
                    $scope.myfile = o;
                }
            });

        }

        /*
        // https://pcs.baidu.com/rest/2.0/pcs/file?method=upload&path=%2fapps%2falbum%2f1.JPG&access_token=b778fb598c717c0ad7ea8c97c8f3a46f
        */

        $scope.uploadfile = function () {
            var formdata = new FormData();
            formdata.append("file", $scope.myfile, $scope.myfile.name)
            $.ajax({
                type: 'POST',
                data: formdata,
                contentType: false,
                processData: false,
                url: 'https://pcs.baidu.com/rest/2.0/pcs/file?method=upload&access_token=23.4d8c16c8c150ad8b6b438b076d667bf0.2592000.1415291309.2936333383-238347&path=%2Fapps%2Fpcstest_oauth%2Fupload.jpg',
                async: false,
                jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
                jsonpCallback: "callback",//自定义的jsonp回调函数名，默认未jquery自动生成的随机函数名，也可以写“?”jquery会自动处理
                success: function (o) {
                    console.log(o);
                }
            });
        }

        $scope.mkdir = function () {
            $.ajax({
                type: 'POST',
                url: 'https://pcs.baidu.com/rest/2.0/pcs/file?method=mkdir&access_token=23.4d8c16c8c150ad8b6b438b076d667bf0.2592000.1415291309.2936333383-238347&path=%2Fapps%2Fpcstest_oauth%2Fpkq2.jpg',
                data: {
                    "file": "[1,2,3,4,5]"
                },
                async: false,
                jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
                jsonpCallback: "callback",//自定义的jsonp回调函数名，默认未jquery自动生成的随机函数名，也可以写“?”jquery会自动处理
                success: function (o) {
                    console.log(o);
                }
            });
        }

        $scope.getfile = function () {

            $.ajax({
                type: 'GET',
                url: 'https://pcs.baidu.com/rest/2.0/pcs/file?method=download&access_token=23.4d8c16c8c150ad8b6b438b076d667bf0.2592000.1415291309.2936333383-238347&path=%2Fapps%2Fpcstest_oauth%2Fpkq.jpg',
                async: false,
                jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
                jsonpCallback: "callback",//自定义的jsonp回调函数名，默认未jquery自动生成的随机函数名，也可以写“?”jquery会自动处理
                success: function (o) {
                    console.log(o);
                }
            });

        }


        $scope.showimg = showimg;
        $scope.initdb = createStore;
        $scope.deletedb = deletedb;

        $scope.testgetall = function (store) {
            store = store || window['dbs']["people"];
            store.getAll(function (result) {
                $scope.people.items = result;
                $scope.$apply();
                console.log('getAll() call success. Result:', result);
            });
        }

        $scope.testadd = function () {
            console.log("add test");
            testWrite(null, $scope);
        }

        $scope.myhash = myhash;
        var lastnames = ['Smith', 'Miller', 'Doe', 'Frankenstein', 'Furter'],
             firstnames = ['Peter', 'John', 'Frank', 'James'],
             id = 1;

        function testWrite(store, $scope) {
            store = store || window['dbs']["people"];
            var dataObj = {
                lastname: lastnames[Math.floor(Math.random() * 5)],
                firstname: firstnames[Math.floor(Math.random() * 4)],
                age: Math.floor(Math.random() * (100 - 20)) + 20,
                image: $scope.mysrc,
                id: id++
            };
            store.put(dataObj, function (result) {
                console.log('put() call success. Result:', result);
            });
        }

        function testRead(store) {
            store = store || window['dbs']["people"];
            store.get(1, function (result) {
                console.log('get() call success. Result:', result);
            });
        }

        function testRemove(store) {
            store = store || window['dbs']["people"];
            store.remove(1, function (result) {
                console.log('remove() call success. Result:', result);
            });
        }

        function testClear(store) {
            store = store || window['dbs']["people"];
            store.clear(function (result) {
                console.log('clear() call success. Result:', result);
            });
        }

        function testBatch(store) {
            store = store || window['dbs']["people"];
            var list = [];
            for (var i = 0; i < 5; i++) {
                var dataObj = {
                    lastname: lastnames[Math.floor(Math.random() * 5)],
                    firstname: firstnames[Math.floor(Math.random() * 4)],
                    age: Math.floor(Math.random() * (100 - 20)) + 20,
                    id: id++
                };
                list.push({ type: "put", value: dataObj });
            }
            store.batch(list, function (result) {
                console.log('batch() call success. Result:', result);
            }, function (error) {
                console.log("error", error);
            });
        }

        /* create a store using the wrapper and kick off: */

        function deletedb() {

            new IDBStore({
                storeName: 'people'
            }).deleteDatabase();

        }

        function createStore() {
            window['dbs'] = {};
            window['dbs']["people"] = new IDBStore({
                dbVersion: '4',
                storeName: 'people',
                keyPath: 'id',
                indexes: [{ name: "name" }, { name: "age" }, { name: "cdate" }, { name: "mdate" }],
                onStoreReady: function () {
                    console.log('Store ready, go ahead!');
                    console.log('The store is accessible at window.dbs.people');

                }
            });

            window['dbs']["images"] = new IDBStore({
                dbVersion: '4',
                storeName: 'images',
                keyPath: 'id',
                indexes: [{ name: "type" }, { name: "name" }, { name: "data" }],
                onStoreReady: function () {
                    console.log('Store ready, go ahead!');
                    console.log('The store is accessible at window.dbs.images');
                }
            });

        }
    })();

    yxs.my_c = my_c;

})(yxs || (yxs = {}));