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

request.onupgradeneeded = () => {
    const db = request.result;
    const store = db.createObjectStore("cars", { keyPath: "id" });
    store.createIndex("cars_color", ["color"], { unique: false });
    store.createIndex("color_and_make", ["color", "make"], { unique: false });
};
