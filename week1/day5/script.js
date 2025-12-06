const questions = [
  {
    question: "What does HTML stand for?",
    options: ["HyperText Markup Language", "HighText Machine Language", "Hyper Tool Markup"],
    answer: 0
  },
  {
    question: "Which language is used for styling?",
    options: ["HTML", "CSS", "Java"],
    answer: 1
  }
];

let current = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  const q = questions[current];
  questionEl.innerText = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(index);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (selected === questions[current].answer) {
    score++;
  }
  nextBtn.style.display = "block";
}

nextBtn.onclick = () => {
  current++;
  if (current < questions.length) {
    loadQuestion();
    nextBtn.style.display = "none";
  } else {
    questionEl.innerText = "Quiz Finished!";
    optionsEl.innerHTML = "";
    scoreEl.innerText = "Score: " + score;
    nextBtn.style.display = "none";
  }
};

loadQuestion();

const accordionButtons = document.querySelectorAll(".accordion-btn");

accordionButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const currentContent = btn.nextElementSibling;

    document.querySelectorAll(".accordion-content").forEach(content => {
      if (content !== currentContent) {
        content.style.display = "none";
      }
    });

    if (currentContent.style.display === "block") {
      currentContent.style.display = "none";
    } else {
      currentContent.style.display = "block";
    }
  });
});

const images = [
  "https://picsum.photos/400/200?1",
  "https://picsum.photos/400/200?2",
  "https://picsum.photos/400/200?3"
];

let imgIndex = 0;
const img = document.getElementById("carousel-img");

document.getElementById("next-img").onclick = () => {
  imgIndex = (imgIndex + 1) % images.length;
  img.src = images[imgIndex];
};

document.getElementById("prev").onclick = () => {
  imgIndex = (imgIndex - 1 + images.length) % images.length;
  img.src = images[imgIndex];
};

const searchInput = document.getElementById("search");
const items = document.querySelectorAll("#list li");

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  items.forEach(item => {
    const text = item.innerText.toLowerCase();
    item.style.display = text.includes(value) ? "block" : "none";
  });
});
