function changeDarkmode() {
    const body = document.getElementsByTagName('body')[0];
    const currentMode = body.getAttribute('data-theme');

    if (currentMode === 'light') {
        body.setAttribute('data-theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
    }
}