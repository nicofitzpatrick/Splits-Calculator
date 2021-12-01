//element selectors
const btn1 = document.getElementById("btn-check");
const btn2 = document.getElementById("btn-clear");
const result = document.getElementById("result");

//function to clear app
const clear = () => {
  document.getElementById("txt-box").value = "";
  result.innerHTML = "";
};

//function to check if total number of splits equal 100%
const sumCheck = (s) => {
  if (s === 100) {
    result.style.color = "blue";
    return (result.innerHTML = "Total splits equal 100%!");
  } else if (s < 100) {
    const dif = 100 - s;
    const rounded = Math.round((dif + Number.EPSILON) * 100) / 100;
    return (result.innerHTML = `Total splits do not equal 100%. They are short by ${rounded}%.`);
  } else {
    const dif = s - 100;
    const rounded = Math.round((dif + Number.EPSILON) * 100) / 100;
    return (result.innerHTML = `Total splits do not equal 100%. They are over by ${rounded}%.`);
  }
};

// Math.round((num + Number.EPSILON) * 100) / 100

//main function
const extractor = () => {
  //check text has been entered
  if (document.getElementById("txt-box").value == "") {
    result.innerHTML = "Enter details above";
  } else {
    //clear result text
    result.innerHTML = "";
    //obtain text from text-area
    let str = document.getElementById("txt-box").value;
    //add numbers from obtained string into a new array (only if followed by %)
    const digitEx = str.match(/(\d[\d\.]*)(?=%)/g);
    //convert each stringed 'number' into an actual number
    const digitConv = digitEx.map((el) => parseFloat(el));
    //sum up all numbers in the array
    const sum = digitConv.reduce(
      (previousValue, currentValue) => previousValue + currentValue
    );
    const sumRounded = Math.round((sum + Number.EPSILON) * 100) / 100;
    //run function to check sum equals 100%
    return sumCheck(sumRounded);
  }
};

//button event listeners
btn1.addEventListener("click", () => {
  result.style.color = "red";
  try {
    extractor();
  } catch (error) {
    result.innerHTML = "Text must contain copyright splits (see above Tip)";
  }
});

btn2.addEventListener("click", clear);
