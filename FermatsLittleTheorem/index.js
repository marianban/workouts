var bigInt = require("big-integer")

// The maximum is inclusive and the minimum is inclusive
// Ensures that same number can't be selected twice
const uniqueRandomNumberGenerator = (max) => {
  const testedNumbers = []
  return () => {
    do {
      if (max.subtract(2).lesserOrEquals(testedNumbers.length)) {
        return null
      }
      const randomNumber = bigInt.randBetween(2, max.subtract(1))
      if (!testedNumbers.some(testedNumber => testedNumber.eq(randomNumber))) {
        testedNumbers.push(randomNumber)
        return randomNumber
      }
    } while (true)
  }
}

const canBePrime = (p, a) => {
  return a.modPow(p, p).eq(a)
}

const probabilityOfBeiingPrime = numberOfIterations => 1 - (1 / Math.pow(2, numberOfIterations))

const isPrime = (stringNumber, probability) => {
  let iteration = 1
  const bigNumber = bigInt(stringNumber)
  const getUniqueRandomNumber = uniqueRandomNumberGenerator(bigNumber)
  do {
    const uniqueRandomNumber = getUniqueRandomNumber()
    if (uniqueRandomNumber === null) {
      break
    }
    if (!canBePrime(bigNumber, uniqueRandomNumber)) {
      return false
    }
    iteration += 1
  } while(probabilityOfBeiingPrime(iteration) < probability)

  return true
}

console.log(isPrime("29497513910652490397", 0.9))
console.log(isPrime("29497513910652490399", 0.9))
console.log(isPrime("95647806479275528135733781266203904794419584591201", 0.99))
console.log(isPrime("95647806479275528135733781266203904794419563064407", 0.99))
console.log(isPrime("2367495770217142995264827948666809233066409497699870112003149352380375124855230064891220101264893169", 0.99))
console.log(isPrime("2367495770217142995264827948666809233066409497699870112003149352380375124855230068487109373226251983", 0.99))
