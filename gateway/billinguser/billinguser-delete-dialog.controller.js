(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('BillinguserDeleteController',BillinguserDeleteController);

    BillinguserDeleteController.$inject = ['$uibModalInstance', 'entity', 'Billinguser'];

    function BillinguserDeleteController($uibModalInstance, entity, Billinguser) {
        var vm = this;

        vm.billinguser = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Billinguser.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
