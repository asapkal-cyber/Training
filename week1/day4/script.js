function myMap(arr, callback) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i, arr));
  }

  return result;
}

function myReduce(arr, callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;

  if (accumulator === undefined) {
    accumulator = arr[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < arr.length; i++) {
    accumulator = callback(accumulator, arr[i], i, arr);
  }

  return accumulator;
}

const numbers = [1, 2, 3, 4];

const doubled = myMap(numbers, num => num * 2);
console.log("My Map:", doubled);

const sum = myReduce(numbers, (a, b) => a + b, 0);
console.log("My Reduce:", sum);

let count = 0;
const countEl = document.getElementById("count");
const incBtn = document.getElementById("inc");
const decBtn = document.getElementById("dec");

incBtn.addEventListener("click", () => {
  count++;
  countEl.innerText = count;
});

decBtn.addEventListener("click", () => {
  count--;
  countEl.innerText = count;
});

const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    const targetTab = button.dataset.tab;

    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabContents.forEach(content => content.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(targetTab).classList.add("active");
  });
});
