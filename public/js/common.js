function movePage(url) {
    if (url == 'back') {
        history.back();
        return;
    }
    location.href = url;
}