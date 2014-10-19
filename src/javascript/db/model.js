
var yxs;
(function (yxs) {

    var m = (function () {


        function m() {
            this.namespace = "com.yxs.db"
            this.addnamespace = namespace + ".";
            this.db = null;
            this.ready = false;

            $data.Entity.extend(this.addnamespace + "Todo", {
                Id: { type: "int", key: true, computed: true },
                Task: { type: String, required: true, maxLength: 200 },
                DueDate: { type: Date },
                Completed: { type: Boolean },
                Person: { type: "Person", required: true, inverseProperty: "Todos" }
            });

            $data.Entity.extend(this.addnamespace + "Person", {
                Id: { type: "int", key: true, computed: true },
                Name: { type: String, required: true, maxLength: 200 },
                Todos: { type: Array, elementType: Todo, inverseProperty: "Person" }
            });

            $data.EntityContext.extend(this.addnamespace + "TodoDatabase", {
                Todos: { type: $data.EntitySet, elementType: Todo },
                People: { type: $data.EntitySet, elementType: Person }
            });
        }

        m.prototype.open = function () {
            var _this = this;
            if (_this.ready) {
                return ;
            }

            _this.db = new TodoDatabase({
                provider: 'webSql', databaseName: this.addnamespace + "TodoDatabase"
            });

            db.onReady(function () {
                _this.ready = true;
            });
        };
        return m;
    })();

    yxs.s_db = m;
})(yxs || (yxs = {}));

