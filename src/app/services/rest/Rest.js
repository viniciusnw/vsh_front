app.factory('RestService', function($http, $urlApi, $window, Token, $rootScope) {
    
    // Endpoit padrao vindo do service
    this.endpoint = '';

    // Factory
    return{
        
        /* *
         * Servicos REST
         * 
         * @param {bool}: envio do toke
         * @param {type}: GET, POST, PUT, DELETE
         * @param {method}: complemento da url
         * @param {data}: array de dados para envio
         *
         * @returns Promessa das requisicoes 
         */
        REST: function( authorization, type, method, data ) {

            /*
             * Defalt Headers for requests 
             * Monta o header de acordo com o endpoit solicitado
             */
        	
            var defaultHeaders = {
                'Content-Type': 'application/json; charset=UTF-8',

                // Envia o token na requisicao caso seja necessario
                'Authorization': (function(){

                    if( authorization ){
                        return 'Bearer ' + Token.get();
                    }
                })()
            };
            

            // Seta o array base para a requisicao
            var config = {
                'method':  type,
                'url':     $urlApi + this.endpoint + method,
                'headers': defaultHeaders,
                'data':    data
            };

            // Cria a promisse
            return $http( config )
                .success(getCustomerComplete)
                // Verificação de erro a nivel de falha de requisicao
                .error(getCustomerFailed);
        }
    };
    
    // Success Resquest ajax
    function getCustomerComplete( response ){
        
        console.log( response );
        
        /*
         * Error para token invalido
         * Caso o retorno seja token invalido o token atual é removido e o usuario é redirecinado
         */
        if( response.error === 'not_authorized' ){
            
            // Alerta de success
            $rootScope.alert = {
                message: 'Efetue o login novamente',
                type:    'danger'
            };

            Token.remove();
            $window.location.href = '/#/login?alert=1';
        }
        /*
         * Error de solicitacao
         * A requisicao é bem sucedida, porem o status é false, retornando algum erro
         */
        else if( ! response.status ){
                
            // Alerta de erro
            $rootScope.alert = {
                //title:   'Title',
                message: response.message,
                type:    'danger'
            };
        }
    }
    
    // Failed Resquest ajax
    function getCustomerFailed( response ){

        // Error
        console.log( 'error' );
        console.log( response  );
    }
});