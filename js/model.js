var modelController = (function () {
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };

  function addItem(type, desc, val) {
    var newItem, ID;
    ID = 0;

    // generating ID
    if (data.allItems[type].length > 0) {
      var lastIndex = data.allItems[type].length - 1;
      ID = data.allItems[type][lastIndex].id + 1;
    }
    // else {
    //   ID = 0;
    // }

    // depending on type of the field (entry) creating income or expence object
    if (type === "inc") {
      newItem = new Income(ID, desc, parseFloat(val));
    } else if (type === "exp") {
      newItem = new Expense(ID, desc, parseFloat(val));
    }
    // adding new field(entry) / object to the data variable
    data.allItems[type].push(newItem);

    //return new object
    return newItem;
  }

  function deleteItem(type, id) {
    // // find entry by id in income or expenses array
    // var ids = data.allItems[type].map(function (item) {
    //   return item.id;
    // });

    // find index of the entry
    // index = ids.indexOf(id);
    const index = data.allItems[type].findIndex((item) => item.id === id);

    // delete the found entry from the array with the half of index
    if (index !== -1) {
      data.allItems[type].splice(index, 1);
    }
    console.log(data.allItems);
  }

  function calculateTotalSum(type) {
    // var sum = 0;
    // data.allItems[type].forEach(function (item) {
    //   sum = sum + item.value;
    // });
    var sum = data.allItems[type].reduce((acc, item) => acc + item.value, 0);
    return sum;
  }

  function calculateBudget() {
    // calculate all income
    data.totals.inc = calculateTotalSum("inc");

    // calculate all expenses
    data.totals.exp = calculateTotalSum("exp");

    // calculate total budget
    data.budget = data.totals.inc - data.totals.exp;

    // calculate % for enpenses
    if (data.totals.inc > 0) {
      data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
    } else {
      data.percentage = -1;
    }
  }

  function getBudget() {
    return {
      budget: data.budget,
      totalInc: data.totals.inc,
      totalExp: data.totals.exp,
      percentage: data.percentage,
    };
  }

  function calculateProcentages() {
    data.allItems.exp.forEach(function (item) {
      item.calcPercentage(data.totals.inc);
    });
  }

  function getAllIdsAndPercentages() {
    var allPerc = data.allItems.exp.map(function (item) {
      return [item.id, item.getPercentage()];
    });
    return allPerc;
  }

  var data = {
    allItems: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0,
    },
    budget: 0,
    percentage: -1,
  };

  return {
    addItem: addItem,
    deleteItem: deleteItem,
    calculateBudget: calculateBudget,
    getBudget: getBudget,
    calculateProcentages: calculateProcentages,
    getAllIdsAndPercentages: getAllIdsAndPercentages,
    test: function () {
      console.log(data);
    },
  };
})();
