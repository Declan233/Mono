

var app = angular.module('innerApp', ['ngSanitize']);
app.controller("miniLoc",function ($scope, $interval, $sce)
{

    var pls = window.parent.player;
    var pos = [];
    var nan = [];
    var nic = [];

    $interval(function(){
        pls = window.parent.player;
        pos = [];nan = [];nic = [];
        for (var i=0;i<pls.length;i++){
            if (pls[i].position!="20_5")
                pos[i] = pls[i].position;
            else
                pos[i] = 21;
            nan[i] = pls[i].color;
            nic[i] = pls[i].name;
        }
        $scope.pps = pos;
        $scope.nan = nan;
        $scope.nic = nic;

    },2000);
    $scope.here = function (position) {
        var str = '';
        for (var j=0;j<pos.length;j++){
            if(pos[j]==position){
                // str += nan[j];
                str += '<span class="spp" style="border:2px solid '+nan[j]+';"></span>'
            }
        }
        return $sce.trustAsHtml(str);
    }

})




