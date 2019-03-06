	//Creates a list 
  let myCard = document.getElementsByClassName("card");
  let myCards = [...myCard];
  console.log(myCards);
  
  //Get elements from html
  let deck = document.querySelector(".deck");
  
  let restart = document.querySelector(".restart");
  
  let moves = document.querySelector(".moves");
  
  let stars = document.querySelectorAll(".fa-star");
  
  let counting = 0;
  
  let timer = document.querySelector("#timer");
  
  let button = document.querySelector(".play-again");
  
  //Array for opened cards
  let openList = [];
  
  //Array for matched cards
  let matchList = [];
  
  // Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue, randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
  //Shuffles cards and starts game
  function startGame() {
    let shuffled = shuffle(myCards);
  
    //Adds cards to the deck
    let appending = function(item) {
      deck.appendChild(item);
    };
  
    for (let i = 0; i < shuffled.length; i++) {
      deck.innerHTML = "";
      [].forEach.call(shuffled, appending);
      shuffled[i].classList.remove("open", "show", "match", "not_match");
    }
    matchList.splice(0, 16);
    counting = 0;
    moves.innerHTML = counting;
  }
  
  document.onload = startGame();
  
  //Flips card that are clicked
  let openedCard = function() {
    this.classList.add("open", "show");
    openList.push(this);
    if (openList.length === 2) {
      countMoves();
      stopClick();
      setTimeout(function() {
        startClick();
      }, 900);
      if (openList[0].innerHTML === openList[1].innerHTML) {
        matchedCards();
      } else if (openList[0].innerHTML != openList[1].innerHTML) {
        noMatch();
      }
    }
  };
  
  //When the cards match
  function matchedCards() {
    openList[0].classList.remove("open", "show");
    openList[0].classList.add("match");
    openList[1].classList.remove("open", "show");
    openList[1].classList.add("match");
    matchList.push(openList[0]);
    matchList.push(openList[1]);
    openList.splice(0, 2);
  }
  
  //When cards don't match
  function noMatch() {
    openList[0].classList.replace("show", "not_match");
    openList[1].classList.replace("show", "not_match");
    setTimeout(function() {
      openList[0].classList.remove("open", "not_match");
      openList[1].classList.remove("open", "not_match");
    }, 1000);
    setTimeout(function() {
      openList.splice(0, 2);
    }, 1100);
  }
  
  //Disables click event on cards
  function stopClick() {
    for (let x = 0; x < myCards.length; x++) {
      myCards[x].classList.add("stop-event");
    }
  }
  
  //Enables click event on cards
  function startClick() {
    for (let x = 0; x < myCards.length; x++) {
      myCards[x].classList.remove("stop-event");
    }
  }
  
  //Counts moves and starts timer
  function countMoves() {
    counting++;
    moves.innerHTML = counting;
  
    //Removes stars after a few moves
    if (counting > 10 && counting < 20) {
      for (let i = 0; i < 3; i++) {
        if (i > 1) {
          stars[i].style.visibility = "collapse";
        }
      }
    } else if (counting > 20) {
      for (let i = 0; i < 3; i++) {
        if (i > 0) {
          stars[i].style.visibility = "collapse";
        }
      }
    }
  }
  
  
  //timer

  let min = 0;
  let sec = 0;
  
  function myTimer() {
    if (counting) {
      timer.innerHTML = min + " minutes " + sec + " seconds";
      sec++;
      if (sec >= 60) {
        sec = 0;
        min++;
      }
    }
  }
  
  //Start the timer
  let startTimer = setInterval(function() {
    myTimer();
  }, 1000);
  
  //Create the modal
  let modalAppear = function() {
    if (matchList.length == 16) {
      clearInterval(startTimer);
  
      let timing = timer.innerHTML;
      let starNumber = document.querySelector(".stars").innerHTML;
  
      document.getElementById("modal-popup").style.display = "block";
      document.querySelector(".total-moves").innerHTML = counting;
      document.querySelector(".total-time").innerHTML = timing;
      document.querySelector(".total-stars").innerHTML = starNumber;
  
      closeModal();
    }
  };
  
  //Closes the modal when play again button is clicked
  function closeModal() {
    button.addEventListener("click", function() {
      document.getElementById("modal-popup").style.display = "none";
      startGame();
      for (let i = 0; i < stars.length; i++) {
        stars[i].style.visibility = "visible";
      }
  
      min = 0;
      sec = 0;
      setInterval(function() {
        myTimer();
      }, 1000);
    });
  }
  
  //FLips card on click
  for (let x = 0; x < myCards.length; x++) {
    myCards[x].addEventListener("click", openedCard);
    myCards[x].addEventListener("click", modalAppear);
  }
  
  //Restarts game when  restart icon is clicked
  restart.addEventListener("click", function() {
    startGame();
    for (let i = 0; i < stars.length; i++) {
      stars[i].style.visibility = "visible";
    }
    min = 0;
    sec = 0;
  });