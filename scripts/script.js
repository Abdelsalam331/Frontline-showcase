const hero = document.querySelector(".hero");
const mainHeroWord = document.querySelector(".main-hero-word");
const firstWord = document.getElementById("first-word");
const secondWord = document.getElementById("second-word");
const greenCircle = document.querySelector(".green-circle");
const whiteCircle = document.querySelector(".white-circle");
const pop = document.getElementById("pop");
const popTwo = document.getElementById("pop-two");

window.addEventListener("DOMContentLoaded", function () {
  let iterationOne = 0;
  let iterationTwo = 0;
  let typingFirst = [];
  let typingSecond = []; // Separate array for the second word
  let intervalTwo;
  let intervalOne;

  function typingEffect(word, number) {
    const mainWord = word.dataset.word;
    const arrMainWord = mainWord.split("");

    if (number === 1) {
      typingFirst.push(arrMainWord[iterationOne]);
      word.innerHTML = `${typingFirst.join("")}<span class='cursor'></span>`;
      iterationOne++;

      if (iterationOne >= arrMainWord.length) {
        clearInterval(intervalOne);
        word.querySelector(".cursor").remove();

        setTimeout(() => {
          intervalTwo = setInterval(() => typingEffect(secondWord, 2), 100);
        }, 700);
      }
    } else if (number === 2) {
      typingSecond.push(arrMainWord[iterationTwo]);
      word.innerHTML = `${typingSecond.join("")}<span class='cursor'></span>`;
      iterationTwo++;

      // Slow down for the last 3 letters
      if (iterationTwo >= arrMainWord.length - 3) {
        clearInterval(intervalTwo); // Clear the current interval
        intervalTwo = setInterval(() => typingEffect(secondWord, 2), 300);
      }

      if (iterationTwo >= arrMainWord.length) {
        clearInterval(intervalTwo);

        // Trigger second animation
        setTimeout(() => {
          greenCircle.style.animation =
            "600ms cubic-bezier(0.25, 0.72, 0.73, 0.4) explosion";
          mainHeroWord.style.color = "var(--text-color)";
          document.querySelector(".cursor").remove();

          setTimeout(() => {
            greenCircle.remove();
            hero.style.backgroundColor = "var(--primary-color)";

            setTimeout(() => {
              whiteCircle.style.animation =
                "600ms cubic-bezier(0.25, 0.72, 0.73, 0.4) forwards explosion";
              mainHeroWord.style.color = "var(--text-color)";

              setTimeout(() => {
                whiteCircle.remove();
                hero.style.backgroundColor = "var(--secendary-color)";

                setTimeout(() => {
                  pop.style.animation = "1s forwards pop-message-animation";
                  popTwo.style.animation = "1s forwards pop-message-animation";
                }, 300);
              }, 600);
            }, 400);
          }, 400);
        }, 800);
      }
    }
  }

  // Start the first word typing effect after a 500ms delay
  setTimeout(() => {
    intervalOne = setInterval(() => typingEffect(firstWord, 1), 100);
  }, 400);
});
