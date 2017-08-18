/**
 * Created by kmaharov on 16.08.2017.
 */
(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('BillinguserBillerController',BillinguserBillerController);

    BillinguserBillerController.$inject = ['$uibModalInstance', 'entity', 'Billingservice'];

    function BillinguserBillerController($uibModalInstance, entity, Billingservice) {
        var vm = this;

        vm.billinguser = entity;
        vm.clear = clear;
        vm.confirmBill = confirmBill;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmBill (id) {
            Billingservice.put({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
