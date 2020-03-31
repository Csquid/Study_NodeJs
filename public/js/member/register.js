const registerObject = {
    "id": document.querySelector('#register-id'),
    "pw1": document.querySelector('#register-pw-1'),
    "pw2": document.querySelector('#register-pw-2'),
    "name": document.querySelector('#register-name'),
    "email": document.querySelector('#register-email'),
    "address": document.querySelector('#register-address'),
    "gender": document.querySelector('#register-gender')
}
const errRegMsg = "8~16 characters consisting of letters(A-Z, a-z), numbers, or special characters.";
const errMsgStrings = {
    null: "You can't leave this empty.",
    "overlap-id": "Username is already taken.",
    "overlap-email": "Email is already taken.",
    "regex-id": "5~20 characters consisting of lowercase letters(a-z), numbers, or special characters (_, -)",
    "regex-pw1": errRegMsg,
    "regex-pw2": errRegMsg,
    "regex-email": "email format is wrong",
    "match-pw": "These passwords don’t match."
}

const registerSubmitButton = document.querySelector("#member-button-submit");
const notNullPropArray = ["id", "pw1", "pw2", "email"];

const regPW = /^[A-Za-z0-9`\-=\\\[\];',\./~!@#\$%\^&\*\(\)_\+|\{\}:"<>\?]{8,16}$/;
const regObject = {
    id: /^[a-z0-9][a-z0-9_\-]{4,19}$/,
    email: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
    pw1: regPW,
    pw2: regPW
}

function showAll() {
    for (let prop in registerObject) {
        console.log(prop, registerObject[prop]);
    }
}

for (let prop in registerObject) {
    registerObject[prop].addEventListener('focusout', function (e) {
        elementData = e.target.value

        if (document.querySelector('#err-' + prop)) {

            /* not null 부분이 비어있는 경우 */
            if (elementData === '') {
                if (prop !== 'email') {
                    showErrMsg(prop, errMsgStrings.null);
                    hideWelcome(prop);
                } else {
                    hideErrMsg(prop);
                }
                return;
            } else {    /* 비어있지 않은 경우 */
                hideErrMsg(prop);
            }

            /* 정규식 통과하지 못한 경우 */
            if (!regObject[prop].test(elementData)) {
                showErrMsg(prop, errMsgStrings["regex-" + prop]);
                hideWelcome(prop);
                return
            } else {    /* 정규식 통과한 경우 */
                hideErrMsg(prop);
            }

            if(prop === 'pw2') {
                if(registerObject[prop].value !== registerObject.pw1.value) {
                    showErrMsg(prop, errMsgStrings["match-pw"]);
                    return;
                } else {
                    hideErrMsg(prop);
                }
            }

            let checkData = {};
            checkData[prop] = elementData;

            if(prop === "id" || prop === "email")
                overlapCheckAjax('http://localhost:9000/member/overlap/', prop, checkData);
        }
    })
}

function overlapCheckAjax(url, prop, data) {
    data = JSON.stringify(data);

    let xhr = new XMLHttpRequest();

    url = url + prop;

    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', "application/json");
    xhr.send(data);

    xhr.addEventListener('load', function () {
        let result = JSON.parse(xhr.responseText);

        console.log(result);

        checkOverlap(prop, result.overlap);

        function checkOverlap(prop, overlap) {
            if (overlap) {   //true { 중복 o }
                showErrMsg(prop, errMsgStrings["overlap-" + prop]);
                hideWelcome(prop);
            } else {        //false { 중복 x }
                hideErrMsg(prop, errMsgStrings["overlap-" + prop]);
                showWelcome(prop);
            }
        }
    });
}

function showErrMsg(prop, msg) {
    document.querySelector("#err-" + prop).innerHTML = msg;
}
function hideErrMsg(prop) {
    document.querySelector("#err-" + prop).innerHTML = '';
}

function showWelcome(prop) {
    document.querySelector('#welcome-not-overlap-' + prop).classList.remove('hidden');
}

function hideWelcome(prop) {
    if(prop !== 'pw1' && prop !== 'pw2') {
        document.querySelector('#welcome-not-overlap-' + prop).classList.add('hidden');
    }
}

registerSubmitButton.addEventListener("click", function(e) {
    const sendData = {
        id: registerObject.id.value,
        pw: registerObject.pw2.value,
        name: registerObject.name.value,
        email: registerObject.email.value,
        address: registerObject.address.value,
        gender: registerObject.gender.value
    };

    const url = "/member/register";

    sendRegisterAjax(url, sendData);
});

function sendRegisterAjax(url, data) {
    data = JSON.stringify(data);

    let xhr = new XMLHttpRequest();

    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', "application/json");
    xhr.send(data);

    xhr.addEventListener('load', function () {
        let result = JSON.parse(xhr.responseText);

        console.log(result);
        if(result.signal) {
            location.href = "/";
        } else { }
    });    
}