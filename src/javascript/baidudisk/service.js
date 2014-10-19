

var yxs;
(function (yxs) {

    var s_baidu = (function () {
        
        function s_baidu() {
        }
        s_baidu.prototype.openbaidu = function () {
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

        s_baidu.prototype.uploadfile = function () {
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

        s_baidu.prototype.mkdir = function () {
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

        s_baidu.prototype.getfile = function () {

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

        return s_baidu;

    })();
    yxs.s_baidu = s_baidu;
})(yxs || (yxs = {}));