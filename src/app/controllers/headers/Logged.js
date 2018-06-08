app.controller('Logged', function( UserService, UserCookie ) {
    
    var controller = this;
    
    controller.avatar = '';
    controller.name   = '';
    controller.email  = '';
    
    controller.getUser = function(){
        
        UserService.user( UserCookie.get().id )
            .then(
                function(response){

                    success( response );
                }
            );

        var success = function( success ){

            var response = success.data,
                data     = success.data.data;

            if( response.status ){

                controller.avatar = data.avatar;
                controller.name   = data.name;
                controller.email  = data.email;
            }
        };
    }();
});