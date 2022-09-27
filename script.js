let X_CLASS = 'x';
let CIRCLE_CLASS = 'circle';
let circleTurn = false;
const board = document.querySelector('#board');
const winner = document.querySelector('.showWinner');
const winnerInfo = document.querySelector('.show');
const restart = document.querySelector('.restart');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');

const humanPlayMode = document.querySelector('.human-play-mode');
const aiPlayMode = document.querySelector('.ai-play-mode');

const intro_page = document.querySelector('.intro');
const player1_name = document.querySelector('.p1-name')
const player2_name = document.querySelector('.p2-name')
const p1_sign = document.querySelector('.p1-sign');
const p2_sign = document.querySelector('.p2-sign');
const cells = document.querySelectorAll('[data-cell]');
const dislayWinner = document.querySelector('.dislayWinner');
const goback = document.querySelector('.goback');

const p1_info = document.querySelector('.p1');
const p2_info = document.querySelector('.p2');


var humanMode = false;
var aiMode = false;


// event listners
humanPlayMode.addEventListener('click',startHumanMode);
aiPlayMode.addEventListener('click',startAiMode);



// functions
function startHumanMode() {
    if (player1.value != '' && player2.value != '') {
        intro_page.classList.add('close-page');
        player1_name.textContent = player1.value;
        player2_name.textContent = player2.value;
        humanMode = true;
        aiMode = false;
        game.round = 1;

    }
}


function startAiMode() {
        player1_name.textContent =  'YOU';
        player2_name.textContent = 'COMPUTER';
        intro_page.classList.add('close-page');
        aiMode = true;
        humanMode = false;
        game.round = 1;
    }






// player factorial functions
const Player = (sign) => {
      this.sign = sign;

      const getSign = () => {
        return sign;
      };

      return { 
        getSign
      };
  };


// gameboard
  const gameboard = (()=>{

      let board = ['','','','','','','','',''];
      
      const setField = (index,sign)=>{
          if (index > board.length || board[index] != '') {
            return;
          }
          board[index] = sign;
          displayController.updateBoard();
      };





      const getfield = (index)=>{
          if (index>board.length) {
            return
          }

          return board[index];
      };


      const reset = () =>{
          for (let i = 0; i < board.length; i++) {
            board[i] = '';
            
          }
      };



      return{

          setField,
          getfield,
          reset,
      };

  })();




  // gamecontroller
  const game = (()=>{


      const palyerX = Player('X');
      const playerO = Player('O');

      p1_sign.textContent = `--${palyerX.getSign()}--`;
      p2_sign.textContent = `--${playerO.getSign()}--`;


      let round  = 1;
      let POSSIBLE_WINNING_COMBINATIONS = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
      ];


      const aiPlayRound = (fild)=>{

              const you = Player('X'); 
              const ai = Player('O');
              let emptyfilds = [];

              // let round = 1;

               //  get current player sign
              const getCurrentPlayerSign = ()=>{
                return round % 2 === 1?you.getSign():ai.getSign();
              }
            


              const getEmptyFields = ()=>{
                for (let i = 0; i < 9; i++) {
                  if (gameboard.getfield(i) == '') {
                    emptyfilds.push(i);
                  }
                  
                }
                  
              }
            
            
              const aiMove =()=>{
                  let random = Math.floor(Math.random()*emptyfilds.length);
                  gameboard.setField(emptyfilds[random],getCurrentPlayerSign());

                  if (winning()) {
                    dislayWinner.textContent  = `--${getCurrentPlayerSign()}  Wins`;
                    winner.classList.add('display');
                    console.log('o is the winner')
                    return;
                  }
                  
    
                  else if(draw()){
                    winner.classList.add('display');
                    dislayWinner.textContent = `--its a draw--`;
                    round = 1;
                  }

                  round++;
              }
            
              gameboard.setField(fild,getCurrentPlayerSign());

              if (winning()) {
                dislayWinner.textContent  = `--${getCurrentPlayerSign()}  Wins`;
                winner.classList.add('display');
                console.log('x is the winner')
                return;
              }
              

              else if(draw()){
                winner.classList.add('display');
                dislayWinner.textContent = `--its a draw--`;
                round = 1;
              }




              round++;
              getEmptyFields();
              setTimeout(aiMove,300);
             

            
             displayController.updateBoard();

          
      }


// two player mode
      const playRound = (fild)=>{

              gameboard.setField(fild,getCurrentPlayerSign());
              displayController.updateBoard();

              

            
              if (getCurrentPlayerSign() == 'X') {
                p1_info.classList.remove('display-info');
                p2_info.classList.add('display-info');
              }

              if (getCurrentPlayerSign() == 'O') {
                p1_info.classList.add('display-info');
                p2_info.classList.remove('display-info');
              }

                
              if (winning()) {
                dislayWinner.textContent  = `--${getCurrentPlayerSign()}  Wins`;
                winner.classList.add('display');
              }
              

                else if(draw()){
                  winner.classList.add('display');
                  dislayWinner.textContent = `--its a draw--`;
                  round = 1;
                }
                
                round++;
        
        }

        //  get current player sign
        const getCurrentPlayerSign = ()=>{
            return round % 2 === 1?palyerX.getSign():playerO.getSign();
        }



        // check possible winning conditions
        const winning = ()=>{
              return POSSIBLE_WINNING_COMBINATIONS.some(combination=>{
                return combination.every(index=>{
                  return gameboard.getfield(index) == getCurrentPlayerSign();
                });
              });
        }

        
        // check for draw
        const draw = ()=>{
          return Array.from(cells).every(cell=>{
            return (cell.textContent != '');
          });   

         }

        // restart game
        const restartGame =()=>{
          gameboard.reset();
          displayController.updateBoard();
          winner.classList.remove('display');
          round = 1;
        }

        const returnMenu = ()=>{
          gameboard.reset();
          displayController.updateBoard();
          winner.classList.remove('display');
          intro_page.classList.remove('close-page');
          round = 1;
        }

        if (winning()) {
          winner.classList.add('display');
          winnerInfo.textContent = `--${getCurrentPlayerSign()}--`;
          round = 1;
        }

        

        return{

            playRound,
            getCurrentPlayerSign,
            restartGame,
            returnMenu,
            aiPlayRound,
            winning,
            draw,

        }
  })()



  // displayfields
  const displayController = (()=>{

        restart.addEventListener('click',game.restartGame);
        goback.addEventListener('click',game.returnMenu);

       
        cells.forEach((cell,i) =>{ 
            cell.addEventListener('click',function(e){
              if(cell.textContent != '') return;
              if (humanMode) {
                game.playRound(i);
              
              }else if(aiMode){
                game.aiPlayRound(i);
              }
            });
          
        });
        

        const updateBoard = () =>{
          cells.forEach((cell,i) =>{
            cell.textContent = gameboard.getfield(i);
          })    

        }
    return{
      updateBoard,
    }

  })();








