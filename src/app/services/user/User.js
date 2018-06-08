app.factory('UserService', function ( RestService ) {

    // Seta o endpoint padrao para todas as chamadas vindas de Auth
    RestService.endpoint = '/user';

    // Fabrica
    return{
        
        // Busca todos os usuarios
        users: function () {
        
            return RestService.REST( true, 'get', '/users/'  );
        },
        
        // Busca as infos do usuario logado
        user: function ( id ) {
        
            return RestService.REST( true, 'get', '/users/' + id  );
        },
        
        // Editar a conta
        userEdit: function( data ){
            
            return RestService.REST( true, 'put', '/users/', data  );
        },
        
        // Cadastra um convite
        requestInvite: function( name, email ){
            
            var data = {
                name:  name,
                email: email
            };
            
            return RestService.REST( false, 'post', '/invite/', data );
        },
        
        // Aceita um convite
        acceptInvite: function ( id ) {
            
            var data = {
                id: id
            };
            
            return RestService.REST( true, 'put', '/invite/', data);
        },
        
        // Solicita a recuperacao de senha
        forgotPassword: function( email ){
            
            var data = {
                email: email
            };
            
            return RestService.REST( false, 'post', '/password/', data);
        },
        
        /*
         *  Redefine a senha
         *  Caso não seja passado nemhum valor para o 'old_pass' sera considerado que o usuario
         *  perdeu a senha, e esta acessando pelo metodo 'redefinir senha' após o email enviado
         */
        redefinePassword: function( old_pass, password, pass_confirm ){
            
            var data = {
                "old_pass":     old_pass,
                "password":     password,
                "pass_confirm": pass_confirm
            };
            
            return RestService.REST( true, 'put', '/password/', data);
        },
        
        // Cria a senha no primeiro acesso
        createPassword: function( password, pass_confirm ){
            
            var data = {
                "password":     password,
                "pass_confirm": pass_confirm
            };
            
            return RestService.REST( true, 'post', '/users/', data);
        }
    };
});