// js/app.js

var app = angular.module('Multilingual', [
    'pascalprecht.translate',
    'ngCookies'
]);

app.config(['$translateProvider', function($translateProvider) {

        $translateProvider
            .useStaticFilesLoader({
                prefix: './translations/', //File path w.r.t index.html
                suffix: '.json'
            })
            .preferredLanguage('ar')
            .useLocalStorage()
            .useMissingTranslationHandlerLog();

    }])
    .directive('testView', ['$rootScope', '$translate', function($rootScope, $translate) {
        function link($scope, element, attrs) {};
        return {
            restrict: 'EA',
            template: require('./../templates/test-view.html'),
            scope: false,
            link: link,
            controller: ['$scope', '$rootScope', '$translate', function($scope, $rootScope, $translate) {
                // $rootScope.lang;

                $scope.changeLanguage = function(langKey) {
                    $translate.use(langKey);
                };

                $rootScope.$on('$translateChangeSuccess', function(event, data) {
                    var language = data.language;

                    $rootScope.lang = language;
                });
            }]
        };
    }])
    .directive('welcomeView', [function() {
        return {
            restrict: 'EA',
            template: require('./../templates/welcome-view.html'),
            scope: {},
            link: function() {},
            controller: function() {}
        };
    }]);
