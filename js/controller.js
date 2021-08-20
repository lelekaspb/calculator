var controller = (function (budgetCtrl, uiCtrl) {
  var setupEventListeners = function () {
    var DOM = uiCtrl.getDomStrings();
    document.querySelector(DOM.form).addEventListener("submit", ctrlAddItem);

    // click on income - expense table
    document
      .querySelector(DOM.budgetTable)
      .addEventListener("click", ctrlDeleteItem);
  };

  // update % of every expense
  function updatePercentages() {
    // count percentage for every expense
    budgetCtrl.calculateProcentages();
    budgetCtrl.test();

    // get the percentage data from the model
    var idsAndPercents = budgetCtrl.getAllIdsAndPercentages();
    console.log(idsAndPercents);

    // update ui with new percentage
    uiCtrl.updateItemsPercentages(idsAndPercents);
  }

  // function fired when the form is submitted
  function ctrlAddItem(event) {
    event.preventDefault();

    // 1. Get data from the form
    var input = uiCtrl.getInput();

    // check whether fields are not empty
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // 2. Add acquired data into the model
      var newItem = budgetCtrl.addItem(
        input.type,
        input.description,
        input.value
      );
      budgetCtrl.test();

      // 3. Add field (entry) into UI
      uiCtrl.renderListItem(newItem, input.type);

      uiCtrl.clearFields();
      generateTestData.init();

      // 4. Count budget
      updateBudget();

      // 5. Count percentages for every expense
      updatePercentages();
    } // end if
  }

  function ctrlDeleteItem(event) {
    var itemID, splitID, type, ID;
    if (event.target.closest(".item__remove")) {
      // find id of the entry that has to be deleted
      itemID = event.target.closest("li.budget-list__item").id;

      splitID = itemID.split("-"); // "inc-0" => ["inc", "0"]
      type = splitID[0];
      ID = parseInt(splitID[1]);

      // delete entry from the model
      budgetCtrl.deleteItem(type, ID);

      // delete entry from the template
      uiCtrl.deleteListItem(itemID);

      // update budget
      updateBudget();

      // update percentages
      updatePercentages();
    }
  }

  function updateBudget() {
    // 1. calculate budget in the model
    budgetCtrl.calculateBudget();

    // 2. get the calculated budget from the model
    var budgetObj = budgetCtrl.getBudget();

    // 3. display budget in template
    uiCtrl.updateBudget(budgetObj);
  }

  return {
    init: function () {
      console.log("App started!");
      uiCtrl.displayMonth();
      setupEventListeners();
      uiCtrl.updateBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: 0,
      });
    },
  };
})(modelController, viewController);

controller.init();
