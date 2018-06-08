app.controller('Password', function( UserService, Token, $routeParams, $window, $rootScope ) {
    
    var controller = this;
    
    controller.email        = '';
    controller.password     = '';
    controller.pass_confirm = '';
    
    /*
     * Faz a solicitacao para requisitar uma nova senha, caso de perda
     */
    controller.requestNewPassword = function(){
        
        UserService.forgotPassword( controller.email )
                .then(
                    function(response){

                        success( response );
                    }
                );

        // Funcao a ser realizada ao fim da requisicao
        var success = function( success ){
            
            var response = success.data,
                data     = success.data.data;
            
            // Verificação de erro a nivel de sucesso de requisicao
            if( response.status ){
                
                // Alerta de success
                $rootScope.alert = {
                    message: response.message,
                    type:    'success'
                };
            }
        };
    };
    
    /*
     * Reseta o password do usuario apos o mesmo ter infomado que a esqueceu
     */
    controller.redefinePassword = function(){
        
        // Seta o token no cookie que foi passado via url
        Token.set( $routeParams.token, [] );
        
        UserService.redefinePassword( '', controller.password, controller.pass_confirm )
                .then(
                    function(response){

                        success( response );
                    }
                );

        // Funcao a ser realizada ao fim da requisicao
        var success = function( success ){
            
            var response = success.data,
                data     = success.data.data;
            
            // Deleta o token                
            Token.remove();
            
            // Verificação de erro a nivel de sucesso de requisicao
            if( response.status ){
                
                // Alerta de success
                $rootScope.alert = {
                    message: response.message,
                    type:    'success'
                };
                
                $window.location.href = '/#/login?alert=1';
            }
        };
    };
    
    controller.createPassword = function(){
        
        // Seta o token no cookie que foi passado via url
        Token.set( $routeParams.token, [] );
        
        UserService.createPassword( controller.password, controller.pass_confirm )
                .then(
                    function(response){
                        
                        success( response );
                    }
                );

        // Funcao a ser realizada ao fim da requisicao
        var success = function( success ){
            
            var response = success.data,
                data     = success.data.data;
            
            // Deleta o token                
            Token.remove();
            
            // Verificação de erro a nivel de sucesso de requisicao
            if( response.status ){
                
                // Alerta de success
                $rootScope.alert = {
                    message: response.message,
                    type:    'success'
                };
                
                $window.location.href = '/#/login?alert=1';
            }
        };
    };
});