app.controller('Login', function( AuthService, Token, UserCookie, $window, cfpLoadingBar ) {
    
    // This Controller
    var controller = this;

    // Propriedades do controller
    controller.email      = '';
    controller.password   = '';
    controller.keepLogged = '';

    /*
     * Executa o login
     */
    controller.login = function(){
        
        // Post do login
        var login = {
            password: controller.password,
            email:    controller.email
        };
        
        // Executa o login
        AuthService.login( login )
            .then(
                function(response){
                    
                    success( response );
                }
            );

        // Funcao a ser realizada ao fim da requisicao de login
        var success = function( success ){
            
            var response   = success.data,
                data       = success.data.data,
                keepLogged = {};
            
            // Verificação de erro a nivel de sucesso de requisicao
            if( response.status ){
                
                // Verifica se o usuario deseja ficar conectado
                if( controller.keepLogged ){
                    
                    // Salva o cookie com data de validade de 1 ano
                    var now = new Date();
                    
                    keepLogged = {
                        expires: new Date( now.getFullYear() + 1, now.getMonth(), now.getDate())
                    };
                }
                
                // Salva o token
                Token.set( data.token, keepLogged );
                
                // Testa o token
                if( Token.get() ){
                    
                    // Salva as infos do usuario no cookie
                    UserCookie.set( data.id, data.name, data.email, keepLogged );
                    
                    // Se o token for salvo executa o refresh para o redirecionamento 
                    //$window.location.reload();
                    $window.location.href = '/#/event';
                }
            }
        };
    };
    
    /*
     * Executa o logoff
     */
    controller.logout = function(){
        
        Token.remove();
        UserCookie.remove();
        $window.location.href = '/#/login';
    };
});