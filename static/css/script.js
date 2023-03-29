let bal = 1;
let warning = document.getElementById('warning');
let addbal = document.getElementById('addbal');
let cut = document.getElementById('close');
let add = document.getElementById('Add');
let burger = document.getElementById('burger');
let nav = document.getElementById('nav');
let main = document.getElementById('main');
let logout = document.getElementById('logout');
nav.style.left = '37%'
burger.addEventListener('click', () => {
    if (nav.style.left == '37%') {
        nav.style.left = '29%'
        nav.style.animation = 'popLeft 1s 1';
    }
    else {
        nav.style.left = '37%'
        nav.style.animation = 'popRight 1s 1';
    }
})

function msg() {
    if (nav.style.left == '37%')
        nav.style.display = 'none'
    main.style.opacity = '0.2'
    nav.style.opacity = '0.2'
    document.getElementById('message').style.display = 'block';
    addbal.style.display = 'none';
}
function func3() {
    main.style.opacity = '1'
    nav.style.opacity = '1'
    nav.style.display = 'block'
    document.getElementById('message').style.display = 'none';
    addbal.style.display = 'flex';
    nav.style.animation = 'none'
}
addbal.addEventListener('click', ()=>{
    // addbal.style.display = 'none';
    add.style.display = 'flex';
    add.style.animation = 'popUp 1s 1'
    add.style.bottom = '0';
    main.style.cursor = 'no-drop';
    logout.style.display = 'none';
    main.style.opacity = '.2'
    nav.style.display = 'none';

});
cut.addEventListener("click", ()=>{
    add.style.animation = 'popDown 1s 1'
    add.style.bottom = '-320px'
    // addbal.style.display = 'flex';
    logout.style.display = 'block';
    main.style.cursor = 'default';
    main.style.opacity = '1'
    nav.style.display = 'block'
})


function getInfo() {
    alert("This add balance will be provided for you soon");
    cut.click();
}


function backHome() {
    window.location.href = "/log/account/statements";
}