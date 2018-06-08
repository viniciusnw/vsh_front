app.controller('UserEdit', function( UserService, UserCookie, $rootScope, Token, $scope ) {
    
    var controller = this;
    
    // Infomacoes do usuario
    controller.id         = '';
    controller.name       = '';
    controller.email      = '';
    controller.phone      = '';
    controller.occupation = '';
    controller.avatar     = '';
    
    // Senha do usuario
    controller.old_pass     = '';
    controller.pass         = '';
    controller.pass_confirm = '';
    
    // Recebe as infos atuais do usuario
    var current;
    
    /*
     * Busca as infos do usuario
     * Executa sempre quando a pagina é carregada
     */
    controller.userView = function(){
        
        UserService.user( UserCookie.get().id )
            .then(function(response){

                success(response);
            });

        var success = function( success ){

            var response = success.data;
            current      = success.data.data;
            
            if( response.status ){
                
                controller.id         = current.id;
                controller.name       = current.name;
                controller.email      = current.email;
                controller.phone      = current.phone;
                controller.occupation = current.occupation;
                controller.avatar     = current.avatar;
            }
        };
    }();
    
    /*
     * Edita as infos da conta/user
     */
    controller.userEdit = function(){
        
        // Recebe as alteracoes das infos do user
        var toChange = {};
        
        // Ira verificar se o valor enviado para alterar é diferente do atual,
        for( var info in current ){
            
            if( controller[info] != undefined && controller[info] != current[info]){
                
                toChange[info] = controller[info];
            }
        }        
        
        // Verifica no rootScope se existe envio de um avatar pela diretiva uploadAvatar.
        if( $rootScope.urlNewAvatar ){
            
            toChange['avatar'] = $rootScope.urlNewAvatar;
        }
        
        UserService.userEdit( toChange )
                .then(
                    function( response ){
                        
                        success(response);
                    }
                );
        
        // Salva o novo token após a alteraco das infos do usuario
        var success = function( success ){
            
            var response = success.data;
            
            // Verificação de erro a nivel de sucesso de requisicao
            if( response.status ){
                
                Token.set( response.token, [] );
                
                $rootScope.alert = {
                    message: response.message,
                    type:    'success'
                };
            }
        };
    };
    
    /*
     * Edita a senha da conta/user
     */
    controller.userPassEdit = function(){
        
        // Caso a senha atual não seja digitada, o valor NULL é passado como old_pass
        var old_pass = (controller.old_pass) ? controller.old_pass : 'NULL';
        
        UserService.redefinePassword( old_pass, controller.pass, controller.pass_confirm )
                .then(
                    function(response){

                        success( response );
                    }
                );

        // Funcao a ser realizada ao fim da requisicao
        var success = function( success ){
            
            var response = success.data;
            
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
});