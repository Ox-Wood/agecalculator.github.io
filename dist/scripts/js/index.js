const input_Year = document.querySelector("#year");
const input_Month = document.querySelector("#month");
const input_Day = document.querySelector("#day");
const submit_btn = document.querySelector("#button");

//output
const output_Year = document.querySelector("#yrRslt");
const output_Month = document.querySelector("#mnthRslt");
const output_Day = document.querySelector("#dayRslt");

//errors
const error_yearwarnings = document.querySelector(".year-warnings");
const error_monthwarnings = document.querySelector(".month-warnings");
const error_daywarnings = document.querySelector(".day-warnings");
const monthError = document.querySelector("#monthError");
const yearError = document.querySelector("#yearError");
const dayError = document.querySelector("#dayError");

submit_btn.addEventListener("click", Calculate);

input_Day.addEventListener("input", () => {

    let getDaysInAMonth = getAllDatesInMonth(input_Year.value, input_Month.value - 1);
    
    if ( getDaysInAMonth.length < input_Day.value ) {
        isValid = false;
        error_daywarnings.textContent = "Must be a valid day";
        gsap.to(input_Day ,{
            color: "red",
            border: "red solid 2px"
           });
        gsap.to(dayError ,{
            color: "red"
           })
        return;
    } else {
        error_daywarnings.textContent = " ";
        gsap.to(input_Day,{
            color: "black",
            border: "rgb(229 231 235 ) solid 2px"
           });
        gsap.to(dayError ,{
            color: "black"
           })
        isValid = true;
    }
});

input_Year.addEventListener("input", () => {
    const currentYear = new Date();
    if (currentYear.getFullYear("Y") < input_Year.value) {
        isValid = false;
        error_yearwarnings.textContent = "Must be in the past";
        gsap.to(input_Year ,{
            color: "red",
            border: "red solid 2px"
           });
        gsap.to(yearError ,{
            color: "red"
           });
        return;
    } else {
        error_yearwarnings.textContent = " ";
        gsap.to(input_Year ,{
            color: "black",
            border: "rgb(229 231 235 ) solid 2px"
           });
        gsap.to(yearError ,{
            color: "black"
           })
        isValid = true;
    }
});

input_Month.addEventListener("input", () => {
    if ( 12 < input_Month.value) {
        isValid = false;
        error_monthwarnings.textContent = "Must be a valid month";
        gsap.to(input_Month ,{
            color: "red",
            border: "red solid 2px"
           });
        gsap.to(monthError ,{
            color: "red"
           });
        return;
    } else {
        error_monthwarnings.textContent = " ";
        gsap.to(input_Month ,{
            color: "black",
            border: "rgb(229 231 235 ) solid 2px"
           });
        gsap.to(monthError ,{
            color: "black"
           })
        isValid = true;
    }
});

function getAllDatesInMonth(year, month) {
    let startDate = new Date(year, month, 1); // month is 0-indexed
    let endDate = new Date(year, month + 1, 1);
   
    let dates = [];
    while (startDate < endDate) {
      dates.push(new Date(startDate)); // clone the date object
      startDate.setDate(startDate.getDate() + 1);
    }
  
    return dates;
  };

function Months(month, date, year) {

    const dates = new Date();

    let currentMonth = dates.getMonth() + 1;
    let currentDate =  dates.getDate();
    let currentYear = dates.getFullYear();

    let monthAge;
        if (year == currentYear) {
            if (month < currentMonth) {
                if (date <= currentDate) {
                    monthAge = currentMonth - month;
                } else {
                    let supposedAge = currentMonth - month;
                    monthAge = supposedAge - 1;
                }
            } else if (month == currentMonth) {
                if (date < currentDate) {
                    monthAge = currentMonth - month;
                } else if (date >= currentDate) {
                    monthAge = 0;
                }
            } else {
                alert("The baby must be born first!");
                monthAge = '- -'
            }
        } else if (year < currentYear) {
            if (month > currentMonth) {
                if (date <= currentDate) {
                    let mul = month - currentMonth;
                    monthAge = 12 - mul;
                } else if (date > currentDate) {
                    let mul = month - currentMonth;
                    monthAge = 11 - mul;
                }
            } else if (month == currentMonth) {
                if (date <= currentDate) {
                    monthAge = 0;
                } else if (date > currentDate) {
                    monthAge = 11;
                }
            } else if (month < currentMonth) {
                if (date >= currentDate) {
                    monthAge = currentMonth - month - 1;
                } else if (date < currentDate) {
                    monthAge = currentMonth - month;
                }
            } 
        }

    return monthAge;
}

function Years(month,day,year) {
    const dates = new Date();

    let currentMonth = dates.getMonth() + 1;
    let currentYear = dates.getFullYear();
    let currentDate = dates.getDate();

    let YearAge;
    
        if (year < currentYear) {
           if (month > currentMonth) {
                YearAge = currentYear - year - 1;
           } else if (month <= currentMonth) {
                YearAge = currentYear - year;
           }
        } else if (year == currentYear) {
            YearAge = 0;
        }

    return YearAge;
}

function Days(date) {
    const dates = new Date();
    const currentDate = dates.getDate();

    if (date > currentDate) {
        DateAge = date - currentDate;
    } else {
        DateAge = currentDate - date;
    }
    return DateAge;
}

function Calculate() {
    if (isValid) {
        const date = new Date();

        let userBirthYear = input_Year.value;
        let userBirthMonth = input_Month.value;
        let userBirthDay = input_Day.value;

        document.getElementById("yrRslt").innerHTML = Years(userBirthMonth, userBirthDay, userBirthYear);
        document.getElementById("mnthRslt").innerHTML = Months(userBirthMonth, userBirthDay, userBirthYear);
        document.getElementById("dayRslt").innerHTML = Days(userBirthDay);

    } else {
        alert("error");
    }
}