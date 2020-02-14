
document.addEventListener("DOMContentLoaded", function () {
    let memberInputBoxElements = document.querySelectorAll('.member-input-box input, select');

    Object.keys(memberInputBoxElements).forEach(function (item) {
        console.log('break');
        memberInputBoxElements[item].addEventListener('focus', function (e) {
            console.log('break');
            e.target.parentNode.classList.add("border-yellowgreen");
        });

        memberInputBoxElements[item].addEventListener('focusout', e => {
            console.log('break');
            e.target.parentNode.classList.remove("border-yellowgreen");
        });
    });

});