window.addEventListener('load', function () {

    let input = document.getElementById('name');

    input.addEventListener('focus', function () {
        this.classList.add('isEmpty');
    });


    input.addEventListener('blur', function () {
        if (!this.value) {
            this.classList.remove('isEmpty');
        }
    });

});


window.addEventListener('load', function () {

    let input = document.getElementById('names');

    input.addEventListener('focus', function () {
        this.classList.add('isempty');
    });


    input.addEventListener('blur', function () {
        if (!this.value) {
            this.classList.remove('isempty');
        }
    });

});