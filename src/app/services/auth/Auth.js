app.factory('AuthService', function ( RestService, Token, $rootScope, $window ) {

    // Seta o endpoint padrao para todas as chamadas vindas de Auth
    RestService.endpoint = '/user';
    
    // Confere se o usuario possui um token salvo na maquina
    var tokenExist = function(){
        
        return ( ! Token.get() ) ? false : true;
    };

    // Fabrica
    return{ 

        login: function ( login ) {
        
            return RestService.REST( false, 'post', '/login', login );
        },

        logout: function () {
            
            return RestService.REST( true, 'post', '/logoff', login );
        },
        
        /*
         *  Executa verificacoes para as permissoes 
         *  de cada pagina\rota chamada
         * 
         *  Pagina publica ou privada
         */
        loadPages: function(){
            
            // Confere todas as rotas e sua parmissao de acesso (public | private)
            $rootScope.$on('$routeChangeStart', function(event, nextRoute, currRoute) {
                
                viewContainerClass( nextRoute );
                
                initialStatusAlert( nextRoute );
                
                checkRoutes( nextRoute );
            });
            
            // Chega a transicao de rotas e suas permissoes
            var checkRoutes = function( nextRoute ){
               
                // Rota default
                var defaultPage = '/#/event';

                // Roda login
                var loginPage   = '/#/login';

                // Hash da view
                var hash        = $window.location.hash;

                // Confere a rota para a tela de login
                var loginPath   = ( hash.indexOf('#/login') !== -1 || nextRoute.originalPath == '/login' );
                
                // Recebe o tipo de acesso da view
                var access      = (nextRoute && nextRoute.access) || 'private';
                
                // Caso a rota seja para a tela de login porem exista um token
                if( loginPath && tokenExist() ){
                    
                    $window.location.href = defaultPage;
                }
                // Rota privada
                else if( access === 'private' && ! tokenExist() ){
                    $window.location.href = loginPage;
                }
                // Rota publica
                else if( access === 'public' ){
                    return;
                }
            };
            
            // Atribui uma classe ao container da view( definida nas rotas  )
            var viewContainerClass = function( nextRoute ){
                $rootScope.viewContainerClass = nextRoute.viewContainerClass;
                $rootScope.showHeader         = nextRoute.showHeader;
            };
            
            /*
             * Reseta o alerta na troca de view, 
             * caso uma não haja envio de info de uma para outra.
             * 
             * Exemplo:
             * http://localhost/#/login/?alert=1
             */
            var initialStatusAlert = function( nextRoute ){
                
                if( ! nextRoute.params.alert ) {
                    $rootScope.alert = { message: false };
                }
            }
        }
    };
});