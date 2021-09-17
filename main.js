const dateInput = document.querySelector("#date-input");
const checkBtn = document.querySelector("#button-check");
const resultMessage = document.querySelector("#show-message");

function reverseStr(str) {
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');
    return reversedStr;
  }
  
  function palindromeOrNot(str) {
    var reverse = reverseStr(str);
      if(str === reverse){
        return true;
    }else{
        false;
    }
  }
  
  function convertDateToStr(date) {
  
    var dateStr = { day: '', month: '', year: '' };
   
    if(date.day < 10) {
      dateStr.day = '0' + date.day;
    }
    else {
      dateStr.day = date.day.toString();
    }
  
    if(date.month < 10) {
      dateStr.month = '0' + date.month;
      // console.log(date.month);
    }
    else {
      dateStr.month = date.month.toString();
    }
  
    dateStr.year = date.year.toString();
  
    return dateStr;
  }
  
  function getAllDateFormats(date) {
       
    var dateStr = convertDateToStr(date);
  
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;  
    return [ddmmyyyy, mmddyyyy, yyyymmdd];
   }
  
  function checkPalindromeForAllDateFormats(date){
    var listOfPalindromes = getAllDateFormats(date);
  
    var currentStatus = false;
  
    for(var i=0; i < listOfPalindromes.length; i++){
      if(palindromeOrNot(listOfPalindromes[i])){
        currentStatus = true;
        break;
      }
    }
    
    return currentStatus;
  }
  
  function isLeapYear(year){
    if(year % 400 === 0){
      return true;
    }
    if(year % 100 === 0){
      return false;
    }
    if(year % 4 === 0){
      return true;
    }
    return false;
  }

  function getNextPalindromeDate(date){
    var ctr = 0;
    var nextDate = getNextDate(date);
  
    while(1){
      ctr++;
      var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
      if(isPalindrome){
        break;
      }
      nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
  }

  function getNextDate(date){
    var day = date.day + 1;  
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; 
  
    
    if(month === 2){ 
     
      if(isLeapYear(year)){
         if(day > 29){ 
           day = 1;
           month++;  
         }
      }
      else {
         if(day > 28){
           day = 1;
           month++;  
         }
      }
    }
  
    else {
   
      if(day > daysInMonth[month - 1]){ 
        day = 1; 
        month++;  
      }
    }
  
    if(month > 12){
      month = 1;
      year++; 
    }
  
    return {
      day: day,  
      month: month,
      year: year
    };
  }

  checkBtn.addEventListener('click', clickHandler);
 
  function clickHandler(e){
    var bdayStr = dateInput.value; 
    
    if(bdayStr === ''){
      resultMessage.innerText ="Please, Enter valid input.";
    }else{
      var listOfDate = bdayStr.split('-'); 
    }
  
      var date = {
        day: Number(listOfDate[2]),
        month: Number(listOfDate[1]),
        year: Number(listOfDate[0])
      };
      
      var isPalindrome = checkPalindromeForAllDateFormats(date);
  
      if(isPalindrome){
       
        resultMessage.innerText= "processing....";
          setTimeout(function () {
            resultMessage.innerText = "Yay! your birthday is a palindrome!! 🎉🎉";
          }, 3000);
         
      }
      else {
        var [ctr, nextDate] = getNextPalindromeDate(date);
        
        
        if(nextDate.day < 10){
            nextDate.day = nextDate.day.toString();
            nextDate.day = '0' + nextDate.day;    
          }
            if(nextDate.month < 10){
            nextDate.month = nextDate.month.toString();
            nextDate.month = '0' + nextDate.month;    
          }
         
        resultMessage.innerText= "processing....";
        setTimeout(function (){
            resultMessage.innerText = `Your Birthdate is not palindrome. The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days! 💔`;
    
        }, 3000);
        
      }
    }
  
  
 










