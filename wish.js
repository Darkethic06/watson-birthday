function wish() {
    // console.log("hi");
    let a = prompt("Enter Password")

    if (a == "watson") {
        // console.log("Hello");
        document.querySelector("#wish-btn").style.display = "none"
        document.querySelector('.letter').style.display ="block"
    }

}