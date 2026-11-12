class Money {
    #money = 0
    #allTimeMoney = 0

    constructor(start = 0) {
        this.#money = start
    }

    add(amount) {
        this.#money += amount
        this.#allTimeMoney += amount
    }

    subtract(amount) {
        this.#money -= amount
    }

    spend(amount) {
        if (this.#money < amount) return false;
        else {
            this.#money -= amount
            return true
        }
    }

    get() { return this.#money }
    set(value) { this.#money = value }
}