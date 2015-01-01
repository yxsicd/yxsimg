
var yxs;
(function (yxs) {

    var m = (function () {

        function m() {
            this.namespace = ""
            this.addnamespace = this.namespace;
            this.db = null;
            this.myready = false;
            var _this = this;
            $data.Entity.extend(_this.addnamespace + "Todo", {
                Id: { type: "int", key: true, computed: true },
                Task: { type: String, required: true, maxLength: 200 },
                DueDate: { type: Date },
                Completed: { type: Boolean },
                Person: { type: _this.addnamespace + "Person", required: true, inverseProperty: _this.addnamespace + "Todos" }
            });

            $data.Entity.extend(_this.addnamespace + "Person", {
                Id: { type: "int", key: true, computed: true },
                Name: { type: String, required: true, maxLength: 200 },
                Todos: { type: Array, elementType: _this.addnamespace + "Todo", inverseProperty: _this.addnamespace + "Person" }
            });

            $data.EntityContext.extend(_this.addnamespace + "TodoDatabase", {
                Todos: { type: $data.EntitySet, elementType: _this.addnamespace + "Todo" },
                People: { type: $data.EntitySet, elementType: _this.addnamespace + "Person" }
            });
        }

        m.prototype.open = function (callback) {
            var _this = this;
            if (_this.myready) {
                callback && callback();
                return;
            }

            _this.db = new TodoDatabase({
                provider: 'webSql', databaseName: this.addnamespace + "TodoDatabase"
            });

            _this.db.onReady(function () {
                _this.myready = true;
                callback && callback();
            });
        };
        return new m();
    })();

    yxs.jay_db = m;
})(yxs || (yxs = {}));

