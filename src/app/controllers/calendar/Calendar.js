app.controller('Calendar', function( ) {
    
    var controller = this;
    
    controller.events = 'teste';
    
    controller.click = function(){
        
        controller.events = 'novo valor';
    }
});
