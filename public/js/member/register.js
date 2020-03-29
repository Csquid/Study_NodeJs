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
const regID = /^[a-z0-9][a-z0-9_\-]{4,19}$/;
const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

function showAll() {
    for (let prop in registerObject) {
        console.log(prop, registerObject[prop]);
    }
}

let welcomeCheck;

for (let prop in registerObject) {
    registerObject[prop].addEventListener('focusout', function (e) {
        welcomeCheck = true;
        console.log(prop);
        elementData = e.target.value
        // console.log(prop);

        if (notNullPropArray.find(element => element === prop)) {
            /* not null 부분이 비어있는 경우 */

            if (elementData === '' && prop !== 'email') {
                document.querySelector('#err-empty-' + prop).classList.remove('hidden');
                welcomeCheck = false;
                return;
            } else {
                if(prop !== 'email')
                    document.querySelector('#err-empty-' + prop).classList.add('hidden');
            }

            if (elementData !== '') {
                switch (prop) {
                    /* id overlap check ajax */
                    case "id":
                        if(regID.test(elementData)) {
                            /* 만약 정규식을 통과했다면 */
                            document.querySelector('#err-regex-id').classList.add('hidden');
                        } else {
                            /* 만약 정규식을 통과하지 않았다면 */
                            document.querySelector('#err-regex-id').classList.remove ('hidden');
                            welcomeCheck = false;
                            return;
                        }

                        welcomeCheck = true;
                        sendAjax('http://localhost:9000/member/overlap/', prop, { id: elementData });
                        break;
                    case "email":
                        /* register ajax */
                        if(regEmail.test(elementData)) {
                            /* 만약 정규식을 통과했다면 */
                            document.querySelector('#err-regex-email').classList.add('hidden');
                        } else {
                            /* 만약 정규식을 통과하지 않았다면 */
                            document.querySelector('#err-regex-email').classList.remove('hidden');
                        }

                        sendAjax('http://localhost:9000/member/overlap/', prop, { email: elementData });
                        break;
                    default:
                        break;
                }
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

    xhr.addEventListener('load', function () {
        /* 로그인 결과를 출력 할려고하는 엘리먼트 */
        let result = JSON.parse(xhr.responseText);

        console.log(result);
        switch (prop) {
            case "id":
                if (result.overlap) {
                    /* 중복 되었을때 */
                    document.querySelector('#err-overlap-id').classList.remove('hidden');
                } else {
                    /* 중복이 아닐때 */
                    document.querySelector('#err-overlap-id').classList.add('hidden');
                }

                if(welcomeCheck)
                    document.querySelector('#welcome-not-overlap-id').classList.remove('hidden');
                else
                    document.querySelector('#welcome-not-overlap-id').classList.add('hidden');
                break;
            case "email":
                if (result.overlap) {
                    /* 중복 되었을때 */
                    document.querySelector('#err-overlap-email').classList.remove('hidden');
                    document.querySelector('#welcome-not-overlap-email').classList.add('hidden');
                } else {
                    /* 중복이 아닐때 */
                    document.querySelector('#err-overlap-email').classList.add('hidden');
                    document.querySelector('#welcome-not-overlap-email').classList.remove('hidden');
                }
                break;
            default:
                break;
        }

        // if(!result.signal) {
        //     resultDivElement.innerHTML = result.err;
        // } else {
        //     // resultDivElement.innerHTML = 'Welcome ' + result.data.user.user_id + '.';
        //     location.href = '/';
        // }
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

