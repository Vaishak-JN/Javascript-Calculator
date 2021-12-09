class Calculator {
    constructor(prevOpText, currentOpText) {
        this.prevOpText = prevOpText
        this.currentOpText = currentOpText
        this.clear()
    }

    delete() {
        this.currentOp = this.currentOp.toString().slice(0, -1)
    }

    clear() {
        this.currentOp = ""
        this.prevOp = ""
        this.operation = undefined
    }

    appendNum(number) {

        if (number === "." && this.currentOp.includes(".")) return

        // toString() is used otherwise javascript will add the numbers instead of appending them
        this.currentOp = this.currentOp.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOp === "") return
        if (this.prevOp !== "") {
            this.compute()
        }
        this.operation = operation
        this.prevOp = this.currentOp
        this.currentOp = ""
    }

    compute() {
        let res
        const prev = parseFloat(this.prevOp)
        const current = parseFloat(this.currentOp)
        if (isNaN(prev) || isNaN(current)) return

        switch (this.operation) {
            case "+":
                res = prev + current
                break
            case "-":
                res = prev - current
                break
            case "*":
                res = prev * current
                break
            case "÷":
                res = prev / current
                break
            default:
                return
        }
        this.currentOp = res
        this.operation = undefined
        this.prevOp = ""
    }

    getDisplayNumber(number) {
        const stringNum = number.toString()
        const integerDigits = parseFloat(stringNum.split(".")[0])
        const decimalDigits = stringNum.split(".")[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ""
        } else {
            integerDisplay = integerDigits.toLocaleString("en", { maximumFractionDigits: 0 })
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }


        // const floatNum = parseFloat(number)
        // this doesn't work for number="." 

        // if (isNaN(floatNum)) return ""
        // return floatNum.toLocaleString("en")
    }
    updateDisplay() {
        this.currentOpText.innerText = this.getDisplayNumber(this.currentOp)
        if (this.operation != null) {
            this.prevOpText.innerText = `${this.getDisplayNumber(this.prevOp)} ${this.operation}`
        } else {
            this.prevOpText.innerText = ""
        }

    }

}



const numberBtn = document.querySelectorAll("[data-number]")
const operationBtn = document.querySelectorAll("[data-operation]")
const equalsBtn = document.querySelector("[data-equals]")
const deleteBtn = document.querySelector("[data-delete]")
const allClearBtn = document.querySelector("[data-all-clear]")
const prevOpText = document.querySelector("[data-prev-op]")
const currentOpText = document.querySelector("[data-current-op]")


const calculator = new Calculator(prevOpText, currentOpText)

numberBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        calculator.appendNum(btn.innerText)
        calculator.updateDisplay()
    })
})

operationBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        calculator.chooseOperation(btn.innerText)
        calculator.updateDisplay()
    })
})

equalsBtn.addEventListener("click", () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearBtn.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteBtn.addEventListener("click", () => {
    calculator.delete()
    calculator.updateDisplay()
})