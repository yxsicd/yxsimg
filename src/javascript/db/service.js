/// <reference path="all.js" />


var yxs;
(function (yxs) {

    var s = (function () {

        function s() {

            this.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;
            this.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction;
            this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
            this.dbs = {};
        }

        s.prototype.deletedb = function (dbname) {
            var ret = this.indexedDB.deleteDatabase(dbname);
            console.log(ret);
        };

        s.prototype.create = function (dbname, storename_arr, version) {
            var _this = this;

            var request = indexedDB.open(dbname, version);

            request.onupgradeneeded = function (event) {
                try {
                    _this.dbs[dbname] = event.target.result;
                    var db = _this.dbs[dbname];
                    for (i in storename_arr) {

                        if ((storename = storename_arr[i]["name"])) {
                            var objectStore = db.createObjectStore(storename, { keyPath: "id" });
                            if ((index = storename_arr[i]["index"])) {
                                for (myi in index) {
                                    objectStore.createIndex(index[myi], index[myi], { unique: false });
                                }
                            }
                        }

                    }
                }
                catch (e) {
                    console.log(e);
                }
            };

        };

        s.prototype.insert = function (dbname, storename, objarr) {
            var _this = this;
            var request = indexedDB.open(dbname);

            request.onerror = function (event) {
            };

            request.onsuccess = function (event) {
                _this.dbs[dbname] = event.target.result;

                var db = _this.dbs[dbname];
                var transaction = db.transaction([storename], "readwrite");

                var objectStore = transaction.objectStore(storename);
                for (var i in objarr) {
                    var request = objectStore.add(objarr[i]);
                    request.onsuccess = function (event) {
                        console.log(event);
                    };
                }

            };

        };

        s.prototype.selectall = function (dbname, storename, callback) {
            this.select(dbname, storename, null, 'next', callback);
        }

        s.prototype.select = function (dbname, storename, keyrange, order, callback) {
            var _this = this;
            var request = indexedDB.open(dbname);

            request.onsuccess = function (event) {
                _this.dbs[dbname] = event.target.result;

                var db = _this.dbs[dbname];
                var transaction = db.transaction([storename], "readonly");
                var objectStore = transaction.objectStore(storename);

                var result = [];

                objectStore.openCursor(keyrange, order).onsuccess = function (event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        cursor.continue();
                        console.log(cursor);
                        result[result.length] = cursor.value;
                    }
                    else {
                        if (callback) {
                            callback(result);
                        }
                    }

                };

            };
        }

        return new s();
    })();

    yxs.s_db = s;
})(yxs || (yxs = {}));