interface IVeiculo {
    nome: string;
    placa: string;
    entrada: string | Date;
    time: Date;
}

(function () {
    const $ = ( query :string ) : HTMLInputElement | null =>document.querySelector(query);

    setTimeout(function(){
        alert('Bem vindo, o campo nome e placa tem limite de 20 caracteres!');
        },400);

    function calcTempo(time : Date) {
        var calculo = new Date().getTime()- new Date(time).getTime();
        var min = Math.floor(calculo/60000)
        const sec = Math.floor(calculo%60000/1000)
        
        if(min < 60) {
            if(min<=1){
                const tempo = `${min} minuto e ${sec}seg, valor do serviço: 2,00 R$.`
                return tempo;
            } else if (min>1) {
                const tempo = `${min} minutos e ${sec}seg, valor do serviço: 2,00 R$.`
                return tempo;
            }
               
            }
            if(min > 60) {
                var hor = min / 60
                var min = min % 60

            if(hor >=1 && hor <3 ) {
                    const tempo = `${hor.toFixed(0)} hora e ${min} minutos, valor do serviço: ${(parseInt(hor.toFixed(0))*2).toFixed(2)} R$`;
                    return tempo; 
                } else {
                    const tempo = `${hor.toFixed(0)} hora e ${min} minutos, valor do serviço: ${(parseInt(hor.toFixed(0))*3.5).toFixed(2)} R$`;
                    return tempo;
                }
            }
        }
    
       function patio() {
        
        function ler(): IVeiculo[] {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }

        function salvar(veiculo: IVeiculo[]) {
            localStorage.setItem("patio", JSON.stringify(veiculo));
        }

        function adicionar(veiculo: IVeiculo, salva?: boolean) {

            const row = document.createElement("tr");

            row.innerHTML = `
            <td class="style1"> ${veiculo.nome}</td>
            <td class="style2"> ${veiculo.placa}</td>
            <td class="style3"> ${veiculo.entrada}</td>
            <td>
                <button class="delete" class="btn" data-placa="${veiculo.placa}">Check-out</button>
            </td>
            `;

            row.querySelector(".delete")?.addEventListener("click", function() {
                remover(this.dataset.placa);
            });

        $("#patio").appendChild(row);
           
        (salva === true) ? salvar([...ler(), veiculo]) : salvar([...ler()]);
            
        }

        function remover(placa: string) {
            const { time, nome } = ler().find(
                (veiculo) => veiculo.placa === placa
                );
                
               const tempo = calcTempo(time)
        

            if (
                !confirm(`O veículo ${nome} permaneceu por ${tempo}. Deseja encerrar?`)
            ) return;


            salvar(ler().filter(veiculo => veiculo.placa !== placa));
            render();
        }
        
        function render() {
            $("#patio")!.innerHTML = "";
            const patio = ler();

            if(patio.length) {
                patio.forEach(veiculo => {
                    adicionar(veiculo)
                });
            }
        }

        return { ler, adicionar, remover, salvar, render }
       }

       patio().render();

       $("#cadastrar")?.addEventListener("click", () => {
        var nome = $("#nome")?.value;
        var placa = $("#placa")?.value;
        var controle = true;
        placa = placa.toUpperCase();

        if(!nome || !placa) {
            alert("É necessário nome e placa, para realizar o check-in do veículo");
            return;
        }
        
            const looking : IVeiculo = localStorage.patio ? JSON.parse(localStorage.patio) : [] //resulta em um objeto
            console.log(looking)
          
        for( var item in looking) {
            if ( looking[item].placa === placa) {
                alert(`Placa ${placa} já está cadastrada!`)
                controle = false;
                return;
            }
        }
    
        let data : Date = new Date();

        let mes = data.getMonth()+1

        let mesAtt = ''
        if( mes <= 9) {
            mesAtt = `0${mes}`
        } else {
            mesAtt = `${mes}`
        }

        let enter : string = `${data.getDate()}/${mesAtt}/${data.getFullYear()} ${data.getHours()} horas e ${data.getMinutes()} min.`
        
        patio().adicionar({nome, placa, entrada: enter, time: new Date()},controle)
        
    })

})();