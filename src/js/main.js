// Main js file from src
console.log("Test av mainjs");

//*Variabler:

let courseEl = document.getElementById("courselist");
let addCoursebtn = document.getElementById("addCourse");
let courseid = document.getElementById("courseid");
let coursename = document.getElementById("coursename");
let progression = document.getElementById("progression");
let courseplan = document.getElementById("courseplan");
//*händelselyssnare:

window.addEventListener('load', getCourselist);
addCoursebtn.addEventListener('click', createCourse);


//*Funktioner:

function getCourselist() {
    courseEl.innerHTML = '';
    // Fetch och införing av värden från databas:
    fetch('http://studenter.miun.se/~empa1600/writeable/webbutveckling3/moment5.1/courses.php')
    .then(response => response.json())
    .then(data => {
        data.forEach(course => {
            courseEl.innerHTML += 
            `<div class="course">
            <p>
            <b>Kurskod: </b> ${course.courseid}
            <br>
            <b>Kursnamn: </b> ${course.coursename}
            <br>
            <b>Progression: </b> ${course.progression}
            <br>
            <b>Kursplan: </b> <a href="${course.courseplan}">Kursplan</a>
            </p>
            <button id="${course.id}" onClick="deleteCourse(${course.id})">Radera</button>
            <br>
            
            `
        })
    })
}
// Funktion som kallas för radera med id vid klick av knapp
function deleteCourse(id) {
    fetch('http://studenter.miun.se/~empa1600/writeable/webbutveckling3/moment5.1/courses.php?id=' + id, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        getCourselist();
    })
    .catch(error => {
        console.log('Error:', error);
    })
}
//*Funktion för att skapa ny kurs:
function createCourse() {
    //Variabler från formulär
    let kursid = courseid.value;
    let kursnamn = coursename.value;
    let kursprogress = progression.value;
    let kursplan = courseplan.value;

    let course = { 'courseid': kursid, 'coursename': kursnamn, 'progression': kursprogress, 'courseplan': kursplan}; //Utskrift

    fetch('http://studenter.miun.se/~empa1600/writeable/webbutveckling3/moment5.1/courses.php', { //ny fetch
        method: 'POST',
        body: JSON.stringify(course),
    })
    .then(response => response.json())
    .then(data => {
        getCourselist();
    })
    .catch(error => {
        console.log('Error:', error);
    })

}




