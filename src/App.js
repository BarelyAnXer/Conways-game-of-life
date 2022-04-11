import './App.css'
import { useEffect, useState } from 'react'

const numOfRow = 3
const numOfCol = 3

function App () {
  const [isPaused, setIsPaused] = useState(true)
  const [counter, setCounter] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        console.log(counter)
        setCounter(prevState => prevState + 1)
      }
    }, 300)
    return () => clearInterval(interval)
  }, [isPaused])

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

  return (
    <div>
      <p>{isPaused.toString()}</p>
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

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${numOfCol}, 20px)`,
      }}>
        {grid.map((rows, i) => {
          return rows.map((cols, j) => {
            return (
              <div
                key={`${i}-${j}`}
                style={{
                  width: '20px',
                  height: '20px',
                  border: 'solid 1px',
                  backgroundColor: grid[i][j] === 0 ? 'white' : 'black',
                }}
                onClick={() => {
                  // const [grid, setGrid] = useState(some generated 2d array)
                  const gridCopy = [...grid] // why is this deep copy i feel like it is not lol
                  // const gridCopy = JSON.parse(JSON.stringify(grid)) // another example of deep copy
                  // vs const gridCopy = grid // not deep copy
                  gridCopy[i][j] = gridCopy[i][j] ? 0 : 1
                  return setGrid(gridCopy)

                  // // another way
                  // setGrid((prevState) => {
                  //   const gridCopy = prevState // not deep copy that's why doesn't work
                  //   const gridCopy = prevState.map((rows) => {
                  //     return [...rows]
                  //   })
                  //   gridCopy[i][j] = gridCopy[i][j] ? 0 : 1
                  //   return gridCopy
                  // })
                }
                }>
              </div>
            )
          })
        })}
      </div>

      <p>end</p>

    </div>
  )
}

export default App
