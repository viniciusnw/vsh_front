app.directive('inputsFlowUp', function(){

    return {
        
        link: function(scope, iElement, attrs) {
            
            var id = '#'+iElement[0].id;
            
            // init status
            if( $(id + ' .flow-up .form-control').val() )
                $(id + ' .flow-up .form-control').parent().addClass('active');

            // on focus
            $(document).on('focus', id + ' .flow-up .form-control', function(){
                $(this).parent().addClass('active');
            });

            // over focus
            $(document).on('blur', id + ' .flow-up .form-control', function(){
                if( ! $(this).val()){
                    $(this).parent().removeClass('active');
                }
            });
        }
    };
});