app.controller('Admin', function( UserService, $rootScope ) {
    
    var controller = this;
    
    controller.users = {};
    
    /*
     * Lista todos os usuarios cadastrados
     */
    controller.listUser = function(){
        
        UserService.users()
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

                controller.users = data;
            }
        };
    }();
    
    /*
     * Liberar acesso
     */
    controller.block = function( id ){
        
        alert(id);
    };
    
    /*
     * Bloquear acesso
     */
    controller.release = function( id ){
        
        alert(id);
    };
});
