function Cell (props) {
  return (
    <div
      style={{
        width: '20px',
        height: '20px',
        border: 'solid 1px',
        backgroundColor: props.grid[props.i][props.j] === 0 ? 'white' : 'black',
        // backgroundColor: props.grid[props.i][props.j] === 0
        //   ? 'white'
        //   : props.randomColor,
      }}
      onClick={props.onClick
      }>
    </div>
  )
}

export default Cell
