let autoLabel = document.querySelectorAll("input:not(.yeatzyDice)")
for (let input of autoLabel) {
    input.defaultValue = 0;
    input.outerHTML = "<label for='" + input.id + "' id=" + input.id + "'Label' class=yeatzyLabel>" + input.id + "</label>" + input.outerHTML;
}

let savedDice = [0, 0, 0, 0, 0];
let currentDice = [0, 0, 0, 0, 0];
let savedScore = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let currentScore = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let turn = 0;
let sum = 0;
let total = 0;
//
let textDice = document.querySelectorAll("input:not(.yeatzyIN)")

function saveAction(number) {
    const die = document.getElementById("d" + (number + 1))
    if (savedDice[number] == 0) {
        savedDice[number] = 1;
        die.style.backgroundColor = "gray"
    }
    else {
        savedDice[number] = 0;
        die.style.backgroundColor = "white"
    }
}

function rollAction() {
    if (turn != 3) {
        let index = 0;
        for (let input of textDice) {
            if (savedDice[index] !== 1) {
                currentDice[index] = Math.floor(Math.random() * 6) + 1;
            }
            input.defaultValue = currentDice[index]
            index++;
        }
        turn++;
        let textTurn = document.querySelectorAll("p")
        for (let p of textTurn) {
            p.innerHTML = "turn " + turn;
        }
        numberCount = [0, 0, 0, 0, 0, 0]
        checkForPoints();
    }
}

function checkForPoints() {
    let yeatzyIndex = 0;
    const numberCount = [0, 0, 0, 0, 0, 0]
    for (let nc of currentDice) {
        numberCount[nc - 1] += 1;
        if (numberCount[nc - 1] == 5) { yeatzyIndex = nc - 1 }
    }

    // x's
    if (savedScore[0] == 0) {
        const scoreField = document.getElementById("1s")
        scoreField.defaultValue = numberCount[0]
    }
    if (savedScore[1] == 0) {
        const scoreField = document.getElementById("2s")
        scoreField.defaultValue = numberCount[1] * 2

    } if (savedScore[2] == 0) {
        const scoreField = document.getElementById("3s")
        scoreField.defaultValue = numberCount[2] * 3


    } if (savedScore[3] == 0) {
        const scoreField = document.getElementById("4s")
        scoreField.defaultValue = numberCount[3] * 4

    } if (savedScore[4] == 0) {
        const scoreField = document.getElementById("5s")
        scoreField.defaultValue = numberCount[4] * 5

    } if (savedScore[5] == 0) {
        const scoreField = document.getElementById("6s")
        scoreField.defaultValue = numberCount[5] * 6
    }

    //Pair
    if (savedScore[8] == 0) {
        let onePair = 0;
        if (numberCount.includes(2) || numberCount.includes(3) || numberCount.includes(4) || numberCount.includes(5)) {
            for (let index = 0; index < numberCount.length; index++) {
                if (numberCount[index] >= 2) { onePair = (index + 1) * 2 }

            }
        }
        const scoreField = document.getElementById("One_pair");
        scoreField.defaultValue = onePair;
    }

    if (savedScore[9] == 0) {
        let twoPair = 0;
        let count = 0;
        for (let index = 0; index < numberCount.length; index++) {
            if (numberCount[index] >= 2) {
                twoPair += ((index + 1) * 2);
                count++;
            }
        }
        if (count == 2) {
            const scoreField = document.getElementById("Two_pair");
            scoreField.defaultValue = twoPair;
        }
        else {
            const scoreField = document.getElementById("Two_pair");
            scoreField.defaultValue = 0;
        }
    }

    //Same
    if (savedScore[10] == 0) {
        let sum3Same = 0;
        if (numberCount.includes(3) || numberCount.includes(4) || numberCount.includes(5)) {
            sum3Same = 0;
            for (let index = 0; index < numberCount.length; index++) {
                if (numberCount[index] >= 3) { sum3Same = (index + 1) * 3 }

            }
        }
        const scoreField = document.getElementById("Three_same");
        scoreField.defaultValue = sum3Same;
    }

    if (savedScore[11] == 0) {
        let sum4Same = 0;
        if (numberCount.includes(4) || numberCount.includes(5)) {
            for (let index = 0; index < numberCount.length; index++) {
                if (numberCount[index] >= 4) { sum4Same = (index + 1) * 4 }

            }
        }
        const scoreField = document.getElementById("Four_same");
        scoreField.defaultValue = sum4Same;
    }
    //House
    if (savedScore[12] == 0) {
        let sumHouse = 0;
        if (numberCount.includes(3) && numberCount.includes(2)) {
            for (let index = 0; index < numberCount.length; index++) {
                if (numberCount[index] != 0) { sumHouse += (index + 1) * numberCount[index] }

            }
        }
        const scoreField = document.getElementById("Full_house");
        scoreField.defaultValue = sumHouse;
    }

    //Straigt
    if (savedScore[13] == 0) {
        if (currentDice.includes(1) && currentDice.includes(2) && currentDice.includes(3) && currentDice.includes(4) && currentDice.includes(5)) {
            const scoreField = document.getElementById("Small_straigt");
            scoreField.defaultValue = 15;
        }
        else {
            const scoreField = document.getElementById("Small_straigt");
            scoreField.defaultValue = 0;
        }
    }

    //Fejl ved large straight
    if (savedScore[14] == 0) {
        if (currentDice.includes(2) && currentDice.includes(3) && currentDice.includes(4) && currentDice.includes(5) && currentDice.includes(6)) {
            const scoreField = document.getElementById("Large_straight");
            scoreField.defaultValue = 20;
        }
        else {
            const scoreField = document.getElementById("Large_straight");
            scoreField.defaultValue = 0;
        }
    }


    //Chance
    if (savedScore[15] == 0) {
        let chance = 0;
        for (let e of currentDice) {
            chance += parseInt(e);
        }
        const scoreField = document.getElementById("Chance");
        scoreField.defaultValue = chance;
    }

    //Yatzy
    if (savedScore[16] == 0) {
        if (numberCount.includes(5)) {
            const scoreField = document.getElementById("Yatzy")
            // scoreField.defaultValue = (1 + yeatzyIndex) * 5
            scoreField.defaultValue = 50
        }
        else {
            const scoreField = document.getElementById("Yatzy")
            scoreField.defaultValue = 0
        }
    }
}


function savePoints(saveIndex, inputId) {
    if (savedScore[saveIndex] == 0) {
        const scoreField = document.getElementById("" + inputId)
        currentScore[saveIndex] = scoreField.defaultValue;
        savedScore[saveIndex] = 1;
        if (currentScore[saveIndex] == 0) {
            scoreField.style.background = "red"
        }
        else {
            scoreField.style.background = "green"
        }
        tjekSum();
        tjekTotal();
        reset();
    }
}

function reset() {
    savedDice = [0, 0, 0, 0, 0]
    for (let ds of textDice) {
        ds.style.backgroundColor = "white"
    }
    turn = 0;
    rollAction();
}

function tjekSum() {
    let temSum = 0;
    for (let index = 0; index < 6; index++) {
        temSum += parseInt(currentScore[index])
    }
    sum = temSum;
    let sumField = document.getElementById("Sum");
    sumField.defaultValue = temSum;
    if (sum >= 63) {
        let bonusField = document.getElementById("Bonus");
        bonusField.defaultValue = 50;
        currentScore[7] = bonusField.defaultValue;
    }
}

function tjekTotal() {
    let temTotal = 0;
    for (let index2 = 0; index2 < currentScore.length - 1; index2++) {
        temTotal += parseInt(currentScore[index2])
    }
    total = temTotal;
    let totalField = document.getElementById("Total");
    totalField.defaultValue = total;
}

function cheatSixesYatzy() {
    currentDice = [6, 6, 6, 6, 6];
    turn = 2
    checkForPoints();
}

function cheatHouse() {
    currentDice = [6, 6, 5, 6, 5];
    turn = 2
    checkForPoints();
}

function cheatStraightS() {
    currentDice = [1, 2, 3, 4, 5];
    turn = 2
    checkForPoints();
}

function cheatStraightL() {
    currentDice = [2, 3, 4, 5, 6];
    turn = 2
    checkForPoints();
}

function cheatInfinityDie() {
    turn = 4;
    rollAction();
}

//smart function til straigts
//textdice skal væk
// tilføj game over