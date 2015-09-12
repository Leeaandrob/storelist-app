(function () {
    "use strict";
    angular
    .module('VideoFilter', [])
    .filter('trusted', ['$sce', function ($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]);
}());
