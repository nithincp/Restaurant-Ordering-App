import { menuArray } from "./data.js"

const addItemArray = []


document.addEventListener('click',function(e){
    if(e.target.dataset.foodItem){
        addItemDashboard(parseInt(e.target.dataset.foodItem))
    }
    else if(e.target.id === 'complete-order-btn'){
        completeOrder()
    }
    else if(e.target.id === 'pay-btn'){
        purchaseSuccess(e)
    }
})

function getMenuHTML(){
    let menuHTML = ''
    menuArray.forEach(function(item){
        let itemIngredients = ''
        if (item.ingredients.length >= 1){
            item.ingredients.forEach(function(ingredient,index){
                if (index === item.ingredients.length-1){
                    itemIngredients += ingredient
                }
                else{
                    itemIngredients += ingredient + ','
                }
            })
        }
        
        
        menuHTML += 
            `
            <div class="menu-item">
                <p class="item-emoji">${item.emoji}</p>
                <div class="item-details">
                    <p class="item-detail-title">${item.name}</p>
                    <p class="item-detail-ingredients">${itemIngredients}</p>
                    <p class="item-detail-price">$${item.price}</p>
                </div>
                <div class="item-add-btn" data-food-item="${item.id}">
                    +
                </div>
            </div>
            <div class="item-border">
            </div>
            `
    })
    
    return menuHTML
}

function addItemDashboard(id){

    const borderHTML = 
    `
    <div class="item-border-black"></div>
    `

    let itemDashBoardHTML = ''
    let newItemsHTML = ''

    if (!addItemArray.includes(menuArray[id])){
        addItemArray.push(menuArray[id])

    }    

    const itemsHTML = addItemArray.map((item => 
        `
        <div class="individual-item-dashboard">
            <p class="item-detail-title">${item.name}</p>
            <p class="item-detail-price">$${item.price}</p>
        </div>
        `      
    )).join("")
        
    const totalHTML = 
        `
            <div class="total-item-dashboard">
                <p class="total-title">Total:</p>
                <p class="total-price">$${getTotalPrice()}</p>
            </div>
        `

    itemDashBoardHTML +=
    `
    <div>
        <p class="add-item-title">Your Order</p>
    </div>
    ${itemsHTML}
    ${borderHTML}
    ${totalHTML}
    <div class="button-element">
        <button class="complete-order-btn" id ="complete-order-btn">Complete Order</button>
    </div>
    `
    
    render()
    document.getElementById("menu").innerHTML += itemDashBoardHTML


}

function getPopupHTML(){
    const popupHTML = 
    `
    <div class="pop-up" id="pop-up">
        <p style="font-size:30px">Enter card details</p>
        <form id="payment-form">
            <input type="text" name="fullName" placeholder="Enter your name" required/>
            <input type="text" name="cardNumber" placeholder="Enter card number" required/>
            <input type="password" name="cardCVV" placeholder="Enter CVV" required/>
            <div class="pay-btn-el">
                <button type="submit" class="pay-btn" id="pay-btn">Pay</button>
            </div>
        </form>
    </div>
    `

    return popupHTML
}

function completeOrder(){
    document.getElementById("menu").innerHTML += getPopupHTML()
}

function purchaseSuccess(e){
    e.preventDefault()
    const paymentForm = document.getElementById("payment-form")
    const paymentData = new FormData(paymentForm)
    const fullName = paymentData.get('fullName')
    const cardNumber = paymentData.get('cardNumber')
    const cardCVV = paymentData.get('cardCVV')
    const confirmationHTML = getConfirmationHTML(fullName)
    if(fullName === '' || cardNumber === '' || cardCVV === ''){
        window.alert('Enter the creds!!')
    }
    else{
        render()
        document.getElementById("menu").innerHTML += confirmationHTML
    }
}

function getConfirmationHTML(fullName){
    return (
        `
        <div class="confirmation-message">
            Thanks, ${fullName}! Your order is on its way!
        </div>
        `
    )
}

function getTotalPrice(){
    let total = 0
    addItemArray.forEach(function(item){
        total+=item.price
    })

    return total
}


function render(){
    document.getElementById("menu").innerHTML = getMenuHTML()
}

render()
