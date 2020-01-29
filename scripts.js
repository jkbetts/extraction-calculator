var tds, dose, water, extraction, rat;
var underOver, strength = "";
let lrr = 2.2;
let exception = 0;
let brewYield = 0;
let congrats = 0;

function readData(){
    tds = document.getElementById("tdspercent").value;
    dose = document.getElementById("doseweight").value;
    water = document.getElementById("waterweight").value;

    if (isNaN(tds)){
        alert("Please enter only numbers");
        exception++;
    }
    if (isNaN(dose)){
        alert("Please enter only numbers");
        exception++;
    }
    if (isNaN(water)){
        alert("Please enter only numbers");
        exception++;
    }
}


function calcYield(){
    brewYield = water - (dose*lrr);
    document.getElementById("brewYield").value = brewYield;
    if(brewYield == 0){
        exception++;
    }
}

function refract() {

    readData();
    calcYield();

    if(exception<1){
        extraction = (brewYield * tds)/dose;
        document.getElementById("displayExtraction").value = extraction.toFixed(2);
    }
    exception = 0;
    strengthTest();
    extractionTest();
}
function strengthTest(){

    ratio = water/dose;

    switch(true){
        case ratio <=14:
            strength = "This brew ratio is too strong.";
            break;
        case ratio >=19:
            strength = "This brew ratio is too weak.";
            break;
        case ratio <15:
            strength = "This brew ratio might be too strong.";
            break;
        case ratio >17:
            strength = "This brew ratio might be too weak.";
            break;
        default:
            strength = ""
            break;
    }
    document.getElementById("resultStmt").innerHTML = "";
    document.getElementById("ratioStmt").innerHTML = ratio.toFixed(1) + " : 1";
    document.getElementById("strength").innerHTML = strength;
}
function extractionTest(){
    switch (true){
        case extraction < 20:
            underOver="under-extracted."
            break;
        case extraction > 23:
            underOver="over-extracted."
            break;
        default:
            underOver="well-extracted."
            congrats++;
            break;
    }
    document.getElementById("extractionStmt").innerHTML = "Your cup is " + underOver;
    if(congrats==1){
        document.getElementById("congrats").innerHTML = "Great job!";
    }
    else{
        document.getElementById("congrats").innerHTML = "";
    }
    congrats=0;
}