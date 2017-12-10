const fs = require('fs')

const data = `96 32 69 40 148 104 152 119 98 3 54
22 6 95 17 74 157 60 84 142 87 130
141 128 158 113 163 27 171 114 42 165 10
41 63 13 85 45 167 53 50 156 61 103
105 146 153 161 80 154 99 140 75 135 28
122 46 55 2 97 68 133 86 129 47 37
11 134 110 159 36 118 21 169 62 147 106
30 81 24 100 107 91 127 94 123 33 5
70 117 66 90 25 138 16 120 65 102 35
121 39 136 176 143 71 155 88 77 4 20
26 126 15 7 64 150 57 48 19 31 108
9 56 132 34 125 29 175 166 82 164 92
112 174 73 67 76 101 43 51 137 144 12
49 18 58 160 136 162 168 115 38 59 124
109 116 145 52 1 23 89 72 149 173 44
14 83 79 170 93 151 172 111 8 78 131`

const mozartsSystem = data.split('\n').map(line => line.split(' ').map(x => parseInt(x, 10)))

class Note {
  constructor(note, startBeat, length) {
    this.note = note
    this.startBeat = startBeat
    this.length = length
  }
  shift(offset) {
    const newStartBeat = this.startBeat + offset
    return new Note(this.note, newStartBeat, this.length)
  }
  log() {
    console.log(this.note + ' ' + this.startBeat + ' ' + this.length)
  }
}

class Measure {
  constructor() {
    this.notes = []
  }
  addNote(note) {
    this.notes.push(note)
  }
  changeStartingTime(newStartingTime) {
    const offset = newStartingTime - this.notes[0].startBeat
    const newMeasure = new Measure()
    this.notes.forEach((note) => {
      newMeasure.addNote(note.shift(offset))
    })
    return newMeasure
  }
  log() {
    this.notes.forEach(note => {
      note.log()
    })
  }
}

class Composition {
  constructor() {
    this.measures = [new Measure()]
  }
  _getNextMeasureStartBeat() {
     return (this.measures.length * 3)
  }
  _getLastMeasure() {
    return this.measures[this.measures.length - 1]
  }
  addNote(note) {
    if (note.startBeat >= this._getNextMeasureStartBeat()) {
      this.measures.push(new Measure())
    }
    const lastMeasure = this._getLastMeasure()
    lastMeasure.addNote(note)
  }
  addMeasure(measure) {
    const nextMeasureStartBeat = this._getNextMeasureStartBeat()
    const nextMeasure = measure.changeStartingTime(nextMeasureStartBeat - 3)
    this.measures.push(nextMeasure)
  }
  recompose(composer) {
    const newComposition = new Composition()
    while (!composer.isDone()) {
      const nextMeasurePosition = composer.getNextMeasurePostion()
      const nextMeasure = this.measures[nextMeasurePosition - 1]
      newComposition.addMeasure(nextMeasure)
    }
    return newComposition
  }
  log() {
    this.measures.forEach((measure) => {
      measure.log()
    })
  }
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

class Dice {
  roll() {
    return getRandomInt(1, 7)
  }
}

class Mozart {
  constructor() {
    this.trial = 0
    this.totalNumberOfTrials = 16
  }
  isDone() {
    return this.trial === this.totalNumberOfTrials
  }
  getNextMeasurePostion() {
    const dice = new Dice()
    const rollTotal = dice.roll() + dice.roll()
    const result = mozartsSystem[this.trial][rollTotal - 2]
    this.trial += 1
    return result
  }
}

class MozartDummy {
  constructor() {
    this.trial = 0
    this.totalNumberOfTrials = 16
    this.sequence = '104 74 163 85 146 129 169 91 138 77 48 29 137 160 89 131'.split(' ').map(x => parseInt(x, 10))
  }
  isDone() {
    return this.trial === this.totalNumberOfTrials
  }
  getNextMeasurePostion() {
    const result = this.sequence[this.trial]
    this.trial += 1
    return result
  }
}

const readNotes = (data) => {
  const lines = data.split('\n')
  const notes = lines.map(line => {
    const entries = line.split(' ')
    return new Note (entries[0], parseFloat(entries[1]), parseFloat(entries[2]))
  })
  return notes
}

fs.readFile('./mozart-dice-starting.txt', 'utf8'  , (err, data) => {
  if (err) {
    console.error(err)
  }

  const notes = readNotes(data)
  const composition = new Composition()
  notes.forEach((note) => {
    composition.addNote(note)
  })
  const mozart = new MozartDummy()
  const newComposition = composition.recompose(mozart)
})
