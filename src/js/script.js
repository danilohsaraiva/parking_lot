var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
(function () {
    var _a;
    var $ = function (query) { return document.querySelector(query); };
    setTimeout(function () {
        alert('Bem vindo, o campo nome e placa tem limite de 20 caracteres!');
    }, 400);
    function calcTempo(time) {
        var calculo = new Date().getTime() - new Date(time).getTime();
        var min = Math.floor(calculo / 60000);
        var sec = Math.floor(calculo % 60000 / 1000);
        if (min < 60) {
            if (min <= 1) {
                var tempo = "".concat(min, " minuto e ").concat(sec, "seg, valor do servi\u00E7o: 2,00 R$.");
                return tempo;
            }
            else if (min > 1) {
                var tempo = "".concat(min, " minutos e ").concat(sec, "seg, valor do servi\u00E7o: 2,00 R$.");
                return tempo;
            }
        }
        if (min > 60) {
            var hor = min / 60;
            var min = min % 60;
            if (hor >= 1 && hor < 3) {
                var tempo = "".concat(hor.toFixed(0), " hora e ").concat(min, " minutos, valor do servi\u00E7o: ").concat((parseInt(hor.toFixed(0)) * 2).toFixed(2), " R$");
                return tempo;
            }
            else {
                var tempo = "".concat(hor.toFixed(0), " hora e ").concat(min, " minutos, valor do servi\u00E7o: ").concat((parseInt(hor.toFixed(0)) * 3.5).toFixed(2), " R$");
                return tempo;
            }
        }
    }
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function salvar(veiculo) {
            localStorage.setItem("patio", JSON.stringify(veiculo));
        }
        function adicionar(veiculo, salva) {
            var _a;
            var row = document.createElement("tr");
            row.innerHTML = "\n            <td class=\"style1\"> ".concat(veiculo.nome, "</td>\n            <td class=\"style2\"> ").concat(veiculo.placa, "</td>\n            <td class=\"style3\"> ").concat(veiculo.entrada, "</td>\n            <td>\n                <button class=\"delete\" class=\"btn\" data-placa=\"").concat(veiculo.placa, "\">Check-out</button>\n            </td>\n            ");
            (_a = row.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                remover(this.dataset.placa);
            });
            $("#patio").appendChild(row);
            (salva === true) ? salvar(__spreadArray(__spreadArray([], ler(), true), [veiculo], false)) : salvar(__spreadArray([], ler(), true));
        }
        function remover(placa) {
            var _a = ler().find(function (veiculo) { return veiculo.placa === placa; }), time = _a.time, nome = _a.nome;
            var tempo = calcTempo(time);
            if (!confirm("O ve\u00EDculo ".concat(nome, " permaneceu por ").concat(tempo, ". Deseja encerrar?")))
                return;
            salvar(ler().filter(function (veiculo) { return veiculo.placa !== placa; }));
            render();
        }
        function render() {
            $("#patio").innerHTML = "";
            var patio = ler();
            if (patio.length) {
                patio.forEach(function (veiculo) {
                    adicionar(veiculo);
                });
            }
        }
        return { ler: ler, adicionar: adicionar, remover: remover, salvar: salvar, render: render };
    }
    patio().render();
    (_a = $("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        var _a, _b;
        var nome = (_a = $("#nome")) === null || _a === void 0 ? void 0 : _a.value;
        var placa = (_b = $("#placa")) === null || _b === void 0 ? void 0 : _b.value;
        var controle = true;
        placa = placa.toUpperCase();
        if (!nome || !placa) {
            alert("É necessário nome e placa, para realizar o check-in do veículo");
            return;
        }
        //construir um caminho para verificar se placa já existe
        //Pegar dados local Storage
        var looking = localStorage.patio ? JSON.parse(localStorage.patio) : []; //resulta em um objeto
        console.log(looking);
        //iterar em todos os objetos e não salvar caso exista
        for (var item in looking) {
            if (looking[item].placa === placa) {
                alert("Placa ".concat(placa, " j\u00E1 est\u00E1 cadastrada!"));
                controle = false;
                return;
            }
        }
        var data = new Date();
        var mes = data.getMonth() + 1;
        var mesAtt = '';
        if (mes <= 9) {
            mesAtt = "0".concat(mes);
        }
        else {
            mesAtt = "".concat(mes);
        }
        var enter = "".concat(data.getDate(), "/").concat(mesAtt, "/").concat(data.getFullYear(), " ").concat(data.getHours(), " horas e ").concat(data.getMinutes(), " min.");
        patio().adicionar({ nome: nome, placa: placa, entrada: enter, time: new Date() }, controle);
        // patio().adicionar({nome, placa, entrada: new Date().toISOString()},true)
    });
})();
