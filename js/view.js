var viewController = (function () {
  var DOMStrings = {
    inputType: "#input__type",
    inputDescription: "#input__description",
    inputValue: "#input__value",
    form: "#budget-form",
    incomeContainer: "#income__list",
    expenseContainer: "#expenses__list",
    budgetLabel: "#budget-value",
    incomeLabel: "#income-label",
    expensesLabel: "#expenses-label",
    expensesPercentLabel: "#expense-percent-label",
    budgetTable: "#budget-table",
    monthLabel: "#month",
    yearLabel: "#year",
  };

  function getInput() {
    return {
      type: document.querySelector(DOMStrings.inputType).value,
      description: document.querySelector(DOMStrings.inputDescription).value,
      value: document.querySelector(DOMStrings.inputValue).value,
    };
  }

  function formatNumber(num, type) {
    var numSplit, int, dec, newInt, resultNumber;

    num = Math.abs(num); // Math.abs(-10) => 10
    num = num.toFixed(2); // (2.4567832).toFixed(2) => 2.46    (2).toFixed(2) => 2.00
    numSplit = num.split("."); // 45.78 => [45, 78]
    int = numSplit[0]; // integer 45
    dec = numSplit[1]; // decimal 78

    if (int.length > 3) {
      newInt = "";

      console.log(
        "🚀 ~ file: view.js ~ line 40 ~ formatNumber ~ int.length",
        int.length
      );

      for (var i = 0; i < int.length / 3; i++) {
        console.log(i);
        newInt =
          // add comma after every three digits
          "," +
          // cut a piece from the original string
          int.substring(int.length - 3 * (i + 1), int.length - 3 * i) +
          // end of the string, right part
          newInt;

        console.log("inside loop", newInt);
      }
      console.log("outside loop", newInt);
      // remove comma if there is one
      if (newInt[0] === ",") {
        newInt = newInt.substring(1);
      }
      // if the original number equal to zero, the new string will also be equal zero
    } else if (int === "0") {
      newInt = "0";
      // if the original integer consists of 3 or less digits
    } else {
      newInt = int;
    }

    resultNumber = newInt + "." + dec;

    if (type === "exp") {
      resultNumber = "- " + resultNumber;
    } else if (type === "inc") {
      resultNumber = "+ " + resultNumber;
    }

    return resultNumber;
  }

  function renderListItem(obj, type) {
    var containerElement, html;
    if (type === "inc") {
      containerElement = DOMStrings.incomeContainer;
      html = `<li id="inc-${
        obj.id
      }" class="budget-list__item item item--income">
                <div class="item__title">${obj.description}</div>
                <div class="item__right">
                    <div class="item__amount">${formatNumber(
                      obj.value,
                      type
                    )}</div>
                    <button class="item__remove">
                        <img
                            src="./img/circle-green.svg"
                            alt="delete"
                        />
                    </button>
                </div>
            </li>`;
    } else {
      containerElement = DOMStrings.expenseContainer;
      html = `<li id="exp-${
        obj.id
      }" class="budget-list__item item item--expense">
                <div class="item__title">${obj.description}</div>
                <div class="item__right">
                    <div class="item__amount">
                        ${formatNumber(obj.value, type)}
                        <div class="item__badge">
                            <div class="item__percent badge badge--dark">
                                15%
                            </div>
                        </div>
                    </div>
                    <button class="item__remove">
                        <img src="./img/circle-red.svg" alt="delete" />
                    </button>
                </div>
            </li>`;
    }

    // newHtml = html.replace("%id%", obj.id);
    // newHtml = newHtml.replace("%description%", obj.description);
    // newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));

    document
      .querySelector(containerElement)
      .insertAdjacentHTML("beforeend", html);
  }

  function clearFields() {
    var inputDesc, inputVal;
    inputDesc = document.querySelector(DOMStrings.inputDescription);
    inputVal = document.querySelector(DOMStrings.inputValue);
    inputDesc.value = "";
    inputDesc.focus();
    inputVal.value = "";
  }

  function updateBudget(obj) {
    var type;

    console.log(obj.budget);

    if (obj.budget > 0) {
      type = "inc";
    } else {
      type = "exp";
    }

    if (obj.budget === 0) {
      document.querySelector(DOMStrings.budgetLabel).textContent = "0.00";
    } else {
      document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(
        obj.budget,
        type
      );
    }

    document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(
      obj.totalInc,
      "inc"
    );
    document.querySelector(DOMStrings.expensesLabel).textContent = formatNumber(
      obj.totalExp,
      "exp"
    );
    if (obj.percentage > 0) {
      document.querySelector(DOMStrings.expensesPercentLabel).textContent =
        obj.percentage;
    } else {
      document.querySelector(DOMStrings.expensesPercentLabel).textContent =
        "--";
    }
  }

  function deleteListItem(itemID) {
    document.getElementById(itemID).remove();
  }

  function updateItemsPercentages(items) {
    items.forEach(function (item) {
      // display every entry of the array
      console.log(item); // [0, 26]

      var el = document
        .getElementById(`exp-${item[0]}`)
        .querySelector(".item__percent");
      console.log(el);

      if (item[1] >= 0) {
        el.parentElement.style.display = "block";
        el.textContent = item[1] + "%";
      } else {
        el.parentElement.style.display = "none";
      }
    });
  }

  function displayMonth() {
    var now, year, month, monthArray;

    now = new Date();
    year = now.getFullYear(); // 2021
    month = now.getMonth(); // April => 3

    monthArray = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    month = monthArray[month];

    document.querySelector(DOMStrings.monthLabel).innerText = month;
    document.querySelector(DOMStrings.yearLabel).innerText = year;
  }

  return {
    getInput: getInput,
    renderListItem: renderListItem,
    deleteListItem: deleteListItem,
    updateBudget: updateBudget,
    clearFields: clearFields,
    updateItemsPercentages: updateItemsPercentages,
    displayMonth: displayMonth,
    getDomStrings: function () {
      return DOMStrings;
    },
  };
})();
