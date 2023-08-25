console.log("Research initial setup");

const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

const request = indexedDB.open("UsersDatabase", 1);

request.onerror = (event) => {
    console.log("Some error occured");
    console.log(event);
}