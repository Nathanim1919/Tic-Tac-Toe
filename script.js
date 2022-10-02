const getDom = (()=>{

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
    let humanMode = false;
    let aiMode = false;

    return{
      humanMode,
      aiMode,
      board,
      winner,winnerInfo,
      restart,
      player1,
      player2,
      humanPlayMode,
      aiPlayMode,
      intro_page,
      player1_name,
      player2_name,
      p1_sign,
      p2_sign,
      cells,
      dislayWinner,
      goback,
      p1_info,
      p2_info
    }

})();


// event listners
getDom.humanPlayMode.addEventListener('click',startHumanMode);
getDom.aiPlayMode.addEventListener('click',startAiMode);


//global functions
function startHumanMode() {
    if (getDom.player1.value != '' && getDom.player2.value != '') {
        getDom.intro_page.classList.add('close-page');
        getDom.player1_name.textContent = getDom.player1.value;
        getDom.player2_name.textContent = getDom.player2.value;
        getDom.humanMode = true;
        getDom.aiMode = false;
        game.round = 1;

    }
}

function startAiMode() {
        getDom.player1_name.textContent =  'YOU';
        getDom.player2_name.textContent = 'COMPUTER';
        getDom.intro_page.classList.add('close-page');
        getDom.aiMode = true;
        getDom.humanMode = false;
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


// gameboard IIFE 
  const gameboard = (()=>{
      let board = ['','','','','','','','',''];
      const setField = (index,sign)=>{
          if (index > board.length || board[index] != '') return;
          board[index] = sign;
          displayController.updateBoard();
          game.isGameOver();
      };
      const getfield = (index)=>{
          if (index>board.length) return;
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
      getDom.p1_sign.textContent = `--${palyerX.getSign()}--`;
      getDom.p2_sign.textContent = `--${playerO.getSign()}--`;
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

      // minimax algorithm implimentation
      const minimax = (board,depth,isMax) =>{

      }


      // play with AI
      const aiPlayRound = (fild)=>{
             
              let emptyfilds = [];

              // get all available empty fields
              const getEmptyFields = ()=>{
                for (let i = 0; i < 9; i++) {
                  if (gameboard.getfield(i) == '') {
                        emptyfilds.push(i);
                     } 
                 }   
              }

              const aiMove =()=>{
                  // let bestscore = -Infinity;
                  // let score = minimax(emptyfilds());

                  let randomMove = Math.floor(Math.random()*emptyfilds.length);
                  gameboard.setField(emptyfilds[randomMove],getCurrentPlayerSign());
                  isGameOver();
                  round++;
              }
              
              gameboard.setField(fild,getCurrentPlayerSign());
              // isGameOver(); 
              getEmptyFields();
              round++;
              setTimeout(aiMove,500);   
      }



      // show whose turn is now!
      const displayTurn = ()=>{

        if (getCurrentPlayerSign() == 'X') {
          getDom.p1_info.classList.remove('display-info');
          getDom.p2_info.classList.add('display-info');
        }

        if (getCurrentPlayerSign() == 'O') {
          getDom.p1_info.classList.add('display-info');
          getDom.p2_info.classList.remove('display-info');
        }
      }


// two player mode
      const playRound = (fild)=>{
              gameboard.setField(fild,getCurrentPlayerSign());
              displayTurn();
              displayController.updateBoard();
              // isGameOver();
              round++;      
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
          return Array.from(getDom.cells).every(cell=>{
            return (cell.textContent != '');
          });   

         }


         //  get current player sign
        const getCurrentPlayerSign = ()=>{
          return round % 2 === 1?palyerX.getSign():playerO.getSign();
        }

        // is game over(win or draw)
         const isGameOver = ()=>{

            if (winning()) {
              getDom.dislayWinner.textContent  = `--${getCurrentPlayerSign()}  Wins`;
              getDom.winner.classList.add('display');
             
              if(getCurrentPlayerSign() == 'X'){
                   return -1;
              }else if(getCurrentPlayerSign() == 'O'){
                   return 11;
              }
             

            } else if(draw()){

                  getDom.winner.classList.add('display');
                  getDom.dislayWinner.textContent = `--its a draw--`;
                  return 0;
                  
            }


        }
      
        // restart game
        const restartGame =()=>{
          gameboard.reset();
          displayController.updateBoard();
          getDom.winner.classList.remove('display');
          round = 1;
        }

        const returnMenu = ()=>{
          gameboard.reset();
          displayController.updateBoard();
          getDom.winner.classList.remove('display');
          getDom.intro_page.classList.remove('close-page');
          round = 1;
        }
        return{
            playRound,
            getCurrentPlayerSign,
            restartGame,
            returnMenu,
            aiPlayRound,isGameOver,

        }
  })()

  // displayfields
  const displayController = (()=>{
        getDom.restart.addEventListener('click',game.restartGame);
        getDom.goback.addEventListener('click',game.returnMenu);
        getDom.cells.forEach((cell,i) =>{ 
            cell.addEventListener('click',function(e){
              if(cell.textContent != '') return;
              if (getDom.humanMode) {
                game.playRound(i);
              
              }else if(getDom.aiMode){
                game.aiPlayRound(i);
              }
            });  
        });
        const updateBoard = () =>{
          getDom.cells.forEach((cell,i) =>{
            cell.textContent = gameboard.getfield(i);
          })    
        }

    return{
      updateBoard,
    }

  })();