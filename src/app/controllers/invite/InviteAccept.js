app.controller('InviteAccept', function( UserService, $rootScope, $window ) {
    
    var controller = this;
    
    controller.id = '';
    
    /*
     * Aceita um convite pela id
     */
    controller.acceptInvite = function(){
        
        UserService.acceptInvite( controller.id )
                .then(
                    function(response){

                        success( response );
                    }
                );

        // Funcao a ser realizada ao fim da requisicao
        var success = function( success ){
            
            var response   = success.data,
                data       = success.data.data;
            
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
