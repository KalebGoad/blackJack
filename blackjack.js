let player = {
    name: "Chips",
    chips:  200
}

// cards' image source: https://github.com/hayeah/playing-cards-assets
const deck = {
    1 : "./assets/ace_of_spades.png",
    2 : "./assets/2_of_spades.png",
    3 : "./assets/3_of_spades.png",
    4 : "./assets/4_of_spades.png",
    5 : "./assets/5_of_spades.png",
    6 : "./assets/6_of_spades.png",
    7 : "./assets/7_of_spades.png",
    8 : "./assets/8_of_spades.png",
    9 : "./assets/9_of_spades.png",
    10 : "./assets/10_of_spades.png",
    11 : "./assets/jack_of_spades.png",
    12 : "./assets/queen_of_spades.png",
    13 : "./assets/king_of_spades.png",
    14 : "./assets/ace_of_hearts.png",
    15 : "./assets/2_of_hearts.png",
    16 : "./assets/3_of_hearts.png",
    17 : "./assets/4_of_hearts.png",
    18 : "./assets/5_of_hearts.png",
    19 : "./assets/6_of_hearts.png",
    20 : "./assets/7_of_hearts.png",
    21 : "./assets/8_of_hearts.png",
    22 : "./assets/9_of_hearts.png",
    23 : "./assets/10_of_hearts.png",
    24 : "./assets/jack_of_hearts.png",
    25 : "./assets/queen_of_hearts.png",
    26 : "./assets/king_of_hearts.png",
    27 : "./assets/ace_of_clubs.png",
    28 : "./assets/2_of_clubs.png",
    29 : "./assets/3_of_clubs.png",
    30 : "./assets/4_of_clubs.png",
    31 : "./assets/5_of_clubs.png",
    32 : "./assets/6_of_clubs.png",
    33 : "./assets/7_of_clubs.png",
    34 : "./assets/8_of_clubs.png",
    35 : "./assets/9_of_clubs.png",
    36 : "./assets/10_of_clubs.png",
    37 : "./assets/jack_of_clubs.png",
    38 : "./assets/queen_of_clubs.png",
    39 : "./assets/king_of_clubs.png",
    40 : "./assets/ace_of_diamonds.png",
    41 : "./assets/2_of_diamonds.png",
    42 : "./assets/3_of_diamonds.png",
    43 : "./assets/4_of_diamonds.png",
    44 : "./assets/5_of_diamonds.png",
    45 : "./assets/6_of_diamonds.png",
    46 : "./assets/7_of_diamonds.png",
    47 : "./assets/8_of_diamonds.png",
    48 : "./assets/9_of_diamonds.png",
    49 : "./assets/10_of_diamonds.png",
    50 : "./assets/jack_of_diamonds.png",
    51 : "./assets/queen_of_diamonds.png",
    52 : "./assets/king_of_diamonds.png"
}

// import { deck } from "./cards.js";

let cards = []
let dealerCards = []
let sum = 0
let sumDealer = 0
let isAlive = true
let message = ""
let messageDealer = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let newEl = document.getElementById("new-el")
let playerEl = document.getElementById("player-el")
let startEl = document.getElementById("start-el")
let standEl = document.getElementById("stand-el")
let bet = document.getElementById("quantity")
let chipsEl = document.getElementById("chips-el")

let dealerEl = document.getElementById("dealer-el")
let sumDealerEl = document.getElementById("sum-dealer")

let hasAce = false;


startEl.hidden = true;
newEl.hidden = true;
standEl.hidden = true;

playerEl.textContent = player.name + ": $" + player.chips



function getRandomCard() {
    let randomNumber = Math.floor(Math.random()*52 ) + 1 // goes through deck 
    return randomNumber
}



function chipsWager() {
    if (bet.value > Number(bet.getAttribute("max")) || bet.value < Number(bet.getAttribute("min"))) {
        bet.setAttribute("color", "red")
        console.log("Bet value invalid: Please select amount from 5-200, or total chip amount remaining.")
    } else {
        bet.setAttribute("color", "white")
        startEl.hidden = false;
        blackJack = bet.value * .5;
        chipsEl.hidden = true;
        bet.hidden = true;
        playerEl.textContent += "  |  " + "Bet: " + bet.value
        document.querySelectorAll("#hand img").forEach((element) => element.remove())
        document.querySelectorAll("#handDealer img").forEach((element) => element.remove())
        sumEl.textContent = "Sum: "
        sumDealerEl.textContent = "Sum: "
    }
}

function sumUp(sum, x) {
    
    if (x%13 >= 10 || x%13 === 0) {
        sum += 10
    } else if (x%13 === 1) {
        if(sum >= 11) {
            sum += 1
        } else {
            hasAce = true
            sum += 11
        }
    } else {
        sum += x%13
    }
    return sum
}

function startGame() {
    sum = 0
    sumDealer = 0
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = sumUp(sum, firstCard)
    sum = sumUp(sum, secondCard)
    let firstDealerCard = getRandomCard() 
    dealerCards = [firstDealerCard]
    sumDealer = sumUp(sumDealer, firstDealerCard)
    startEl.hidden = true
    newEl.hidden = false;
    standEl.hidden = false;
    renderGame()

    startEl.textContent = "DEAL"

}

function renderGame() {
    document.querySelectorAll("#hand img").forEach((element) => element.remove())
    for (let i = 0; i < cards.length; i++) {
        let img = document.createElement('img');
        img.src = deck[cards[i]];
        document.querySelector("#hand").appendChild(img);

    }
    document.querySelectorAll("#handDealer img").forEach((element) => element.remove())
    for (let i = 0; i < dealerCards.length; i++) {
        let img = document.createElement('img');
        img.src = deck[dealerCards[i]];
        document.querySelector("#handDealer").appendChild(img);
    }


    sumEl.textContent = "Sum: " + sum
    sumDealerEl.textContent = "Sum: " + sumDealer
    if (sum <= 20) {
        message = "Would you like to draw a card, or stand? 😁"

    } else if (sum === 21) {
        message = "Wohoo! You've got Blackjack! Select a new wager amount to begin the next deal."
        endRound()
        player.chips = player.chips + Number(bet.value) +blackJack
        playerEl.textContent = player.name + ": $" + player.chips 
        startEl.textContent = "REDEAL"
    } else if (hasAce === false) {
        message = "Busted! You lose this round! Select a new wager amount to begin the next deal."
        endRound()
        player.chips = player.chips - Number(bet.value)
        playerEl.textContent = player.name + ": $" + player.chips
        startEl.textContent = "REDEAL"
        
    } else if (hasAce === true) {
        sum -= 10
        hasAce = false
        sumEl.textContent = "Sum: " + sum    
    }



    messageEl.textContent = message
}

function newCard() {
    if (isAlive === true) {
        let card = getRandomCard()
        sum = sumUp(sum, card)
        cards.push(card)
        renderGame()
    }
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
async function stand() {
        while (sumDealer < 17) {
            let card = getRandomCard()
            sumDealer = sumUp(sumDealer, card)
            dealerCards.push(card)
            renderGame();
            await sleep(1000)
        }
        if (sumDealer > 21) {
            messageDealer = "Dealer BUSTS! Nice win!"
            endRound()
            player.chips = player.chips + Number(bet.value)
        }
        else if (sumDealer > sum && sumDealer <=21) {
            messageDealer = "Dealer won this round! Please place your wager to play the next round." 
            endRound()
            player.chips = player.chips - Number(bet.value)
        }

        else if (sumDealer < sum) {
            messageDealer = "Congrats! You won this round!"
            endRound()
            player.chips = player.chips + Number(bet.value)
        }
        
        else if (sumDealer === sum) {
            messageDealer = "We TIED, this round is a push!"
            endRound()
            player.chips = player.chips 
        }

        messageEl.textContent = messageDealer
        playerEl.textContent = player.name + ": $" + player.chips
    }

    
function endRound() {
    isAlive = false
    startEl.hidden = true;
    newEl.hidden = true;
    standEl.hidden = true;
    chipsEl.hidden = false;
    quantity.hidden = false;
    playerEl.textContent = player.name + ": $" + player.chips
    console.log(bet.getAttribute("max"))
    if(player.chips < 200) {
        bet.setAttribute("max", player.chips)
    console.log(bet.getAttribute("max"))
    } else {
        bet.setAttribute("max", 200)
    }
}


