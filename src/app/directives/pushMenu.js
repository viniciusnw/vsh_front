app.directive('pushMenu', function(){

    return {
        
        link: function(scope, iElement, attrs) {
            
            // Id do hambuguer clicado
            var id   = '#' + iElement[0].id;
            
            // Menu referente ao hamburguer
            var menu = '.' + $(id).data('class-menu');
            
            // Se ele esta aberto ou fechado
            var open = $(id).data('open');
            
            // Executa o click
            $( id ).on('click', function(e){
                
                // Remove a classe de todos os menus para fecha-los
                $('.navbar-left, .navbar-right').removeClass( 'active' );
                
                // Impede a propagação do evento atual.
                e.stopPropagation();
                
                if( open == 0 ){
                    
                    $(id).data('open', 1);
                    $(menu).addClass( 'active' );
                }
                
                closeMenu();
            });
            
            /*
             * Cria um evento de click unico para fechar o menu
             * apenas quando um dos menus é acionado
             */
            var closeMenu = function(){
                
                $(document).one('click', function (e) {
                    
                    /*
                     * Caso o click tenha sico fora do menu ele é fechado
                     * Caso tenha sido dentro, outro evento de click unico é acionado
                     */
                    if( !$(e.target).is( menu )) {
                        
                        $(id).data('open', 0);
                        $(menu).removeClass( 'active' );
                    }
                    else{
                        closeMenu();   
                    }
                });
            }
        }
    };
});