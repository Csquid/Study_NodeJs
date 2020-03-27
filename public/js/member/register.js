let registerObject = {
    "id": document.querySelector('#register-id'),
    "pw1": document.querySelector('#register-pw-1'),
    "pw2": document.querySelector('#register-pw-2'),
    "name": document.querySelector('#register-name'),
    "email": document.querySelector('#register-email'),
    "address": document.querySelector('#register-address'),
    "gender": document.querySelector('#register-gender')
}

let notNullPropArray = ["id", "pw1", "pw2", "email"];

function showAll() {
    for (let prop in registerObject) {
        console.log(prop, registerObject[prop]);
    }
}

for (let prop in registerObject) {
    registerObject[prop].addEventListener('focusout', function(e) {
        console.log("break");
        elementData = e.target.value
        // console.log(prop);

        if(notNullPropArray.find(element => element === prop)) {
            if(elementData === '' && prop !== 'email') {
                console.log("null");
                return;
            }

            switch (prop) {
                /* id overlap check ajax */
                case "id":
                    sendAjax('http://localhost:3000/member/overlap/', prop, elementData);        
                    break;
                case "email":
                    /* register ajax */
                    sendAjax('http://localhost:3000/member/overlap/', prop, elementData);        
                    break;
                default:
                    break;
            }

        }
    })
}

function sendAjax(url, prop, data) {
    data = JSON.stringify(data);

    let xhr = new XMLHttpRequest();

    url = url + prop;
    console.log("url: " + url);
    console.log("data: " + data);

    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', "application/json");
    xhr.send(data);
    
    xhr.addEventListener('load', function() {
        /* 로그인 결과를 출력 할려고하는 엘리먼트 */
        const resultDivElement = document.querySelector(".result");
        let result = JSON.parse(xhr.responseText);

        console.log(result);

        if(!result.signal) {
            resultDivElement.innerHTML = result.err;
        } else {
            // resultDivElement.innerHTML = 'Welcome ' + result.data.user.user_id + '.';
            location.href = '/';
        }
    });
}

let registerID = function () {
    return document.querySelector('#register-id').value;
}

document.querySelector('#register-pw-1').value 
document.querySelector('#register-id').addEventListener('focusout', function (e) {
    // console.log('focus out');
    // console.log(e.target.value);

    // if()
})

