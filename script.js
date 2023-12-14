class Survey {
  constructor(questions) {
    this.questions = questions;
    this.selectionItems = document.querySelectorAll(".selection__item");
    this.nextButton = document.getElementById("nextButton");
    this.countElement = document.querySelector(".count");
    this.textElement = document.querySelector(".text");
    this.resultElement = document.querySelector(".result");
    this.questionNumberElement = document.querySelector(".questionNumber");
    this.currentCount = 1;
    this.answers = [];

    this.init();
  }

  init() {
    this.nextButton.addEventListener("click", () => this.onNextButtonClick());
    this.selectionItems.forEach((item, index) => {
      item.dataset.value = index + 1;
      item.addEventListener("click", () => this.onSelectionItemClick(item));
    });

    this.updateQuestion();
  }

  onNextButtonClick() {
    const selectedAnswer = document.querySelector(".selection__item.active").dataset.value;
    this.answers.push(parseInt(selectedAnswer, 10));

    this.currentCount++;

    if (this.currentCount <= this.questions.length) {
      this.updateQuestion();
    } else {
      this.textElement.textContent = "";
      this.nextButton.setAttribute("disabled", "disabled");
      this.selectionItems.forEach((el) => el.classList.remove("active"));

      const sum = this.answers.reduce((acc, answer) => acc + answer, 0);

      let interpretation = "";
      let imageSrc = "";
      let interpretationText = "";
      if (sum >= 10 && sum <= 20) {
        interpretation = "Низький рівень проекції";
        imageSrc = "./icon/Low_lvl.png";
        interpretationText = "низький рівень проекції";
        openModal(imageSrc, interpretationText, "low");
      } else if (sum >= 21 && sum <= 30) {
        interpretation = "Середній рівень проекції";
        imageSrc = "./icon/Middle_lvl.png";
        interpretationText = "Середній рівень проекції";
        openModal(imageSrc, interpretationText, "middle");
      } else if (sum >= 31 && sum <= 40) {
        interpretation = "Високий рівень проекції";
        imageSrc = "./icon/High_lvl.png";
        interpretationText = "Високий рівень проекції";
        openModal(imageSrc, interpretationText, "high");
      }
    }
  }

  onSelectionItemClick(item) {
    this.selectionItems.forEach((el) => el.classList.remove("active"));

    item.classList.add("active");

    const selectedAnswer = document.querySelector(".selection__item.active");
    if (selectedAnswer) {
      this.nextButton.removeAttribute("disabled");
    } else {
      this.nextButton.setAttribute("disabled", "disabled");
    }
  }

  updateQuestion() {
    this.textElement.textContent = this.questions[this.currentCount - 1];
    this.countElement.textContent = `${this.currentCount}/${this.questions.length}`; //
    this.questionNumberElement.textContent = this.currentCount;
    this.nextButton.setAttribute("disabled", "disabled");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const questions = [
    "Мої реакції на конфлікти  значно гостріші, аніж повинні бути",
    "Коли я знаходжуся в конфліктній ситуації, я переживаю відчуття, які нагадують мені про те, як я себе почував (-ла) у минулих конфліктах.",
    "У конфліктній ситуації я помічаю, що фокусую увагу на тому, що говорить або робить інший.",
    "Я помічаю, що використовую гучні вирази для опису мого конфлікту з іншими, такі як “завжди” або “ніколи”.",
    "В інших я помічаю позитивні якості, яких не знаходжу у собі.",
    "В інших я помічаю негативні риси, які мені важко прийняти у собі",
    "Мені важко визнавати помилку. Замість цього я одразу звертаю увагу на щось, що зробив або сказав хтось інший, покладаючи на нього вину за помилку.",
    "Я відключаюся, коли хтось говорить мені щось, чого я не хочу чути.",
    "Коли я знаю, що не подобаюсь комусь, я уникаю таких людей, тікаю від них як від чуми.",
    "Я помічаю, що виголошую моральні судження про характер або поведінку людей, які мені не подобаються. ",
  ];

  const survey = new Survey(questions);
});

function openModal(imageSrc, text, level) {
  const modal = document.getElementById("myModal");
  const modalImage = document.getElementById("modalImage");
  const modalText = document.getElementById("modalText");
  const modalContent = document.querySelector(".modal-content");

  modal.style.display = "block";
  modalImage.src = imageSrc;
  modalText.textContent = text;

  modalContent.className = "modal-content " + level;
}

function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}
