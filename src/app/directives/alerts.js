app.directive('vshAlerts', function() {
    
    return {
        
        templateUrl: 'views/directives/alerts.html',
        
        scope:{
            alert: '='
        },
        
        link: function(scope) {
            
            // Close alert
            $('.close').on('click', function(){
                
                scope.alert.message = false;
                scope.$apply();
            });
        }
    };
});