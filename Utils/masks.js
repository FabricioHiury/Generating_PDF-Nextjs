function formatarCPF(cpf) {
    const elementoAlvo = cpf
    const cpfAtual = cpf.value   
    
    let cpfAtualizado;
    
    cpfAtualizado = cpfAtual.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, 
     function( regex, argumento1, argumento2, argumento3, argumento4 ) {
            return argumento1 + '.' + argumento2 + '.' + argumento3 + '-' + argumento4;
    })  
    elementoAlvo.value = cpfAtualizado; 
    }
    
    function formatarData(){
        var data = new Date(),
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(), //+1 - getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
        return diaF+"/"+mesF+"/"+anoF;
    }

    function formatarRG(rg) {
        const elemento = rg
        const rgAtual = rg.value   
        
        let rgAtualizado;
        
        rgAtualizado = rgAtual.replace(/(\d{1})(\d{3})(\d{3})(\d{2})/, 
         function( regex, argumento1, argumento2, argumento3, argumento4 ) {
                return argumento1 + '.' + argumento2 + '.' + argumento3 + '-' + argumento4;
        })  
        elemento.value = rgAtualizado; 
        }