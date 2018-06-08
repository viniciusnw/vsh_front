$(document).ready(function(){
    
    // Bootstrap Select
    $('.selectpicker').selectpicker({
        iconBase: 'fa',
        tickIcon: 'fa-check',
        noneSelectedText: 'Nenhum item selecionado'
    });

    // Bootstrap Tooltip
    $('[data-toggle="tooltip"]').tooltip();


    // Bootstrap Popover
    $('[data-toggle="popover"]').popover();


    // PUSH MENU

    // Executa o click
    $( '#btn-link-right, #btn-link-left' ).on('click', function(e){

        var id = $(this);

        // Menu referente ao hamburguer
        var menu = '.' + $(this).data('class-menu');

        // Se ele esta aberto ou fechado
        var open = $(this).data('open');

        // Remove a classe de todos os menus para fecha-los
        $('.navbar-left, .navbar-right').removeClass( 'active' );

        // Impede a propagação do evento atual.
        e.stopPropagation();

        if( open == 0 ){

            $(this).data('open', 1);
            $(menu).addClass( 'active' );
        }

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

                    id.data('open', 0);
                    $(menu).removeClass( 'active' );
                }
                else{
                    closeMenu();   
                }
            });
        };

        closeMenu();
    });
    
    // TIME DATE PICKER
    $('input[name="daterange"]').daterangepicker({
        "locale": {
            "format": "DD/MM/YYYY",
            "separator": " / ",
            "applyLabel": "OK",
            "cancelLabel": "Fechar",
            "daysOfWeek": [
                "Seg",
                "Ter",
                "Qua",
                "Qui",
                "Sex",
                "Sab",
                "Dom"
            ],
            "monthNames": [
                "Janeiro",
                "Fevereiro",
                "Março",
                "Abril",
                "Maio",
                "Junho",
                "Julho",
                "Agosto",
                "Setembro",
                "Outubro",
                "Novembro",
                "Dezembro"
            ],
            "firstDay": 0
        }
    }); 
    
    //Abrir calendario pelo button
    $('.btn-range-date-picker').on('click', function(e){
        
        e.preventDefault();
        
        if( $(this).data('open') == 0 ){
            $('input[name="daterange"]').focus();
            $(this).data('open', 1);
        }
    });
    
    // Quando fechar o calendario
    $('input[name="daterange"]').on('hide.daterangepicker', function(ev, picker) {
        
        $('.btn-range-date-picker').data('open', 0);
    });
    
    $('#summernote').summernote({
        height: 400
    });
});