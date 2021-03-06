
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states => {
    
        for( state of states ) {
            ufSelect.innerHTML = ufSelect.innerHTML + `<option value="${state.id}">${state.nome}</option>`

        }
    } )
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


        
    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.innerHTML.disabled = true    

    fetch(url)
    .then( res => res.json())
    .then( cities => {
        
        for( city of cities ) {
            citySelect.innerHTML = citySelect.innerHTML + `<option value="${city.nome}">${city.nome}</option>`

        }

        citySelect.disabled = false
    } )


}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//Itens de Coleta
//pegar todos os li

const itensToCollect = document.querySelectorAll(".items-grid li")
for(const item of itensToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    //adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")
    
    
    const itemId = itemLi.dataset.id

    

    //verificar se tem itens selecionados, se sim pegar os items selecionados
    const alreadySelected = selectedItems.findIndex( item => { //arrow = função anonima
        const itemFound = item == itemId
        return itemFound
    })


    //se já estiver selecionado, tirar da seleção
    if(alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        //se não estiver selecionado, adicionar na seleção
        selectedItems.push(itemId)

    }

    //atualizar o input escondido com os dados selecionado
    collectedItems.value = selectedItems

}