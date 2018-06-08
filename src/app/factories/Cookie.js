app.factory('Cookie', function ( $cookies ){
    
    //Factory
    return{
        
        set: function( key, value, options ){
            $cookies.put( key, value, options );
        },
        
        get: function( key ){
            return $cookies.get( key );
        },
        
        remove: function( key ){
        
            $cookies.remove( key );
        }
    }
});
