// Side navbar Start
let sideBarPosition = $(".sideBar-content").innerWidth();
$("#sideBar").animate({left: -sideBarPosition}, 1);
$("#sideBar i").click(function () {
    if($("#sideBar").css("left") == "0px"){
        $("#sideBar").animate({left: -sideBarPosition}, 500, function(){
        } );
        
    }else{
        $("#sideBar").animate({left: 0}, 500);
    }
});
// Side navbar End



let myData = document.querySelector("#myData");
// start when load the WebSite
$(document).ready(() => {
    displayInitialMeals("");
    $("#loading").fadeOut(500);
})

async function displayInitialMeals() {
    $("#loading").fadeIn(100);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    response = await response.json();

    if (response.meals) {
        displayMeals(response.meals);
    }
    $("#loading").fadeOut(500);
}
// End when load the webSite

// start ingredients Functions
async function ingredientsAPI(){
    document.querySelector("#search").innerHTML = ""; 
    myData.innerHTML = "";
    $("#loading").fadeIn(100);
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    response = await response.json();
    displayIngredients(response.meals.slice(0, 20));
    $("#loading").fadeOut(500);
}
async function ingredientsMealAPI(ingredient){
    document.querySelector("#search").innerHTML = ""; 
    myData.innerHTML = "";
    $("#loading").fadeIn(100);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    response = await response.json();
    displayMeals(response.meals.slice(0, 20));
    $("#loading").fadeOut(500);
}
function displayIngredients(ingredients) {
    document.querySelector("#search").innerHTML = ""; 

    let cartoona = "";

    const ingredientsToDisplay = ingredients.slice(0, 20); 

    for (let i = 0; i < ingredientsToDisplay.length; i++) {
        cartoona += `
        <div class="col-md-3">
            <div onclick="ingredientsMealAPI('${ingredientsToDisplay[i].strIngredient}')" class="ingredient-card text-center text-white rounded-2">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3 class="h5">${ingredientsToDisplay[i].strIngredient}</h3>
                <p class="ingredient-desc">${ingredientsToDisplay[i].strDescription}</p>
            </div>
        </div> `
    }
    myData.innerHTML = cartoona;
}
// End Ingredients Functions




// start Area Meals Functions
async function AreaAPI(){
    document.querySelector("#search").innerHTML = ""; 
    myData.innerHTML = "";
    $("#loading").fadeIn(100);
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    response = await response.json();
    displayAreas(response.meals);
    $("#loading").fadeOut(500);
}

async function AreaMealsAPI(Area){
    document.querySelector("#search").innerHTML = ""; 
    myData.innerHTML = "";
    $("#loading").fadeIn(100);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`);
    response = await response.json();
    displayMeals(response.meals);
    $("#loading").fadeOut(500);
}
function displayAreas(Areas){
    document.querySelector("#search").innerHTML = ""; 
    let cartoona = "";
    for (let i = 0; i < Areas.length; i++) {
        cartoona += `<div class="col-md-3">
                <div onclick="AreaMealsAPI('${Areas[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${Areas[i].strArea}</h3>
                </div>
        </div>`
    }
    myData.innerHTML = cartoona;
}
// End Area Meals Functions


// www.themealdb.com/api/json/v1/1/search.php?f=a
// Start Search Functions
function performSearch() {
    const searchInput = document.getElementById("searchInputName");
    const mealName = searchInput.value;
    searchByName(mealName);
}

async function searchByName(Name) {
    if (Name.trim() === "") {
        return; 
    }
    myData.innerHTML = "";
    $("#loading").fadeIn(100);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${Name}`);
    response = await response.json();

    if(response.meals){
        displayMeals(response.meals);
    } else {
        displayMeals([]);
    }
    $("#loading").fadeOut(500);
}

function Search() {
    let searchContainer = document.querySelector("#search");

    searchContainer.innerHTML = `
    <div class="row py-4">
        <div class="col-md-8 offset-md-2">
            <div class="input-group">
                <input id="searchInputName" type="text" class="form-control bg-transparent text-white" placeholder="Search for a Meal...">
                <button onclick="performSearch()" class="btn btn-outline-danger">
                    <i class="fa fa-search"></i> Search
                </button>
            </div>
        </div>
    </div>`;

    myData.innerHTML = "";

    document.getElementById("searchInputName").addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            performSearch();
        }
    });
}

// End Search Functions

// www.themealdb.com/api/json/v1/1/categories.php
// Start Meal Categories functions
async function categoriesAPI(){
    document.querySelector("#search").innerHTML = ""; 
    myData.innerHTML = "";
    $("#loading").fadeIn(100);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    response = await response.json();
    DisplayCategories(response.categories);
    $("#loading").fadeOut(500);
}
function DisplayCategories(Categories){
    document.querySelector("#search").innerHTML = ""; 
    let cartoona = "";
    for (let i = 0; i < Categories.length; i++) {
        cartoona += `<div class="col-md-3">
                <div onclick="CategoryMeal('${Categories[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${Categories[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2 cursor-pointer">
                        <h3>${Categories[i].strCategory}</h3>
                        <p>${Categories[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>`
    }
    myData.innerHTML = cartoona
}
// www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
async function CategoryMeal(Category){
    document.querySelector("#search").innerHTML = ""; 
    myData.innerHTML = "";
    $("#loading").fadeIn(100);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Category}`)
    response = await response.json();
    displayMeals(response.meals);
    $("#loading").fadeOut(500);
}
// end Meal Category Functions



// Start Meals View functions
async function DetailsAPI(ID) {

    myData.innerHTML = "";
    $("#loading").fadeIn(100);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`);
    response = await response.json();
    console.log(response.meals[0]);
    displayMealDetails(response.meals[0])
    $("#loading").fadeOut(500);
}
function displayMealDetails(Meal){
    document.querySelector("#search").innerHTML = ""; 
    let Details = document.querySelector("#Details");
    let MealIngredient = ``;
    let tags = Meal.strTags;
    let tagsContent = '';

    for (var i = 1; i <= 20; i++) {
        if (Meal[`strIngredient${i}`]) {
            MealIngredient += `<li class="alert alert-info m-2 p-1">${Meal[`strMeasure${i}`]} ${Meal[`strIngredient${i}`]}</li>`
        }
    }
 
    if(!tags){
        tags = [];
    }

    for (let i = 0; i < tags.length; i++) {
        tagsContent += `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    let cartoona = `
    <div class="col-md-4">
            <img class="w-100 rounded-3" src="${Meal.strMealThumb}"alt="">
                <h2>${Meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p class="text-white">${Meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${Meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${Meal.strCategory}</h3>
                <h3>Recipes : 
                </h3><ul class="d-flex list-unstyled flex-wrap">
                    ${MealIngredient}
                </ul>
                <h3>Tags : 
                </h3><ul class="list-unstyled d-flex flex-wrap">
                    ${tagsContent}
                </ul>
                <a href="${Meal.strSource}" target="_blank" class="btn btn-success">Source</a>
                <a href="${Meal.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
            </div>`
    myData.innerHTML = cartoona;
}
function displayMeals(Meals){
    var cartona = ``;
    for(var i=0 ; i<Meals.length; i++){
        cartona += ` <div class="col-md-3 mb-2">
        <div onclick="DetailsAPI('${Meals[i].idMeal}')"  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${Meals[i].strMealThumb}" alt="" srcset="">
            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                <h3>${Meals[i].strMeal}</h3>
            </div>
            
        </div>
</div>`
    }
    myData.innerHTML = cartona;
}
// End Meals View Functions



// Start ContactUS Functions
let flag1 , flag2 , flag3 , flag4, flag5 , flag6 = false;
function ContactUs() {
    myData.innerHTML = `
    <div class="d-flex g-3 justify-content-center align-items-center" id="contactUs">
    <div class="container w-75 text-center">
        <div class="row">
            <div class="col-md-6">
                <input id="Name" onkeyup="Validation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="Email" onkeyup="Validation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *example@email.com
                </div>
            </div>
            <div class="col-md-6">
                <input id="Number" onkeyup="Validation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="Age" onkeyup="Validation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="Password" onkeyup="Validation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="ConfirmedPassword" onkeyup="Validation()" type="password" class="form-control " placeholder="Repassword">
                <div id="ConfirmedPasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Passwords Doesn't match' match 
                </div>
            </div>
        </div>
        <div id="successMessage" class="alert alert-success mt-4 d-none">
            <strong>Success!</strong> Your message has been submitted. Thank you!
        </div>
       <button id="submitBtn" onclick="handleSubmit()" disabled class="btn btn-outline-danger px-4 mt-4">Submit</button>
    </div>
</div> `;

    submitBtn = document.getElementById("submitBtn");
    document.querySelector("#Name").addEventListener("focus",() => { flag1 = true; });
    document.querySelector("#Email").addEventListener("focus",() => { flag2 = true; });
    document.querySelector("#Number").addEventListener("focus",() => { flag3 = true; });
    document.querySelector("#Age").addEventListener("focus",() => { flag4 = true; });
    document.querySelector("#Password").addEventListener("focus",() => { flag5 = true; });
    document.querySelector("#ConfirmedPassword").addEventListener("focus",() => { flag6 = true;} );
}

function handleSubmit() {
        
        const formContainer = document.querySelector("#contactUs .container");
        const successDiv = document.getElementById("successMessage");
        formContainer.innerHTML = `
            <div class="alert alert-success mt-4">
                <strong>Success!</strong> Your message has been submitted. Thank you!
            </div>
        `;
    }
// End contact Us functions 


// Start Validation Functions
function Validation() {
    if(flag1){
        if (nameRegex) {
            document.getElementById("nameAlert").classList.replace("d-block","d-none");

        }else{
            document.getElementById("nameAlert").classList.replace("d-none","d-block");
        }
    }
    if(flag2){
        if (emailRegex()) {
            document.getElementById("emailAlert").classList.replace("d-block","d-none");
        }else{
            document.getElementById("emailAlert").classList.replace("d-none","d-block");
        }
    }

    if(flag3){
        if(NumberRegex()) {
            document.getElementById("phoneAlert").classList.replace("d-block","d-none");
        }else{
            document.getElementById("phoneAlert").classList.replace("d-none","d-block");
        }
    }

    if(flag4){
        if(AgeRegex()) {
            document.getElementById("ageAlert").classList.replace("d-block","d-none");
        }else{
            document.getElementById("ageAlert").classList.replace("d-none","d-block");
        }
    }

    if(flag5){
        if(PasswordRegex()) {
            document.getElementById("passwordAlert").classList.replace("d-block","d-none");
        }else{
            document.getElementById("passwordAlert").classList.replace("d-none","d-block");
        }
    }
    if(flag6){
        if(confirmPassword()) {
            document.getElementById("ConfirmedPasswordAlert").classList.replace("d-block", "d-none");
        }else{
            document.getElementById("ConfirmedPasswordAlert").classList.replace("d-none", "d-block");
        }
    }
    
    if(nameRegex() && emailRegex()&&NumberRegex()&&  AgeRegex() && PasswordRegex() && confirmPassword()) {
        submitBtn.removeAttribute("disabled");
    }else{
        submitBtn.setAttribute("disabled", true);
    }
}
let flag = 0;
function nameRegex() {
    var regex = /^[a-zA-Z ]+$/;
    var name = document.getElementById("Name").value;
    if(regex.test(name)){
        flag++;
        return true;
    }else{
        return false;
    }
}

function emailRegex() {
    var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var email = document.getElementById("Email").value;
    if(regex.test(email)){
        flag++;
        return true;
    }else{
        return false;
    }
}
function NumberRegex() {
    var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    var Number = document.getElementById("Number").value;
    if(regex.test(Number)){
        flag++;
        return true;
    }else{
        return false;
    }
}
function AgeRegex() {
    var regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
    var Age = document.getElementById("Age").value;
    if(regex.test(Age)){
        flag++;
        return true;
    }else{
        return false;
    }
}
function PasswordRegex() {
    var regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
    var password = document.getElementById("Password").value;
    if(regex.test(password)){
        flag++;
        return true;
    }else{
        return false;
    }
}
function confirmPassword(){
    password = document.getElementById("Password").value;
    ConfirmedPass = document.getElementById("ConfirmedPassword").value;
    if(ConfirmedPass == password){
        flag++;
        return true;
    }else{
        return false;
    }
}
// End Validation Functions
