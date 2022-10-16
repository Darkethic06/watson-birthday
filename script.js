let x = setInterval(() => {
    let dest = new Date('Mon Nov 6 2022 23:59:59').getTime();
    let now = new Date().getTime();

    let diff = dest - now;

    let days = Math.floor(diff / (1000 * 60 * 60 * 24))

    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    let min = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    var sec = Math.floor((diff % (1000 * 60)) / (1000))

    console.log(days, hours, min, sec);
    document.getElementById('days').innerHTML = days
    document.getElementById('hours').innerHTML = hours
    document.getElementById('min').innerHTML = min
    document.getElementById('sec').innerHTML = sec


}, 1000);


document.getElementById("btn").addEventListener("click",function(){
    alert("Please Click Me On November 7");
})



