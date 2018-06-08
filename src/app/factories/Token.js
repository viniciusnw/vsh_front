app.factory('Token', function ( Cookie ){
    
    // Default key cookie token
    var key = 'userToken';
    
    // Factory
    return{
        
        set: function( token, options){
         
            Cookie.set( key, token, options );
        },
        
        get: function( ){
            return Cookie.get( key );
        },
        
        remove: function(){
            
            Cookie.remove( key );
        }
    };
});

app.factory('UserCookie', function ( Cookie ){
    
    // Default key for user infos
    var keyId    = 'userInfosId';
    var keyName  = 'userInfosName';
    var keyEmail = 'userInfosEmail';
    
    // Factory
    return{
        
        set: function( id, name, email, options ){
         
            Cookie.set( keyId,    id,    options );
            Cookie.set( keyName,  name,  options );
            Cookie.set( keyEmail, email, options );
        },
        
        get: function( ){
            
            return {
                
                //Retorno das infos do usuario
                id:    Cookie.get( keyId ),
                name:  Cookie.get( keyName ),
                email: Cookie.get( keyEmail )
            };
        },
        
        remove: function(){
            
            Cookie.remove( keyId );
            Cookie.remove( keyName );
            Cookie.remove( keyEmail );
        }
    };
});
