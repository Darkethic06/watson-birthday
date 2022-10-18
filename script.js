let x = setInterval(() => {
    let dest = new Date('Mon Nov 6 2022 23:59:59').getTime();
    let now = new Date().getTime();

    let diff = dest - now;

    let days = Math.floor(diff / (1000 * 60 * 60 * 24))

    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    let min = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    var sec = Math.floor((diff % (1000 * 60)) / (1000))

    // console.log(days, hours, min, sec);
    document.getElementById('days').innerHTML = days
    document.getElementById('hours').innerHTML = hours
    document.getElementById('min').innerHTML = min
    document.getElementById('sec').innerHTML = sec


}, 1000);


document.getElementById("btn").addEventListener("click",function(){
    alert("Please Click Me On November 7");
})


let a = setInterval(() => {
    let leftDest = new Date('Mon Nov 7 2000 00:00:01').getTime();
    let leftNow = new Date().getTime();

    let leftDiff =  leftNow- leftDest;
    let leftYear = Math.floor(leftDiff / (1000 * 60 * 60 * 24 * 365))
    let leftMonth = Math.floor(leftDiff / (1000 * 60 * 60 * 24 * 30))
    let leftWeek = Math.floor(leftDiff / (1000 * 60 * 60 * 24 *7))

    let leftDays = Math.floor(leftDiff / (1000 * 60 * 60 * 24))

    let leftHours = Math.floor((leftDiff / (1000 * 60 * 60 )))
    let leftMin = Math.floor((leftDiff / (1000 * 60)))

    var leftSec = Math.floor((leftDiff / (1000)))
   
    document.getElementById('leftMonth').innerHTML = leftMonth + " Months"
    document.getElementById('leftWeek').innerHTML = leftWeek + " Weeks"
    document.getElementById('leftDays').innerHTML = leftDays + " Days "
    document.getElementById('leftHours').innerHTML = leftHours + " Hours"
    document.getElementById('leftMin').innerHTML = leftMin + " Mintues"
    document.getElementById('leftSec').innerHTML = leftSec + " Seconds"
    document.getElementById('leftYTD').innerHTML =  leftYear + " Years"




}, 1000);


// 3600 *1000 = 3600000 /1000 