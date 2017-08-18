(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('BillinguserDialogController', BillinguserDialogController);

    BillinguserDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Billinguser'];

    function BillinguserDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Billinguser) {
        var vm = this;

        vm.billinguser = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.billinguser.id !== null) {
                Billinguser.update(vm.billinguser, onSaveSuccess, onSaveError);
            } else {
                Billinguser.save(vm.billinguser, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('gatewayApp:billinguserUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.billdate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
