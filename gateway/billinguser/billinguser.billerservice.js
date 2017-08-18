/**
 * Created by kmaharov on 16.08.2017.
 */
(function() {
    'use strict';
    angular
        .module('gatewayApp')
        .factory('Billingservice', Billingservice);

    Billingservice.$inject = ['$resource'];

    function Billingservice ($resource) {
        var resourceUrl =  'billing/' + 'api/billuser';

        return $resource(resourceUrl, {}, {'update': { method:'PUT' }});
    }
})();
