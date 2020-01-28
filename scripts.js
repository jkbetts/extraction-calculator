var tds, dose, water, brewYield, extraction, rat;
var underOver, strength = "";
let lrr = 2.2;
let exception = 0;

function readData(){
    tds = document.getElementById("tdspercent").value;
    dose = document.getElementById("doseweight").value;
    water = document.getElementById("waterweight").value;
    brewYield = document.getElementById("brewyield").value;

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
    if (isNaN(brewYield)){
        alert("Please enter only numbers");
        exception++;
    }
}


function calcYield(){
    brewYield = water - (dose*lrr);
    document.getElementById("brewyield").value = brewYield;
    if(brewYield == 0){
        exception++;
    }
}

function refract() {

    readData();
    calcYield();

    if(exception<1){


        extraction = (brewYield * tds)/dose;
        let extNumClean = extraction.toFixed(2);

        switch (true){
            case extraction > 22:
                underOver= "over-extracted";
                break;
            case extraction < 20:
                underOver= "under-extracted";
                break;
            default:
                underOver= "well extracted";
                break;
        }
        document.getElementById("result").innerHTML = "Your extraction is: " + extNumClean + "%.";
        document.getElementById("overUnder").innerHTML ="This cup is " + underOver +".";
        
        strengthTest();
    }
    exception = 0;
}
function strengthTest(){

    rat = water/dose;
    let ratio = rat.toFixed(1);
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
    document.getElementById("ratio").innerHTML = "Brew Ratio: " + ratio +":1";
    if (strength != ""){
        document.getElementById("strength").innerHTML = strength;
    }
}
