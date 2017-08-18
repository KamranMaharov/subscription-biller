(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('BillinguserDetailController', BillinguserDetailController);

    BillinguserDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Billinguser'];

    function BillinguserDetailController($scope, $rootScope, $stateParams, previousState, entity, Billinguser) {
        var vm = this;

        vm.billinguser = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('gatewayApp:billinguserUpdate', function(event, result) {
            vm.billinguser = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
