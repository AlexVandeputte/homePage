window.onload = init
let siren = new Audio("sounds/siren.mp3")
let shouldPlay = false
let myTimer = null
let startStopWatch = true

function startup()
{
    if(localStorage.getItem("items") === null){
        let contentStorage = []
        contentStorage.push(
            {
                "cat": "fun",
                "title": "netflix",
                "url": "https://www.netflix.com/browse"
            }
        )
        contentStorage.push(
            {
                "cat": "fun",
                "title": "anime",
                "url": "https://9anime.to/home"
            }
        )
        contentStorage.push(
            {
                "cat": "school",
                "title": "chamilo",
                "url": "https://chamilo.hogent.be/index.php?application=Chamilo%5CCore%5CHome"
            }
        )
        contentStorage.push(
            {
                "cat": "reddit",
                "title": "antimeme",
                "url": "https://www.reddit.com/r/antimeme/"
            }
        )
        contentStorage.push(
            {
                "cat": "tools",
                "title": "screen calc",
                "url": "https://multimonitorcalculator.com/"
            }
        )
        contentStorage.push(
            {
                "cat": "placeholder",
                "title": "hypixel",
                "url": "https://sky.shiiyu.moe/stats/AlexBelguim/Zucchini"
            }
        )
        localStorage.setItem("items", JSON.stringify(contentStorage))
    }
  
    contentStorage = JSON.parse(localStorage.getItem("items"))

}


function toHtml()
{
    let parentElement = ""
    document.getElementById("div1Content").innerHTML = ""
    document.getElementById("div2Content").innerHTML = ""
    document.getElementById("div3Content").innerHTML = ""
    document.getElementById("div4Content").innerHTML = ""
    document.getElementById("div5Content").innerHTML = ""
    contentStorage.forEach(el => {
        switch(el.cat)
        {
            case 'school':
                parentElement = document.getElementById("div1Content")
                break
            case 'reddit':
                parentElement = document.getElementById("div2Content")
                break
            case 'fun':
                parentElement = document.getElementById("div3Content")
                break
            case 'placeholder':
                parentElement = document.getElementById("div4Content")
                break
            case 'tools':
                parentElement = document.getElementById("div5Content")
            default:
                break
        }
        rowDiv = document.createElement("div")
        childElmement = document.createElement("a")
        childElmement.setAttribute("href", `${el.url}`)
        childElmement.innerHTML = `${el.title}`
        childRemove = document.createElement("input")
        childRemove.setAttribute("type", "button")
        childRemove.setAttribute("name", `${el.title}`)
        childRemove.setAttribute("id", `${el.title}Remove`)
        childRemove.setAttribute("value", "-")
        rowDiv.appendChild(childElmement)
        rowDiv.appendChild(childRemove)
        parentElement.appendChild(rowDiv)
        childRemove.onclick = function() {
            contentStorage = contentStorage.filter(element => element.title !== el.title)
            localStorage.setItem("items", JSON.stringify(contentStorage))
            toHtml()
        }

    });
}

function init()
{
    startup()
    toHtml()
    timer()
}

document.addEventListener("keyup", function(event) {
    if (event.keyCode === 32) {
        space();
    }
    if (event.keyCode === 13) 
    {
        console.log(getPage())
        switch(getPage())
        {
            case "1":
                googleSearch()
            default:
                console.log("stinkie")
        }
    }
    if (event.keyCode === 65)
    {
        a()
    }
});





//return page 
function getPage(){
    if(document.getElementById("homePage").style.display !== "none")
    {
        return "1"
    }
    if(document.getElementById("timerPage").style.display === "block")
    {
        return "2"
    }
    return "3"
}

//navbar
document.getElementById("navAdd").onclick = function(){
    let cat = prompt("geeft cat")
    let title = prompt("geef title")
    let url = prompt("geef url")
    contentStorage.push(
        {
            "cat": cat,
            "title": title,
            "url": url
        }
    )
    localStorage.setItem("items", JSON.stringify(contentStorage))
    toHtml()
}


document.getElementById("navTimer").onclick = function(){
    document.getElementById("homePage").style.display = "none"
    document.getElementById("timerPage").style.display = "block"
}

document.getElementById("navHome").onclick = function(){
    document.getElementById("homePage").style.display = "block"
    document.getElementById("timerPage").style.display = "none"
}

//stopwatch
document.getElementById("timerStart").onclick = function () {
    if(startStopWatch == true)
    {   
        startStopWatch = false
        console.log("stopwatch started")
        stopWatch()
    }
}

function stopWatch(){

    let id = setInterval(frame, 1000)
    function frame(){
        document.getElementById("timerStop").onclick = stopStopWatch
        function stopStopWatch() {
            clearInterval(id)
            stopSiren()
            startStopWatch = true
        }
        document.getElementById("timerReset").onclick = function () {
            document.getElementById("timerSec").value = "00"
            document.getElementById("timerMin").value = "00"
            document.getElementById("timerHour").value = "00"
            stopStopWatch()

        }
        let sec = parseInt(document.getElementById("timerSec").value)
        let min = parseInt(document.getElementById("timerMin").value)
        let hour = parseInt(document.getElementById("timerHour").value)
        if(sec >= 60)
        {
            sec = 59
        }
        if(min >= 60)
        {
            min = 59
        }
        if(hour >= 99)
        {
            min = 99
        }

        if(sec != 0)
        {
            sec -= 1
        }
        if(min != 0 && sec == 0)
        {
            min -= 1
            sec += 59
        }
        if(hour != 0 && min == 0 && sec == 0)
        {
            hour -= 1
            min += 59
            sec += 59
        }
        if(hour == 0 && min == 0 && sec == 0)
        {
            startSiren()
        }
        document.getElementById("timerSec").value = stringFor(sec)
        document.getElementById("timerMin").value = stringFor(min)
        document.getElementById("timerHour").value = stringFor(hour)
    }
}

//google search
function googleSearch()
{
    window.open(`https://www.google.com/search?q=${document.getElementById("google").value}`, "_blank")
}

//siren player
function space(){
    startSiren()
}
function a(){
    stopSiren()

}
function startSiren(){
    playSiren()
    shouldPlay = true
}
function stopSiren(){
    siren.pause()
    shouldPlay = false
}
function playSiren(){
    siren.play()
    let id = setInterval(frame, 20000)
    function frame(){
        if(shouldPlay === true)
        {
            siren.play()
        }
        else
        {
            clearInterval(id)
        }
    }

}

//timer and date
function timer()
{
    let today = new Date()
    today.toLocaleString('nl-BE',
    {
        hour12: false
    })
        
    let day = `${dayToString(today.getDay())} ${stringFor(today.getDate())}/${stringFor(today.getMonth())}/${today.getFullYear()}`
    console.log(day)
    document.getElementById("date").innerHTML = day

    let time = stringFor(today.getHours()) + ":" + stringFor(today.getMinutes()) + ":" + stringFor(today.getSeconds())
    document.getElementById("welcome").innerHTML = time
    setTimeout(timer, 1000)
}
function dayToString(day)
{
    switch(day)
    {
        case 1:
            return "Monday"
        case 2:
            return "Tuesday"
        case 3:
            return "Wensday"
        case 4:
            return "Thunderday"
        case 5:
            return "Fryday"
        case 6:
            return "Saturday"
        case 7:
            return "Sunday"
    }
}
function stringFor(str)
{

    let newStr = str
    if(newStr < 10)
    {
        return `0${newStr}`
    }
    else
    {
        return `${newStr}`
    }
}

//content boxes movement
document.getElementById("h41").onmouseover = function (){
    if(document.getElementById("div1Content").style.display === "block")
    {
        moveDown("div1")
    }
    else
    {
        moveUp("div1")
    }
}
document.getElementById("h42").onmouseover = function (){
    if(document.getElementById("div2Content").style.display === "block")
    {
        moveDown("div2")
    }
    else
    {
        moveUp("div2")
    }
}
document.getElementById("h43").onmouseover = function (){
    if(document.getElementById("div3Content").style.display === "block")
    {
        moveDown("div3")
    }
    else
    {
        moveUp("div3")
    }
}
document.getElementById("h44").onmouseover = function (){
    if(document.getElementById("div4Content").style.display === "block")
    {
        moveDown("div4")
    }
    else
    {
        moveUp("div4")
    }
}
document.getElementById("h45").onmouseover = function (){
    if(document.getElementById("div5Content").style.display === "block")
    {
        moveDown("div5")
    }
    else
    {
        moveUp("div5")
    }
}

function moveUp(ele){
    let elem = document.getElementById(ele)
    let pos = 100
    let id = setInterval(frame, 1)
    function frame() {
        if(pos >= 1700)
        {
            clearInterval(id)
        }
        else
        {
            if (pos >= 600)
            {
                document.getElementById(`${ele}Content`).style.display = "block"
            }
            pos += 170
            console.log("pos")
            elem.style.transform = `translate(0, -${pos}%)`
            
        }
    }
}
function moveDown(ele){
    let elem = document.getElementById(ele)
    let pos = 1700
    let id = setInterval(frame, 1)
    function frame() {
        if(pos <= 0)
        {
            clearInterval(id)
        }
        else
        {
            if (pos <= 1000)
            {
                document.getElementById(`${ele}Content`).style.display = "none"
            }
            pos -= 170
            console.log("pos")
            elem.style.transform = `translate(0, -${pos}%)`
            
        }
    }
}

