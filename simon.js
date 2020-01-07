const green = document.getElementById('green');
const violet = document.getElementById('violet');
const blue = document.getElementById('blue');
const orange = document.getElementById('orange');
const LAST_LVL = 10;

class Game {
  constructor(colors, last_lvl=10) {
    this.sequence;
    this.lvlDash;
    this.pointDash;
    this.points = 0;
    this.lvl = 1;
    this.sublvl = 0;
    this.colors = colors;
    this.colorsArray = Object.values(colors);
    this.last_lvl = last_lvl;

    this.selectColor = this.selectColor.bind(this);
    this.nextLvl = this.nextLvl.bind(this);
  }

  /**
   * Start the game
   * @returns {void}
   * @memberof Game
   */
  start() {
    const btnStart = document.getElementById('btnEmpezar');

    this.lvlDash = document.getElementById('level');
    this.pointDash = document.getElementById('point');
    btnStart.classList.add('hide');
  }

  /**
   * Generate the game sequence
   * @returns {void}
   * @memberof Game
   */
  generateSecuence() {
    this.sequence = new Array(this.last_lvl).fill(0).map(x => {
      return Math.floor(Math.random() * 4)
    });
  }

  /**
   * Upgrade level
   * @returns {void}
   * @memberof Game
   */
  nextLvl() {
    this.sublvl = 0;
    this.lightSequence();
    this.addEventClick();
  }

  /**
   * To light up the color sequence
   * @returns {void}
   * @memberof Game
   */
  lightSequence() {
    for (let i = 0; i < this.lvl; i++) {
      const color = this.numberToColor(this.sequence[i]);
      setTimeout(() => this.lightColor(color), 1000 * i);
    }
  }

  /**
   * Iluminate the color
   * @returns {void}
   * @param {string} color
   * @memberof Game
   */
  lightColor(color) {
    this.colors[color].classList.add('light');
    setTimeout(() => this.darkColor(color), 250);
  }

  /**
   * To light down the color
   * @param {string} Color
   * @returns {void} void
   * @memberof Game
   */
  darkColor(color) {
    this.colors[color].classList.remove('light');
  }

  /**
   *
   * Convert the number sequence to color
   * @param {number} Number
   * @returns {string} The Color
   * @memberof Game
   */
  numberToColor(number) {
    switch (number) {
      case 0:
        return 'blue';
      case 1:
        return 'violet';
      case 2:
        return 'orange';
      case 3:
        return 'green';
    }
  }

  /**
   *
   * Convert the color sequence to number
   * @param {string} string 
   * @returns {number}
   * @memberof Game
   */
  colorToNumber(color) {
    switch (color) {
      case 'blue':
        return 0;
      case 'violet':
        return 1;
      case 'orange':
        return 2;
      case 'green':
        return 3;
    }
  }

  /**
   * addEventListener to button colors
   * @returns {void}
   * @memberof Game
   */
  addEventClick() {
    this.colorsArray.forEach(element => {
      element.addEventListener('click', this.selectColor);
    });
  }

  /**
   * removeEventListener to button colors
   * @returns {void}
   * @memberof Game
   */
  removeEventClick() {
    this.colorsArray.forEach(element => {
      element.removeEventListener('click', this.selectColor);
    });
  }

  /**
   * Select the color clicked by the user
   * @returns {void} void
   * @memberof Game
   */
  selectColor(event) {
    const nameColor = event.target.dataset.color;
    const numberColor = this.colorToNumber(nameColor);
    this.lightColor(nameColor);

    if(numberColor === this.sequence[this.sublvl]) {
      this.sublvl++;

      if (this.sublvl == this.lvl) {
        this.removeEventClick();
        this.lvl++;
        this.lvlDash.innerHTML = this.lvl;
        this.pointDash.textContent = this.points += 10;

        if (this.lvl === (this.last_lvl + 1)) {
          const main = document.getElementById('main');
          main.classList.add('hide');

          Swal.fire({
            title: "You've won 🙂",
            html: `You've passed all levels!
                  <span style="font-weight:bold">Points: ${this.points}</span>`,
            icon: 'success',
            confirmButtonText: 'Restart',
            allowOutsideClick: false
          }).then(result => {
            if (result) this.endGame()
          });

        } else {
          alert('Good!');
          setTimeout(this.nextLvl, 1000);
        }
      }
    } else {
      const main = document.getElementById('main');
      main.classList.add('hide');

      Swal.fire({
        title: "You've lost! ☹️",
        html: `Don't worry, you can play again!
              <span style="font-weight:bold">Points: ${this.points}</span>`,
        icon: 'error',
        confirmButtonText: 'Restart',
        allowOutsideClick: false
      }).then(result => {
        if (result) this.endGame();
      });
    }
  }

  endGame() {
    window.location.reload(true);
  }
}

function startGame() {
  const game = new Game({ green, violet, blue, orange }, LAST_LVL);
  game.start();
  setTimeout(() => {
    game.generateSecuence();
    game.nextLvl();
  }, 500)
}