import './App.css'
import Cell from './Components/Cell'
import { useEffect, useState } from 'react'
// const numOfRow = Math.round(window.innerWidth / 100)
// const numOfCol = Math.round(window.innerHeight / 100)
const numOfRow = 40
const numOfCol = 40
const directions = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
]

const gliderMovements = [
  [0, 1],
  [1, 0],
  [0, -1],
  [1, 1],
  [-1, 1],
]

const gliderGunMovements = [
  [1, -17],
  [1, -18],
]

function App () {
  const [isPaused, setIsPaused] = useState(true)
  const [counter, setCounter] = useState(0)
  const [speed, setSpeed] = useState(1)

  const [grid, setGrid] = useState(() => {
    const grid = []
    for (let i = 0; i < numOfRow; i++) {
      const row = []
      for (let j = 0; j < numOfCol; j++) {
        row.push(0)
      }
      grid.push(row)
    }
    return grid
  })

  const generateRandomGrid = () => {
    const grid = []
    for (let i = 0; i < numOfRow; i++) {
      const row = []
      for (let j = 0; j < numOfCol; j++) {
        row.push(Math.round(Math.random()))
      }
      grid.push(row)
    }
    return grid
  }

  function getRandomColor () {
    let letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  // console.log(window.innerWidth)
  // console.log(window.innerHeight)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCounter(prevState => prevState + 1)
        setGrid((prevState) => {
          const gridCopy2 = prevState.map(inner => inner.slice())
          for (let i = 0; i < numOfRow; i++) {
            for (let j = 0; j < numOfCol; j++) {
              let neighbors = 0
              directions.forEach(([x, y]) => {
                const newI = i + x
                const newJ = j + y
                if (newI >= 0 && newI < numOfRow && newJ >= 0 && newJ <
                  numOfCol) {
                  neighbors = neighbors + prevState[newI][newJ]
                }
              })

              if (neighbors < 2 || neighbors > 3) {
                gridCopy2[i][j] = 0
              } else if (prevState[i][j] === 0 && neighbors === 3) {
                gridCopy2[i][j] = 1
              }
            }
          }
          return gridCopy2
        })
      }
    }, 10)
    return () => clearInterval(interval)
  }, [isPaused])

  const addLiveCellOnClick = (i, j) => {
    setGrid((prevState) => {
      // const gridCopy = prevState // not deep copy that's why doesn't work
      const gridCopy = prevState.map((rows) => {
        return [...rows]
      })
      gridCopy[i][j] = gridCopy [i][j] ? 0 : 1
      return gridCopy
    })

    // another way
    // const [grid, setGrid] = useState(some generated 2d array)
    // const gridCopy = [...grid] // why is this deep copy i feel like it is not lol maybe wait i think it's not
    // const gridCopy = JSON.parse(JSON.stringify(grid)) // another example of deep copy
    // vs const gridCopy = grid // not deep copy
    // gridCopy[i][j] = gridCopy[i][j] ? 0 : 1
    // return setGrid(gridCopy)
  }

  const addGlider = (i, j) => {
    setGrid((prevState) => {
      const gridCopy = prevState.map((rows) => {
        return [...rows]
      })

      gliderMovements.forEach(([x, y]) => {
        const newI = i + x
        const newJ = j + y
        if (newI >= 0 && newI < numOfRow && newJ >= 0 && newJ <
          numOfCol) {
          gridCopy[newI][newJ] = 1
        }
      })

      return gridCopy
    })
  }

  return (
    <div>
      <p>generations: {counter}</p>
      <button onClick={() => {
        setIsPaused(prevState => !prevState)
        console.log('clicked')
      }}>
        {isPaused ? 'play' : 'pause'}
      </button>
      <button onClick={() => {
        console.table(grid)
      }}>
        print grid
      </button>

      <button onClick={() => {
        setGrid(generateRandomGrid)
      }}>
        random
      </button>

      <div>
        <input type="range" min={100} max={3000} value={speed}
               onChange={(event) => setSpeed(parseInt(event.target.value))}/>

        <p>{speed}</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${numOfCol}, 20px)`,
      }}>
        {grid.map((rows, i) => {
          return rows.map((cols, j) => {
            return (
              <Cell key={`${i}-${j}`} grid={grid} i={i} j={j}
                    randomColor={getRandomColor()}
                    onClick={() => addGlider(i, j)}/>
            )
          })
        })}
      </div>

      <p>end</p>

    </div>
  )
}

export default App
