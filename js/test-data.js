var generateTestData = (function () {
  var ExampleItem = function (type, desc, sum) {
    this.type = type;
    this.desc = desc;
    this.sum = sum;
  };

  var testData = [
    new ExampleItem("inc", "Salary", 1245),
    new ExampleItem("inc", "Freelance", 820),
    new ExampleItem("inc", "Partnership program", 110),
    new ExampleItem("inc", "Digital sales", 90),
    new ExampleItem("exp", "Rent", 400),
    new ExampleItem("exp", "Gasoline", 60),
    new ExampleItem("exp", "Groceries", 300),
    new ExampleItem("exp", "Entertainment", 100),
  ];

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function insertInUi() {
    var random = getRandomInt(testData.length);
    var randomItem = testData[random];

    document.querySelector("#input__type").value = randomItem.type;
    document.querySelector("#input__description").value = randomItem.desc;
    document.querySelector("#input__value").value = randomItem.sum;
  }

  return {
    init: insertInUi,
  };
})();

generateTestData.init();
