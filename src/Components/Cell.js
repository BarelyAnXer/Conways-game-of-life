function Cell (props) {
  return (
    <div
      style={{
        width: '20px',
        height: '20px',
        border: 'solid 1px',
        backgroundColor: props.isRainbow ?
          (props.grid[props.i][props.j] === 0
            ? 'white'
            : props.randomColor)
          :
          (props.grid[props.i][props.j] === 0
            ? 'white'
            : 'black'),
      }}
      onClick={props.onClick
      }>
    </div>
  )
}

export default Cell
