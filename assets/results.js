// HTML point to variables
var resultsContainer = $('#results')
var backBtn = $('#backBtn')

// Give it a wine and get a food
function getWinePairing() {
  fetch(pairingUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      for (var i = 0; i < data.pairings.length; i++) {
        pairFood = data.pairings[i]
        pairedWineRecipes(pairFood)
      }
    })
}

function pairedWineRecipes() {
  fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${pairFood}&app_key=d0e7ce8996da109b870161b5504f5e87&app_id=b7a56f5e`)
    .then(function (response) {
      return response.json();
    })
    .then(function (dataPF) {
      console.log(dataPF)

      var dh = dataPF.hits[0]
      var resultCardContainer = $('<div>')
      var saveBtn = $('<button>');
      var recipeImg = $('<img>');
      var nameOfRecipe = $('<h2>');
      var linkToRecipe = $('<a>')

      recipeImg.attr('src', dataPF.hits[0].recipe.image);
      saveBtn.text('save');
      saveBtn.attr('class', 'saveBtn');
      recipeImg.attr('class', 'object-scale-down h-48 w-96')
      //   resultEntry.attr('class', 'border-4 border-green-800 border-double my-5')
      linkToRecipe.attr([{
        'href': dh.recipe.url,
        'class': 'recipe-content'
      }])
      resultCardContainer.attr('class', 'recipe px-6 py-4 border-4 border-green-800 border-double my-5')
      nameOfRecipe.attr('class', 'font-bold text-xl mb-2')

      nameOfRecipe.text(dh.recipe.label)
      linkToRecipe.text('Go to Recipe')

      resultsContainer.append(resultCardContainer)
      resultCardContainer.append(recipeImg)
      resultCardContainer.append(nameOfRecipe)
      resultCardContainer.append(linkToRecipe)
      resultCardContainer.append(saveBtn)
    }

    )
}

// Give it a food and get a wine
function getFoodPairing() {
  fetch(foodPairingUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      var resultEntry = $('<div>');
      var pairMatch = $('<p>');
      var pairingText = $('<p>');
      var wineImg = $('<img>');
      var wineLink = $('<a>');
      var saveBtn = $('<button>');

      wineImg.attr('src', data.productMatches[0].imageUrl);
      wineLink.attr({
        'href': data.productMatches[0].link,
        'class': 'recipe-content'
      });
      resultEntry.attr('class', 'recipe px-6 py-4 border-4 border-green-800 border-double my-5')
      pairMatch.attr('class', 'recipe-content');
      pairingText.attr('class', 'recipe-content');

      pairMatch.text('Top Choice: ' + data.productMatches[0].title)
      saveBtn.text('Save');
      pairingText.text(data.pairingText)
      wineLink.text('Grab One Here')

      resultsContainer.append(resultEntry);
      resultEntry.append(wineImg);
      resultEntry.append(pairingText);
      resultEntry.append(pairMatch);
      resultEntry.append(wineLink);
      resultEntry.append(saveBtn);

    })
}

// Get Recipes
function getRecipes() {
  fetch(edrecipeUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < 5; i++) {
        var dh = data.hits[i]
        var resultEntry = $('<div>');
        var resultCardContainer = $('<div>')
        var saveBtn = $('<button>');
        var recipeImg = $('<img>');
        var nameOfRecipe = $('<h2>');
        var linkToRecipe = $('<a>')

        recipeImg.attr({
          'src': data.hits[i].recipe.image,
          'class': 'object-scale-down h-48 w-96'
        });
        saveBtn.text('save');
        saveBtn.attr('class', 'saveBtn');
        //   resultEntry.attr('class', 'border-4 border-green-800 border-double my-5')
        linkToRecipe.attr({
          'href': dh.recipe.url,
          'class': 'recipe-content'
        });
        resultCardContainer.attr('class', 'recipe px-6 py-4 border-4 border-green-800 border-double my-5')
        nameOfRecipe.attr('class', 'font-bold text-xl mb-2')

        nameOfRecipe.text(dh.recipe.label)
        linkToRecipe.text('Go to Recipe')

        resultsContainer.append(resultEntry)
        resultEntry.append(resultCardContainer)
        resultCardContainer.append(recipeImg)
        resultCardContainer.append(nameOfRecipe)
        resultCardContainer.append(linkToRecipe)
        resultCardContainer.append(saveBtn)

      }

    })

}


function getDrinkByName() {
  fetch(cocktailURLDrinkName)
    .then(function (response) {
      return response.json();
    })
    .then(function (dataDrinkName) {
      console.log(dataDrinkName);
      for (var i = 0; i < 5; i++) {
        var entryContainer = $('<div>').appendTo(resultsContainer);
        var drinkName = $('<h2>').appendTo(entryContainer);
        var ingredients = $('<p>').appendTo(entryContainer)
        var instructions = $('<p>').appendTo(entryContainer);
        var measurements = $('<p>').appendTo(entryContainer);
        var thumbNail = $('<img>').appendTo(entryContainer);
        var saveBtn = $('<button>').appendTo(entryContainer);
        // URL issue, if time, revisit this
        // var video = $('<iframe>').appendTo(entryContainer);

        instructions.attr('class', 'recipe-content');
        measurements.attr('class', 'recipe-content');
        ingredients.attr('class', 'recipe-content');
        saveBtn.text('save');
        saveBtn.attr('class', 'saveBtn');
        thumbNail.attr('src', dataDrinkName.drinks[i].strDrinkThumb);
        entryContainer.attr('class', 'recipe');
        // video.attr({
        //   src: dataDrinkName.drinks[0].strVideo,
        //   class: 'aspect-video'
        // });

        var arr = [dataDrinkName.drinks[i].strIngredient1, dataDrinkName.drinks[i].strIngredient2, dataDrinkName.drinks[i].strIngredient3, dataDrinkName.drinks[i].strIngredient4, dataDrinkName.drinks[i].strIngredient5, dataDrinkName.drinks[i].strIngredient6, dataDrinkName.drinks[i].strIngredient7, dataDrinkName.drinks[i].strIngredient8, dataDrinkName.drinks[i].strIngredient9, dataDrinkName.drinks[i].strIngredient10, dataDrinkName.drinks[i].strIngredient11, dataDrinkName.drinks[i].strIngredient12, dataDrinkName.drinks[i].strIngredient13, dataDrinkName.drinks[i].strIngredient14, dataDrinkName.drinks[i].strIngredient15];
        var measArr = [dataDrinkName.drinks[i].strMeasure1, dataDrinkName.drinks[i].strMeasure2, dataDrinkName.drinks[i].strMeasure3, dataDrinkName.drinks[i].strMeasure, dataDrinkName.drinks[i].strMeasure4, dataDrinkName.drinks[i].strMeasure5, dataDrinkName.drinks[i].strMeasure6, dataDrinkName.drinks[i].strMeasure7, dataDrinkName.drinks[i].strMeasure8, dataDrinkName.drinks[i].strMeasure9, dataDrinkName.drinks[i].strMeasure10, dataDrinkName.drinks[i].strMeasure11, dataDrinkName.drinks[i].strMeasure12, dataDrinkName.drinks[i].strMeasure13, dataDrinkName.drinks[i].strMeasure14, dataDrinkName.drinks[i].strMeasure15]

        var ingredientItems = arr.filter(function (el) {
          return el != null;
        });
        var measurementItems = measArr.filter(function (el) {
          return el != null;
        });

        instructions.text(dataDrinkName.drinks[i].strInstructions);
        drinkName.text(dataDrinkName.drinks[i].strDrink);
        measurements.text(measurementItems);
        ingredients.text(ingredientItems);

      }
    })
}

// fetching a Random drink
function randomDrink() {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(function (response) {
      return response.json();
    })
    .then(function (dataRandom) {
      console.log(dataRandom)
      var dataR = dataRandom.drinks[0]
      var ingredientArray = [dataR.strIngredient1, dataR.strIngredient2, dataR.strIngredient3, dataR.strIngredient4, dataR.strIngredient5, dataR.strIngredient6, dataR.strIngredient7, dataR.strIngredient8, dataR.strIngredient9, dataR.strIngredient10, dataR.strIngredient11, dataR.strIngredient12, dataR.strIngredient13, dataR.strIngredient14, dataR.strIngredient15]
      var amountArray = [dataR.strMeasure1, dataR.strMeasure2, dataR.strMeasure3, dataR.strMeasure4, dataR.strMeasure5, dataR.strMeasure6, dataR.strMeasure7, dataR.strMeasure8, dataR.strMeasure9, dataR.strMeasure10, dataR.strMeasure11, dataR.strMeasure12, dataR.strMeasure13, dataR.strMeasure14, dataR.strMeasure15]
      var resultEntry = $('<div>');
      var saveBtn = $('<button>');
      var cocktailImg = $('<img>');
      var nameOfDrink = $('<h2>');
      var drinkRecipe = $('<a>');
      var instructions = $('<p>');

      drinkRecipe.attr('class', 'recipe-content');
      instructions.attr('class', 'recipe-content');
      resultEntry.attr('class', 'recipe border-4 border-green-800 border-double my-5')
      cocktailImg.attr('src', dataR.strDrinkThumb);
      cocktailImg.attr('class', 'object-scale-down h-48 w-96');
      nameOfDrink.attr('class', 'font-bold text-xl mb-2')

      drinkRecipe.text("Go to Recipe");
      nameOfDrink.text(dataR.strDrink);
      saveBtn.text('save');
      saveBtn.attr('class', 'saveBtn');

      var ingredientList = [];
      for (var i = 0; i < ingredientArray.length; i++) {
        console.log(ingredientArray[i])
        console.log(ingredientArray[i] === null)
        if (ingredientArray[i] !== null) {
          ingredientList.push(ingredientArray[i]);
        }
      }
      var amountList = [];
      for (var i = 0; i < amountArray.length; i++) {
        console.log(amountArray[i])
        console.log(amountArray[i] === null)
        if (amountArray[i] !== null) {
          amountList.push(amountArray[i]);
        }
      }
      instructions.text(dataR.strInstructions + '' + 'Ingredients: ' + ingredientList + '.' + ' Amounts: ' + amountList);

      resultsContainer.append(resultEntry);
      resultEntry.append(cocktailImg);
      resultEntry.append(nameOfDrink);
      resultEntry.append(instructions);
      resultEntry.append(saveBtn);
    })
}

// this says depending on what parameters the user choose run the corresponding function 
function apiCalls() {
  if (wine !== "") {
    getWinePairing()
    wine = "";
  } else if (wineP === true && food !== "") {
    getFoodPairing()
    food = "";
    wineP = false
  } else if (food !== "") {
    getRecipes()
    food = "";

  } else if (drinkName !== "") {
    getDrinkByName()
    drinkName = ""
  } else if (random == true) {
    randomDrink()
    // Homepage - the initial value is going to be false and then there is going to be an event listener that sets this to true
    random = false
  }
}
setURL()
function setURL() {
  food = localStorage.getItem("food")
  drinkName = localStorage.getItem("drinkName")
  wine = localStorage.getItem("wine")
  random = localStorage.getItem("random")
  wineP = localStorage.getItem("wineP")

  var recipeApiKey = "0ed1c23457ba46ddaffacdeb0b81d967"; //"20f9574ee747498490dd1bd80b379967"; 
  pairingUrl = `https://api.spoonacular.com/food/wine/dishes?wine=${wine}&apiKey=${recipeApiKey}`;
  // this wine pairing is give it a food and get a wine
  foodPairingUrl = `https://api.spoonacular.com/food/wine/pairing?food=${food}&apiKey=${recipeApiKey}`;
  edrecipeUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${food}&app_key=d0e7ce8996da109b870161b5504f5e87&app_id=b7a56f5e`;

  cocktailURLDrinkName = `https://www.thecocktaildb.com/api/json/v1/1/search.php?key=1&s=${drinkName}`;

  apiCalls()
};

// Click save button to get form to select what party (key) to save recipe to
resultsContainer.on('click', '.saveBtn', function () {
  var currentContainer = $(this).parent();
  var form = $('<form>');
  var input = $('<input>');
  var select = $('<select>');
  var submit = $('<input>');

  input.attr({
    type: 'text',
    list: 'options',
    class: 'input'
  });
  select.attr('id', 'options');
  form.attr('id', 'form');
  submit.attr({
    type: 'submit',
    value: 'Submit',
    id: 'submit'
  })

  form.append(input);
  form.append(submit);
  form.append(select);
  currentContainer.append(form);

  // If there are already form options saved in local storage, pull them down and make them options
  // If this exists,
  if (localStorage.getItem(('formObj').length == 1)) {
    var formObj = localStorage.getItem("formObj");
    var arr = [];
    arr.push(formObj);
    console.log(`type is ${typeof formObj}`);
    for (var i = 0; i < formObj.length; i++) {
      var formEntry = $('<option>');
      console.log(formObj[i]);
      formEntry.text(formObj[i]);
      select.append(formEntry);
    }
  } else if (localStorage.getItem(JSON.parse('formObj').length > 1)) {
    console.log('load form options');
    var formObj = JSON.parse(localStorage.getItem('formObj'));
    console.log(formObj);
    console.log(`type is ${typeof formObj}`);
    for (var i = 0; i < formObj.length; i++) {
      var formEntry = $('<option>');
      console.log(formObj[i]);
      formEntry.text(formObj[i]);
      select.append(formEntry);
    }
  } else if (localStorage.getItem('formObj') == null) {
    console.log('local storage empty, waiting');
    return
  }
})

  $(document).on('click', '#submit', function (e) {
    console.log('form submitted!');
    e.preventDefault();
    console.log('save to formObj');
    if (localStorage.getItem('formObj') == null) {
      localStorage.setItem('formObj', JSON.stringify($('.input').val()));
    } else {
      var formOption = JSON.parse(localStorage.getItem('formObj'));
      var formObj = [];
      formObj.push(formOption);
      formObj.push($('.input').val());
      localStorage.setItem('formObj', JSON.stringify(formObj));
    }
    var recipeObj = {};
    var newKey = $('.input').val();
    var nestedKey = $(this).closest('h2').text();
    var nestedVal = $(this).closest('.recipe').children('.recipe-content');
    var nestedObj = { nestedKey, nestedVal }
    console.log(`option selected is ${newKey}`);
    var newObj = { newKey, nestedObj }
    if (localStorage.getItem('recipeObj') === null) {
      localStorage.setItem('recipeObj', newObj);
      console.log('Saved!');
    } else {
      recipeObj = JSON.parse(localStorage.getItem('recipeObj'));
      console.log(existingOption);
      console.log(optionSelected);
      existingOption.push(recipeText);
    }
  })
