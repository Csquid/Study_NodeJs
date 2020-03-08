
document.addEventListener("DOMContentLoaded", function () {
    let memberInputBoxElements = document.querySelectorAll('.member-input-box input, select');

    Object.keys(memberInputBoxElements).forEach(function (item) {
        memberInputBoxElements[item].addEventListener('focus', function (e) {
            e.target.parentNode.classList.add("border-yellowgreen");
        });

        memberInputBoxElements[item].addEventListener('focusout', e => {
            e.target.parentNode.classList.remove("border-yellowgreen");
        });
    });

});