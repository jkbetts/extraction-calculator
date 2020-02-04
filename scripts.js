var tds, dose, water, extraction, rat; // main variables for extraction math
var underOver, strength = ""; //string variables for outputting brew details
let lrr = 2.2;
let exception = 0; //used to prevent caluclation from running if any function fails
let brewYield = 0;
let congrats = 0; //tells the user good job if brew was successful.

//read user inputs
function readData(){
    tds = document.getElementById("tdspercent").value;
    dose = document.getElementById("doseweight").value;
    water = document.getElementById("waterweight").value;
    //test for incorrect input
    if (isNaN(tds) || isNaN(dose) || isNaN(water)){
        exception++; 
    }
}

//calculates yield based on brew weight and LRR
function calcYield(){
    brewYield = water - (dose*lrr);
    //test for NaN and output yield.
    if(brewYield == 0 || isNaN(brewYield)){
        exception++;
    }
    else{
        document.getElementById("brewYield").value = brewYield.toFixed(1);
    }
}

//calculates extraction
function calcExt(){
    if(exception<1){
        extraction = (brewYield * tds)/dose;
        document.getElementById("displayExtraction").value = extraction.toFixed(2);
    }
    else{
        document.getElementById("displayExtraction").value = "";
    }
}
//tests for brew ratio and informs user of brew ratio & strength.
function strengthTest(){
    ratio = water/dose; //establish ratio from user input
    
    //clear out pre-existing results if calculated again
    document.getElementById("resultStmt").innerHTML = "";
    document.getElementById("ratioStmt").innerHTML = "";
    document.getElementById("strength").innerHTML = "";

    //test if ratio isNaN and prevents NaN from being displayed
    if(isNaN(ratio)){
        document.getElementById("resultStmt").innerHTML = "Please enter only numbers.";
    }
    else{
        switch(true){
            case ratio <=14:
                strength = "This brew ratio is too strong.";
                congrats--;
                break;
            case ratio >=19:
                strength = "This brew ratio is too weak.";
                congrats--;
                break;
            case ratio <16:
                strength = "This brew ratio might be too strong.";
                congrats--;
                break;
            case ratio >17:
                strength = "This brew ratio might be too weak.";
                congrats--;
                break;
            default:
                strength = ""
                break;
        }
        //outputs results to results window
        document.getElementById("resultStmt").innerHTML = "Brew Ratio:";
        document.getElementById("ratioStmt").innerHTML = ratio.toFixed(1) + " : 1";
        document.getElementById("strength").innerHTML = strength;
    }
}

//tests for over or under extraction and informs user
function extractionTest(){
    //clear out preexisting results if run again
    document.getElementById("extractionStmt").innerHTML = "";
    document.getElementById("congrats").innerHTML = "";
    
    //tests if extraction is NaN and prevents calc if so
    if(isNaN(extraction)){
        document.getElementById("extractionStmt").innerHTML = "";
    }
    else{
        switch (true){
            case extraction < 19:
                underOver="under-extracted."
                break;
            case extraction < 19.5:
                underOver="a little under-extracted."
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
    }
    congrats=0;
}
function increaseLRR(){
    lrr = lrr + 0.1;
    document.getElementById("lrrText").innerHTML = lrr.toFixed(1);
    if (isNaN(extraction)){}
    else{refract();}
}

function decreaseLRR(){
    lrr = lrr - 0.1;
    document.getElementById("lrrText").innerHTML = lrr.toFixed(1);
    if (isNaN(extraction)){}
    else{refract();}
}
//main calculator function
function refract() {
    //reset extraction if run again
    extraction = undefined;
    //calls all functions
    readData();
    calcYield();
    if(brewYield == 0){}
    else{
        calcExt();
        strengthTest();
        extractionTest();
    }
    exception = 0;  //resets exceptions after running
}
