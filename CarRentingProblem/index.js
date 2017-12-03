
const input = `1 12 5 12 13 40 30 22 70 19
23 10 10 29 25 66 35 33 100 65`
/*
const input = `35 184 308 17 249 114
347 232 328 73 295 337`
*/

class BookingRequest {
  constructor(fromDay, toDay) {
    this.fromDay = fromDay
    this.toDay = toDay
  }
  isValid() {
    return this.fromDay < this.toDay
  }
  containsDay(day) {
    return (this.fromDay <= day && day <= this.toDay)
  }
  intersectsWith(bookingRequest) {
    return (
      this.containsDay(bookingRequest.fromDay)
      || this.containsDay(bookingRequest.toDay)
      || bookingRequest.containsDay(this.fromDay)
      || bookingRequest.containsDay(this.toDay)
    )
  }
  intersectsWithAny(bookingRequests) {
    return (
      bookingRequests.length > 0
      && bookingRequests.findIndex(bookingRequest => this.intersectsWith(bookingRequest)) !== -1
    )
  }
}

const zipWith = (xs, ys, f) => xs.map((x, i) => f(x, ys[i]))
const [firstLine, secondLine] = input.split('\n').map(line => line.split(' ').map(x => parseInt(x , 10)))
const bookingRequests = zipWith(firstLine, secondLine, (x, y) => new BookingRequest(x, y))

const findBestSolution = (bestBookingRequests = []) => {
  let newBestBookingRequests = bestBookingRequests
  bookingRequests.forEach(nextBookingRequest => {
    if (nextBookingRequest.isValid() && !nextBookingRequest.intersectsWithAny(bestBookingRequests)) {
      const nextBookingRequests = findBestSolution([...bestBookingRequests, nextBookingRequest])
      const isServingMoreCustomers = nextBookingRequests.length > newBestBookingRequests.length
      if (isServingMoreCustomers) {
        newBestBookingRequests = nextBookingRequests
      }
    }
  })
  return newBestBookingRequests
}

console.log(findBestSolution())
