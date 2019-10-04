// 
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}


// crição de ids
class Bd {
    constructor() {
        let id = localStorage.getItem('id')
        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }
    // só é usado na função gravar
    ajustId() {
        let ajustId = localStorage.getItem('id')
        return parseInt(ajustId) + 1
    }
    // grava uma nova despesa em LocalStorage
    gravar(despesa) {
        let id = this.ajustId()
        localStorage.setItem(id, JSON.stringify(despesa))
        localStorage.setItem('id', id)
    }
}


// 
function cadastrarDespesa() {
    // pega os dados contidos no Registro de nova despesa e os coloca em uma variável
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descrição = document.getElementById('descricao')
    let valor = document.getElementById('valor')
    // 
    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descrição.value, valor.value)
    let ameba = new Bd
    // coloca os dados contidos em Registro nova despesa se todos os valores forem preenchidos
    if (despesa.validarDados()) {
        // grava a despesa em LocalStorage
        ameba.gravar(despesa)
        // mensagem de sucesso
        document.getElementById('tituloModal').innerHTML = 'Cadastrado com sucesso!'
        document.getElementById('modalTituloDiv').className = 'modal-header text-success'
        document.getElementById('modalButtonDiv').className = 'btn-success btn'
        document.getElementById('texto').innerHTML = 'Cadastrado com sucesso!'
        document.getElementById('modalButtonDiv').innerHTML = 'Voltar'
        $('#sucessoGravacao').modal('show')
        // apaga todos os valores
        document.getElementById('ano').value = ""
        document.getElementById('mes').value = ""
        document.getElementById('dia').value = ""
        document.getElementById('tipo').value = ""
        document.getElementById('descricao').value = ""
        document.getElementById('valor').value = ""
        // carrega uma mensagem de erro se todos os campos de Registro nova despesa não forem preenchidos
    } else {
        document.getElementById('tituloModal').innerHTML = 'Erro na inclusão do registro'
        document.getElementById('modalTituloDiv').className = 'modal-header text-danger'
        document.getElementById('texto').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!'
        document.getElementById('modalButtonDiv').innerHTML = 'Voltar e corrigir'
        document.getElementById('modalButtonDiv').className = 'btn-Danger btn'
        $('#sucessoGravacao').modal('show')
    }
}


function carregarListaDespesa() {
    // pegar dados do LocalStorage
    let despesas = Array()
    let id = localStorage.getItem('id')
    for (let i = 1; i <= id; i++) {
        let despesa = JSON.parse(localStorage.getItem(i))
        if (despesa === null) {
            continue
        }
        despesas.push(despesa)
        console.log(despesa);

    }
    // imprimir dados na tabela
    let listaDespesas = document.getElementById('listaDespesas')

    despesas.forEach(function (d) {
        // coloca uma linha na tabela de dados e insere os dados contidos em "despesas"
        let linha = listaDespesas.insertRow()
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        linha.insertCell(1).innerHTML = `${d.tipo}`
        linha.insertCell(2).innerHTML = `${d.descricao}`
        linha.insertCell(3).innerHTML = `${d.valor}`

    })
}


function pesquisarDespesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descrição = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descrição.value, valor.value)
}