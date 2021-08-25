export const moneyFilter = {
  filters: {
    moneyFilter(amount) {
      const moneyString = amount.toString()
      const moneyLength = moneyString.length

      if (moneyLength < 4) {
        return `$ ${amount}`
      }
      if (moneyLength >= 4 && moneyLength < 7) {
        return "$ " + moneyString.slice(0, -3) + ',' + moneyString.slice(-3)
      }

      if (moneyLength >= 7 && moneyLength < 10) {
        return "$ " + moneyString.slice(0, -6) + ',' + moneyString.slice(-6, -3) + ',' + moneyString.slice(-3)
      }
    }
  }

}