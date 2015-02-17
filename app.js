/*!
 * filename: app.js
 * Kaltura Customer Care's Chrome Extension
 * 0.0.1
 *
 * Copyright(c) 2015 Omri Katz <omri.katz@kaltura.com>
 * MIT Licensed. http://www.opensource.org/licenses/mit-license.php
 *
 * http://corp.kaltura.com
 */

var myApp = angular.module('myApp', []);


function hello() {
  chrome.tabs.executeScript({
    file: '/inject/inject.js'
  }); 
}
 
var e = document.getElementById('jiraButton');
console.log(e);


myApp.controller('customerCareCtrl', function ($scope) {
    Foundation.global.namespace = '';
    $scope.activeFoundation = $(document).foundation();
	$scope.openJira = function() {
        chrome.tabs.executeScript({}, function() {
            console.log("hello world");
        }); 
		if (typeof $scope.jira != 'undefined') {
			var url = 'https://kaltura.atlassian.net/browse/' + $scope.jira;
			// window.open(url, '_blank');

		}
	}
    $scope.openSalesforce = function() {
        if (typeof $scope.salesforce != 'undefined') {
            var url = 'https://na5.salesforce.com/_ui/search/ui/UnifiedSearchResults?searchType=2&sen=a1d&sen=a0S&sen=00a&sen=005&sen=001&sen=500&sen=003&str=' + $scope.salesforce;
            window.open(url, '_blank');
        }
    }
});

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
            console.log(response.farewell);
        });
    });


myApp.directive('myEnter', function () { //directive that listen to "Enter" keypress
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});
