app.controller('InviteRequest', function( UserService, $rootScope ) {
    
    var controller = this;
    
    controller.name  = '';
    controller.email = '';
    
    /*
     * Faz a requisicao de um convite
     */
    controller.requestInvite = function(){
        
        UserService.requestInvite( controller.name, controller.email )
        .then(
            function(response){
                
                success(response);
            }
        );

        var success = function( success ){

            var response = success.data,
                data     = success.data.data;

            if( response.status ){
                
                // Alerta de success
                $rootScope.alert = {
                    message: response.message,
                    type:    'success'
                };
                
                console.log( success );
            }
        };
    };
});
