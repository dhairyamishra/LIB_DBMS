function canSubmit() {
    var good = true;
    if (document.getElementById('searchUser').getAttribute('data-userid') == '') {
        good = false;
    }
    if (document.getElementById('searchBook').getAttribute('data-bookid') == '') {
        good = false;
    }
    return good;
}

function borrowBook() {
    if (!canSubmit()) {
        console.log('cant submit');
        // document.getElementById('submitwarning').className = "mx-auto text-center mt-2";
        return;
    }

    $.ajax({
        global: false,
        type: 'POST',
        url: '/borrow/borrowBook', //The url to post to on the server
        dataType: 'html',

        //The data to send to the server
        data: {
            bookId: document.getElementById('searchBook').getAttribute('data-bookid'),
            userId: document.getElementById('searchUser').getAttribute('data-userid'),
            type: document.getElementById('borrowType').value
            
        },

        //The response from the server
        success: function (result) {
            if (result == '/login') {
                window.location.replace(result);
            }
            else if (result == 'success') {
                window.location.replace('/borrow');
            }
            else if (result == 'usererror') {
                document.getElementById('submitwarning').innerText = "That user cannot borrow/reserve any more books";
            }
            else if (result == 'bookerror') {
                document.getElementById('submitwarning').innerText = "That book has no more copies to borrow";
            }
            else if (result == 'lateerror') {
                document.getElementById('submitwarning').innerText = "This user has had too many late returns recently";
            }
            else {
                // usernameTaken();
                
            }
        },

        //Handle any errors
        error: function (request, status, error) {
        }
    });
}

function searchUser() {

    $.ajax({
        global: false,
        type: 'POST',
        url: '/borrow/searchUser', //The url to post to on the server
        dataType: 'html',

        //The data to send to the server
        data: {
            str: document.getElementById('searchUser').value
            
        },

        //The response from the server
        success: function (result) {
            if (result == '/login') {
                window.location.replace(result);
            }
            else {
                document.getElementById('userSearchResults').innerHTML = result;
            }
        },

        //Handle any errors
        error: function (request, status, error) {
        }
    });
}

function userSelect(id,name,ucard) {
    document.getElementById('searchUser').setAttribute('data-userId',id);
    document.getElementById('searchUser').value = `${name} (U-Card: ${ucard})`;
    document.getElementById('userSearchResults').innerHTML = '';
}


function searchBook() {

    $.ajax({
        global: false,
        type: 'POST',
        url: '/borrow/searchBook', //The url to post to on the server
        dataType: 'html',

        //The data to send to the server
        data: {
            str: document.getElementById('searchBook').value
            
        },

        //The response from the server
        success: function (result) {
            if (result == '/login') {
                window.location.replace(result);
            }
            else {
                document.getElementById('bookSearchResults').innerHTML = result;
            }
        },

        //Handle any errors
        error: function (request, status, error) {
        }
    });
}

function bookSelect(id,title,isbn) {
    document.getElementById('searchBook').setAttribute('data-bookId',id);
    document.getElementById('searchBook').value = `${title} (ISBN: ${isbn})`;
    document.getElementById('bookSearchResults').innerHTML = '';
}

//AJAX Functions

//Wait to execute until AJAX is ready
$(document).ready(function ()  {
    $('#searchUser').on('input',function(event) {
        searchUser();
    });
    $('#searchBook').on('input',function(event) {
        searchBook();
    });
});
