/* Routes more Controllers
 * 
 * Classe para o body de acordo com a view
 * @parans: viewContainerClass: 'bg-color brand-gray',
 * 
 * Tipo de acesso a view
 * @parans: access: 'public'
 * 
 * Exibicao do header
 * @parans: showHeader: true
*/

app.config(function($routeProvider){

    // ROUTES
    $routeProvider
        
        /*
         *  ROTAS PUBLICAS
         */
        
        /*
         *   Rota de solicitacao de convite
         */
        .when('/convite',{
            viewContainerClass: 'bg-color brand-gray',
            access:       'public',
            templateUrl:  'views/pages/invite/inviteRequest.html',
            controller:   'InviteRequest',
            controllerAs: 'inviteRequest'
        })
        /*
         * Rota para solicitacao de recuperacao de senha
         */
        .when('/recuperar-senha',{
            viewContainerClass: 'bg-color brand-gray',
            access:       'public',
            templateUrl:   'views/pages/password/passwordForgot.html',
            controller:   'Password',  
            controllerAs: 'password'
        })
        /*
         * Rota para redefinir a senha
         */
        .when('/redefinir-senha/:token',{
            viewContainerClass: 'bg-color brand-gray',
            access:       'public',
            templateUrl:  'views/pages/password/passwordRedefine.html',
            controller:   'Password',  
            controllerAs: 'password'
        })
        /*
         * Rota para criar senha, primeiro acesso do usuario quando for aceito
         */
        .when('/primeiro-acesso/:token',{
            viewContainerClass: 'bg-color brand-gray',
            access:       'public',
            templateUrl:  'views/pages/password/passwordCreate.html',
            controller:   'Password',
            controllerAs: 'password'
        })
        /*
         * Rota para login
         */
        .when('/login',{
            viewContainerClass: 'bg-color brand-gray',
            access:       'public',
            templateUrl:  'views/pages/login.html',
            controller:   'Login',  
            controllerAs: 'login'
        })
        
        /*
         * ROTAS PRIVADAS
         */
        
        /*
         * Rota para pagina de eventos
         */
        .when('/dashboard',{
            showHeader :  true,
            templateUrl:  'views/pages/dashboard/dashboard.html',
            controller:   'Events',
            controllerAs: 'events'
        })
        /*
         * Ver e editar conta
         */
        .when('/conta/editar/:tab?',{
            showHeader :  true,
            templateUrl:  'views/pages/user/userEdit.html',
            controller:   'UserEdit',
            controllerAs: 'userEdit',
        })
        /*
         * Rota para o Calendario de eventos 
         */
        .when('/calendario',{
            showHeader :  true,
            templateUrl:  'views/pages/calendar/calendar.html',
            controller:   'Calendar',
            controllerAs: 'calendar'
        })
        
        /*
         * Rota para o ADMIN
         * 
         * Rota eclusiva para acesso do administrador do vsh
         * 
         * Ver usuarios e alterar status
         */
        .when('/admin/usuarios',{
            templateUrl:  'views/pages/admin/users.html',
            controller:   'Admin',
            controllerAs: 'admin'
        })
        /*
         * Rota default, quando alguma rota não for encontrada
         */
        .otherwise({
            redirectTo: '/dashboard'
        });
});