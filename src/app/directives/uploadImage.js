app.directive('uploadImage', function( $rootScope ){

    return {
        
        template: "<input type='file' accept='image/*'> <div id='renderUploadImages'></div>",
        
        link: function(scope, iElement, attrs) {
            
            iElement[0].onchange = function(e){
                
                var file = (e.srcElement || e.target).files[0];
                
                /*
                 * O objeto FileReader permite aplicações 
                 * web ler assincronamente o conteúdo dos arquivos
                 */
                var reader = new FileReader();

                /*
                 * Inicia a leitura do conteúdo do input especificado, uma vez finalizado, 
                 * o atributo result conterá um data: URL representando os dados do arquivo.
                 */
                reader.readAsDataURL(file);

                /*
                 * Um manipulador para o evento load. 
                 * Este evento é chamado cada vez que a operação de leitura é completada com sucesso.
                 */
                reader.onload = function (e) {

                   // Cria a imagem
                    var img = "<div class='container-foto-enviada'> \n\
                                <img width='300' heigth='300' class='foto-enviada' src='" + e.target.result + "'> \n\
                               </div>";

                    // Renderiza a imagem na pagina
                    iElement[0].children.renderUploadImages.innerHTML = img;

                    // Salva a url base 64 para o envio pelo o formulario
                    $rootScope.urlNewAvatar = e.target.result;
                    $rootScope.$apply();
                };
            }
        }
    };
});