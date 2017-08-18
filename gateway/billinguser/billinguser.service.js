(function() {
    'use strict';
    angular
        .module('gatewayApp')
        .factory('Billinguser', Billinguser);

    Billinguser.$inject = ['$resource', 'DateUtils'];

    function Billinguser ($resource, DateUtils) {
        var resourceUrl =  'billing/' + 'api/billingusers/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.billdate = DateUtils.convertDateTimeFromServer(data.billdate);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
