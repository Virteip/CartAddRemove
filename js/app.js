//variables
const cart = document.getElementById('carrito');
const itemList = document.getElementById('lista-cursos');
const addInCart = document.querySelector('#lista-carrito tbody');
const emptyCart = document.getElementById('vaciar-carrito');

//listeners
eventListeners();

function eventListeners()
{
    //user clicks on buy course
    itemList.addEventListener('click', buyCourse);

    //remove course
    cart.addEventListener('click', deletedCourse);

    //empty cart
    emptyCart.addEventListener('click', emptyEverything);

    //load local storage after dom is loaded
    document.addEventListener('DOMContentLoaded',bringLocal);
}


//functions

//function to identify course to add to cart
function buyCourse(e)
{
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito'))
    {
        const course = e.target.parentElement.parentElement;
        

        readCourseInfo(course);
    }
}

//read selected course information
function readCourseInfo(course)
{
    //create an object selecting course information
    const courseInfo = {
        img: course.querySelector('img').src,
        title: course.querySelector('h4').innerText,
        price: course.querySelector('.precio span').innerText,
        id: course.querySelector('a').getAttribute('data-id')
    };

    //recieves info and creates html to insert
    insertIntoCart(courseInfo);
}

//Create HTML with selected course
function insertIntoCart(course)
{
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>
            <img src="${course.img}" width=100>
        </td>

        <td>${course.title}</td>
            
        <td>${course.price}</td>

        <td>
            <a href='#' class="borrar-curso" data-id="${course.id}">X</a>
        </td>
    `

    //add to localstorage
    saveToLocal(course);

    //append html to cart list
    addInCart.appendChild(row);

    
}

//Erase course from cart list
function deletedCourse(e)
{
    e.preventDefault();

    let course, courseId;

    if(e.target.classList.contains('borrar-curso'))
    {
        e.target.parentElement.parentElement.remove();
    }

    course =  e.target.parentElement.parentElement;
    courseId = course.querySelector('a').getAttribute('data-id');
    deleteFromLocalStorage(courseId);
}

//Empty cart
function emptyEverything(e)
{
    while(addInCart.firstChild)
    {
        addInCart.removeChild(addInCart.firstChild);
    }

    deleteCompleteLocalStorage();

    return (false);
}

//Save to local storage
function saveToLocal(course)
{
    let adds;

    adds = loadFromLocal();

    adds.push(course);

    localStorage.setItem('cursos',JSON.stringify(adds));

}


//Load from local storage
function loadFromLocal()
{
    let loads;

    if (localStorage.getItem('cursos') === null)
    {
        loads = [];
    }
    else
    {
        loads = JSON.parse(localStorage.getItem('cursos'));
    }
    return loads;
}

//Bring data from local storage
function bringLocal()
{
    let courses;

    courses = loadFromLocal();

    courses.forEach(course => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>
                <img src="${course.img}" width=100>
            </td>

            <td>${course.title}</td>
            
            <td>${course.price}</td>

            <td>
                <a href='#' class="borrar-curso" data-id="${course.id}">X</a>
            </td>
            `
        //append html to cart list
        addInCart.appendChild(row);
    });
}

//Eliminate from local storage
function deleteFromLocalStorage(courseId)
{
    let adds;

    adds = loadFromLocal();

    adds.forEach(function (element, index){
        if (element.id === courseId)
        {
            adds.splice(index,1);
        }
    });

    localStorage.setItem('cursos', JSON.stringify(adds)); 
}


function deleteCompleteLocalStorage()
{
    localStorage.clear();
}