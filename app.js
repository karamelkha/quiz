// const formLabel = ".formRadio__radiobutton";
// const formLabelChecked = "formRadio__radiobutton--checked";
// const radiobuttons = document.querySelectorAll(formLabel);
// let pageCount = document.querySelector(".pageCount__current");
// const pages = document.querySelectorAll(["data-pages"]);
// let btnsNav = document.querySelectorAll(".quiz__buttonsNav button");

// radiobuttons.forEach((radiobutton) => {
//   radiobutton.addEventListener("change", ({ target }) => {
//     radiobuttons.forEach((item) => {
//       item.classList.remove(formLabelChecked);
//     });

//     if (target.checked) {
//       target.closest(formLabel).classList.add(formLabelChecked);
//       btnsNav.forEach((btn) => {
//         btn.classList.add("quiz__buttonsNav--active");
//       });
//     } else {
//       target.closest(formLabel).classList.remove(formLabelChecked);
//       btnsNav.forEach((btn) => {
//         btn.classList.remove("quiz__buttonsNav--active");
//       });
//     }
//   });
// });

const questions = [
  {
    question: "Для кого вы ищете учебное заведение?",
    answers: ["Себе", "Супругу/супруге", "Родственнику", "Коллеге", "Ребенку", "Другое"],
  },
  {
    question: "Какое образование уже есть?",
    answers: ["9 классов", "Колледж", "11 классов", "Высшее"],
  },
  {
    question: "Какую форму обучения предпочитаете?",
    answers: ["Очную", "Заочную", "Дистанционную"],
  },
];

const headerContainer = document.querySelector("#quiz__header");
const listContainer = document.querySelector("#quiz__list");
const submitBtn = document.querySelector("#quiz__submit");

let questionIndex = 0;

clearPage();
showQuestion();
submitBtn.addEventListener("click", checkAnswer);

function clearPage() {
  headerContainer.innerHTML = "";
  listContainer.innerHTML = "";
}

function showQuestion() {
  // рендер вопроса - обращение к массиву по индексу вопроса
  questions[questionIndex]["question"];
  // генерация вопроса
  const headerTemplate = `<h2 class="quiz__title">%title%</h2>`;
  title = headerTemplate.replace("%title%", questions[questionIndex]["question"]);
  headerContainer.innerHTML = title;

  // 1  вариант генерации (через for of и entries) for of не возвращает массив, поэтому вызовем метод entries(вернет индекс и значение))
  // console.log(index + 1, answerText)
  // for ([index, answerText] of questions[questionIndex]["answers"].entries()) {
  //   const questionTemplate = `<label>
  //   <span>%answer%</span>
  //   <input value="%number%" type="radio" class="quiz__answer" name="answer" />
  //   </label>`;
  //   const answerHTML = questionTemplate.replace("%answer%", answerText);

  //   listContainer.innerHTML += answerHTML;
  // }

  // 2 вариант (переменная)
  for ([answerNumber, answerText] of questions[questionIndex]["answers"].entries()) {
    const questionTemplate = `<label>
    <span>%answer%</span>
    <input value="%number%" type="radio" class="quiz__answer" name="answer" />
    </label>`;
    const answerHTML = questionTemplate.replace("%answer%", answerText).replace("%number%", answerNumber);
    listContainer.innerHTML += answerHTML;
  }
}

function checkAnswer() {
  const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
  if (!checkedRadio) {
    submitBtn.blur();
    return;
  }
  const userAnswer = checkedRadio.value;

  if (questionIndex !== questions.length - 1) {
    questionIndex++;
    clearPage();
    showQuestion();
    return;
  } else {
    clearPage();
    showSubmitForm();
  }
}

function showSubmitForm() {
  console.log("submit");
  let submitFormTemplate = `        
  <form action="">
          <h2>Заполните данные для обратной связи</h2>
          <label>
            <input
              type="text"
              placeholder="Введите ваше имя"
              autocomplete="name" required
            />
          </label>
          <label>
            <input
              type="number"
              placeholder="Введите ваш телефон" required
              autocomplete="mobile"
            />
          </label>
          <label>
            <input
              type="email"
              placeholder="Введите ваш email"
              autocomplete="email" required
            />
          </label>
        </form>`;
  headerContainer.innerHTML = submitFormTemplate;
  submitBtn.addEventListener("click", checkForm);
}

function checkForm() {
  let inputs = document.querySelectorAll("input");
  inputs.forEach((elem) => {
    let formValue = elem.value;
    console.log(formValue);
    if (formValue) {
      showLastPage();
    } else {
      alert("Заполните поля");
      return;
    }
  });
}

function showLastPage() {
  submitBtn.blur();
  clearPage();
  let lastPageTemplate = `<p>Спасибо! Данные приняты в обратку.</p>`;
  headerContainer.innerHTML = lastPageTemplate;
  submitBtn.innerHTML = "Заполнить форму еще раз";
  submitBtn.addEventListener("click", function () {
    history.go();
  });
}
