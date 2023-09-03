$("document,html").ready(function(){
    $(".spinner").fadeOut(1000,function(){
        $("#loading").fadeOut(1000,function(){
            $("body").css("overflow","auto")
        })
    })
//======>>> Start Said Bar
let saidBarInnerWidth=$("#innerSaidbar").innerWidth()
$("#saidbar").css("left",-saidBarInnerWidth)
$("#openClose").click(function(){
    if($("#saidbar").css("left")=="0px"){   
        $("#saidbar").animate({left:-saidBarInnerWidth},500)
    }else{
        $("#saidbar").animate({left:"0"},500)
    }
})
//======>>> End Said Bar
//======>>> Start Search Section
$("#search").click(function(){
    $("#mainSection").addClass("d-none")
    $(".searchSection").removeClass("d-none")
    $(".searchSection").addClass("d-flex")
    $("#contactUs").addClass("d-none")
})

$(".search1").keyup(function (e) { 
    getSerchData($(".search1").val())
    
});

let searchList=[]
async function getSerchData(val){
let cateRespons = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`)
    let cateData = await cateRespons.json();
    console.log(cateData);
    searchList=cateData.meals;
    console.log(searchList);
    displaySearchInpit()
}
function displaySearchInpit(){
    let str=''
    for(let i=0; i<searchList.length; i++){
        str+=` 
        <div class="col-md-3 p-3 rounded-2">   
        <div class="inner "> 
        <div class="img ">
                    <img class='w-100 rounded-2' src="${searchList[i].strMealThumb}" alt="">
                </div>
                <div class="layer p-3 d-flex align-items-center"'>
                    <p class="fs-3 fw-bold">${searchList[i].strMeal}</p>
                </div>
                </div>
                </div>
                `
            } 
    $(".myRow1").html(str);
}
//======>>> End Search Section
//======>>> Start Search Meal Section 
let searchMeals=[];
async function getSearchData(){
    let searchRespons=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let searData=await searchRespons.json()
    searchMeals=searData.meals
    displaySearchDate()
}
getSearchData()
function displaySearchDate(){
    let str=''
    for(let i=0; i<searchMeals.length; i++){
        str+=` 
        <div class="col-md-3 p-3 rounded-2">   
            <div class="inner "> 
                <div class="img ">
                    <img class='w-100 rounded-2' src="${searchMeals[i].strMealThumb}" alt="">
                </div>
                <div class="layer p-3 d-flex align-items-center"'>
                    <p class="fs-3 fw-bold">${searchMeals[i].strMeal}</p>
                </div>
            </div>
        </div>`
    } 
    document.getElementById("myRow").innerHTML=str
}
//======>>> End Search Meal Section 
//======>>> Start Category Section
let categoryMeals=[]
async function getCategoryData(){
let cateRespons = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let cateData = await cateRespons.json()
    categoryMeals=cateData.categories;
    displayCategoryDate()
}
function displayCategoryDate(){
    let str=``
    for(let i=0; i<categoryMeals.length; i++){
        str+=`
        <div class="col-md-3 p-3 rounded-2">   
            <div data-strCategory="${categoryMeals[i].strCategory}" class="inner text-center"> 
                <div class="img ">
                <img class='w-100 rounded-2' src="${categoryMeals[i].strCategoryThumb}" alt="">
                </div>
                <div class="layer p-3 "'>
                    <h4 class="fs-3 fw-bold">${categoryMeals[i].strCategory}</h4>
                    <p>${categoryMeals[i].strCategoryDescription}</p>
                </div>
            </div>
        </div>`
    } 
    document.getElementById("myRow").innerHTML=str;
    $(".inner").click(function (e) { 
        let strCategory = $(this).attr("data-strCategory")
        getCategoryDataList(strCategory);
    })
} 
let categoryMealsList=[]
async function getCategoryDataList(data){
let cateRespons = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${data}`)
    let cateData = await cateRespons.json()
    console.log(cateData);
    categoryMealsList=cateData.meals;
    displayCategoryDateList()
}
function displayCategoryDateList(){
    let str=''
    for(let i=0; i<categoryMealsList.length; i++){
        str+=` 
        <div class="col-md-3 p-3 rounded-2">   
            <div class="inner "> 
                <div class="img ">
                    <img class='w-100 rounded-2' src="${categoryMealsList[i].strMealThumb}" alt="">
                </div>
                <div class="layer p-3 d-flex align-items-center"'>
                    <p class="fs-3 fw-bold">${categoryMealsList[i].strMeal}</p>
                </div>
            </div>
        </div>`
    } 
    document.getElementById("myRow").innerHTML=str
}
$("#categories").click(function(){
    $("#mainSection").removeClass("d-none")
    $(".searchSection").addClass("d-none")
    $("#contactUs").addClass("d-none")
    getCategoryData()
})
//======>>> End Categories Section
//======>>> Start Area Section
let areaMeals=[]
async function getAreaData(){
let areaRespons = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let areaData = await areaRespons.json()
    areaMeals=areaData.meals;
    displayAreaDate()
}
function displayAreaDate(){
    let str=``
    for(let i=0; i<areaMeals.length; i++){
        str+=`
        <div class="col-md-3 p-3 text-white">   
            <div data-strArea="${areaMeals[i].strArea}" class="inner text-center"> 
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h2>${areaMeals[i].strArea}</h2>
            </div>
        </div>
        `
    } 
    document.getElementById("myRow").innerHTML=str
    $(".inner").click(function(e){
        let strArea=$(this).attr("data-strArea")
        getAreaDataList(strArea)
    })
}
let areaMealsList=[]
async function getAreaDataList(data){
    let areaRespons = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${data}`)
    let areaData = await areaRespons.json()
    areaMealsList=areaData.meals;
    
    displayAreaDateList()
}
function displayAreaDateList(){
    let str=``
    for(let i=0; i<areaMealsList.length; i++){
        str+=`
        <div class="col-md-3 p-3 rounded-2">   
            <div class="inner "> 
                <div class="img ">
                    <img class='w-100 rounded-2' src="${areaMealsList[i].strMealThumb}" alt="">
                </div>
                <div class="layer p-3 d-flex align-items-center"'>
                    <p class="fs-3 fw-bold">${areaMealsList[i].strMeal}</p>
                </div>
            </div>
        </div>
        `
    } 
    document.getElementById("myRow").innerHTML=str
}
$("#area").click(function(){
    $("#mainSection").removeClass("d-none")
    $(".searchSection").addClass("d-none")
    $("#contactUs").addClass("d-none")
    getAreaData()
})
//======>>> End Area Section
//======>>> Start Ingredients Section
let ingredientsMeals=[]
async function getIngredientsData(){
let ingredRespons = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let ingredData = await ingredRespons.json()
    ingredientsMeals=ingredData.meals;

    displayIngredientsDate()
}
function displayIngredientsDate(){
    let str=``
    for(let i=0; i<20; i++){
        str+=`
        <div class="col-md-3 p-3 text-white">   
            <div data-strIngredient="${ingredientsMeals[i].strIngredient}" class="inner ingredBox text-center overflow-hidden"> 
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h4>${ingredientsMeals[i].strIngredient}</h4>
            <p>${ingredientsMeals[i].strDescription}</p>
            </div>
        </div>
        `
    } 
    document.getElementById("myRow").innerHTML=str
    $(".inner").click(function(e){
        let strIngredient=$(this).attr("data-strIngredient")
        getIngredientsDataList(strIngredient)
    })
}
let ingredientsMealsList=[]
async function getIngredientsDataList(data){
    let ingredRespons=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${data}`)
    let ingredData=await ingredRespons.json()
    ingredientsMealsList=ingredData.meals;
    displayIngredDateList()
}
function displayIngredDateList(){
    let str=``
    for(let i=0; i<ingredientsMealsList.length; i++){
        str+=`
        <div class="col-md-3 p-3 rounded-2">   
            <div class="inner "> 
                <div class="img ">
                    <img class='w-100 rounded-2' src="${ingredientsMealsList[i].strMealThumb}" alt="">
                </div>
                <div class="layer p-3 d-flex align-items-center"'>
                    <p class="fs-3 fw-bold">${ingredientsMealsList[i].strMeal}</p>
                </div>
            </div>
        </div>
        `
    } 
    document.getElementById("myRow").innerHTML=str
}
$("#ingredients").click(function(){
    $("#mainSection").removeClass("d-none")
    $("#contactUs").addClass("d-none")
    $(".searchSection").addClass("d-none")
    getIngredientsData()
})
//======>>> End Ingredients Section
//======>>> Start ContactUS Section
    $("#contact").click(function(){
        $("#contactUs").removeClass("d-none")
        $("#searchSection").addClass("d-none")
        $("#mainSection").addClass("d-none")
    })
//======>>> End ContactUS Section
})