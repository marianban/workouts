
const input = `7 2
21 9 5 8 10 1 3
10 15`

const lines = input.split('\n')
const values = lines[1].split(' ')
const queries = lines[2].split(' ').map(q => Number(q))

const sortedValues = values.map(v => Number(v)).sort((a, b) => b - a)

queries.forEach(query => {
  let bigger = sortedValues.filter(v => v >= query)
  let smaller = sortedValues.filter(v => v < query).reverse()
  let value = smaller.pop()
  smaller = smaller.reverse()
  while (smaller.length) {
      smaller.pop()
      value += 1
      if (value === query) {
        bigger.push(value)
        value = smaller.reverse().pop()
      }
  }

  console.log(bigger.length ,bigger, smaller)
})
