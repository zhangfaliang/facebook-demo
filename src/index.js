import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import  './App.css'


//无组件功能组件
function Square(props){

  return(
    <button className='square' onClick={()=>{props.onClick()}}>
      {props.value}
    </button>
    )
}

class Board extends Component {

 
  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={()=>this.props.onClick(i)}/>;
  }
  render() {
    let winner = calculateWinner(this.props.squares)
    let status;
    if(winner){
      status= ' Winner '+ winner
    }else{
     status= 'Next player: ' + (this.props.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends Component {
  constructor(){
    super();
    this.state={
      history:[
      {squares:Array(9).fill(null)}
      ],
      xIsNext:true,
      stepNum:0
    }
  }

    handleClick(i) {
      let history = this.state.history;
      let current = history[this.state.stepNum];
      let squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares
        }]),
        xIsNext: !this.state.xIsNext,
        stepNum:++this.state.stepNum
      });
    }

   jumpTo(step){
    this.setState({
        stepNum:step,
        xIsNext:step%2?false:true   
    })
   if(step==0){
     this.setState({
        history:[
          {squares:Array(9).fill(null)}
          ]
    })
   }else{
    this.setState({
        history:this.state.history.slice(0,step+1)   
    })
   }
    

   }
  render() {
    let history=this.state.history.slice();
    let current=history[this.state.stepNum];
    let winner = calculateWinner(current.squares);
    let status;

    const moves=history.map((stap,move)=>{
      const desc=move?'Move #'+move:'Game Start ';
      return(
        <li key={move}>
          <a href="#" onClick={()=>{this.jumpTo(move)}}>{desc}</a>
        </li>
      )


    })

    if(winner){
      status=' Winner ' +winner;
    }else{
      status=' Next Plary '+ (this.state.xIsNext?'X':'O')
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares}
          onClick={(i)=>{this.handleClick(i)}}
          state={this.state}/>
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('container')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
