/// <reference path="hashes.js" />



function my_c($scope) {
    var SHA512 = new Hashes.SHA512;
    var Base64 = new Hashes.Base64;

    $scope.myxx = null;

    function myhash() {
        if (!$scope.mypassword) {
            return "";
        }
        var ret = SHA512.hex($scope.mypassword);
        return ret;
    }


    function showimg() {

        if (myfile.files.length == 0) {
            return;
        }
        var xx = myfile.files[0];
        var fr = new FileReader();
        fr.readAsDataURL(xx);
        fr.onload = function () {
            var ret = fr.result;
            myimg.src = ret;
        }
    }

    $scope.showimg = showimg;

    $scope.initdb = createStore_1_1;


    $scope.testadd = function () {
        console.log("add test");
        testWrite();
    }

    $scope.myhash = myhash;




}




var lastnames = ['Smith', 'Miller', 'Doe', 'Frankenstein', 'Furter'],
     firstnames = ['Peter', 'John', 'Frank', 'James'],
     id = 1;

function testWrite(store) {
    store = store || store_1_1;
    var dataObj = {
        lastname: lastnames[Math.floor(Math.random() * 5)],
        firstname: firstnames[Math.floor(Math.random() * 4)],
        age: Math.floor(Math.random() * (100 - 20)) + 20,
        id: id++
    };
    store.put(dataObj, function (result) {
        console.log('put() call success. Result:', result);
    });
}

function testRead(store) {
    store = store || store_1_1;
    store.get(1, function (result) {
        console.log('get() call success. Result:', result);
    });
}

function testGetAll(store) {
    store = store || store_1_1;
    store.getAll(function (result) {
        console.log('getAll() call success. Result:', result);
    });
}

function testRemove(store) {
    store = store || store_1_1;
    store.remove(1, function (result) {
        console.log('remove() call success. Result:', result);
    });
}

function testClear(store) {
    store = store || store_1_1;
    store.clear(function (result) {
        console.log('clear() call success. Result:', result);
    });
}

function testBatch(store) {
    store = store || store_1_1;
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

function createStore_1_1() {
    window['store_1_1'] = new IDBStore({
        dbVersion: '1',
        storeName: 'testStore_1_1',
        keyPath: 'id',
        autoIncrement: true,
        onStoreReady: function () {
            console.log('Store ready, go ahead!');
            console.log('The store is accessible at window.store_1_1');

        }
    });
}
