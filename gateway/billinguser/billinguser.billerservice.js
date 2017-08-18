/**
 * Created by kmaharov on 16.08.2017.
 */
(function() {
    'use strict';
    angular
        .module('gatewayApp')
        .factory('Billingservice', Billingservice);

    Billingservice.$inject = ['$resource', 'DateUtils'];

    function Billingservice ($resource, DateUtils) {
        var resourceUrl =  'billing/' + 'api/billingusers/bill/:id';

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
