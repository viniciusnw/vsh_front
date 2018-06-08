app.directive('animateModelChange', function(){

    return {
        
        link: function(scope, iElement, attrs){
            
            // Checa a troca de valor do atributo model
            scope.$watch(function(){ return attrs.model; }, function(newVal, oldVal){

                if(newVal == oldVal){
                    iElement.addClass('start');
                } 
                else {
                    iElement.removeClass('start');
                    iElement.addClass('finally');
                }
            });
        }
    };
});