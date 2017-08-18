(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('billinguser', {
            parent: 'entity',
            url: '/billinguser',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Billingusers'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/billinguser/billingusers.html',
                    controller: 'BillinguserController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('billinguser-detail', {
            parent: 'billinguser',
            url: '/billinguser/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Billinguser'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/billinguser/billinguser-detail.html',
                    controller: 'BillinguserDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Billinguser', function($stateParams, Billinguser) {
                    return Billinguser.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'billinguser',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('billinguser-detail.edit', {
            parent: 'billinguser-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/billinguser/billinguser-dialog.html',
                    controller: 'BillinguserDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Billinguser', function(Billinguser) {
                            return Billinguser.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('billinguser.new', {
            parent: 'billinguser',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/billinguser/billinguser-dialog.html',
                    controller: 'BillinguserDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                balance: null,
                                billdate: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('billinguser', null, { reload: 'billinguser' });
                }, function() {
                    $state.go('billinguser');
                });
            }]
        })
        .state('billinguser.edit', {
            parent: 'billinguser',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/billinguser/billinguser-dialog.html',
                    controller: 'BillinguserDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Billinguser', function(Billinguser) {
                            return Billinguser.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('billinguser', null, { reload: 'billinguser' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('billinguser.bill', {
            parent: 'billinguser',
            url: '/{id}/bill',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/billinguser/billinguser-bill-dialog.html',
                    controller: 'BillinguserBillerController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Billinguser', function(Billinguser) {
                            return Billinguser.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('billinguser', null, { reload: 'billinguser' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('billinguser.delete', {
            parent: 'billinguser',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/billinguser/billinguser-delete-dialog.html',
                    controller: 'BillinguserDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Billinguser', function(Billinguser) {
                            return Billinguser.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('billinguser', null, { reload: 'billinguser' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
