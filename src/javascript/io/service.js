
var yxs;
(function (yxs) {

    var s = (function () {

        function s() {
        }

        s.prototype.getdataurl = function (objid, retcall) {

            var ret;
            // an example using an object instead of an array

            var file = $("#" + objid)[0].files[0];
            var reader = new FileReader();
            reader.onloadend = function () {
                retcall(reader.result);
            }
            if (file) {
                reader.readAsDataURL(file);
            }

        }

        s.prototype.getdu = function (objid) {

            var ret;
            // an example using an object instead of an array
            var x = Thenjs(function (cont) {
                var file = $("#" + objid)[0].files[0];
                var reader = new FileReader();
                reader.onloadend = function () {
                    cont(null,reader.result);
                }
                if (file) {
                    reader.readAsDataURL(file);
                }
            });

            console.log(x._result[1]);
            return x;

        }


        return new s();

    })();
    yxs.s_io = s;
})(yxs || (yxs = {}));