const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

const request = indexedDB.open("CarsDatabase", 1);

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

request.onsuccess = async () => {
    const db = request.result;
    const transaction = db.transaction("cars", "readwrite");
    const store = transaction.objectStore("cars");
    const colorIndex = store.index("cars_color");
    const makeModelIndex = store.index("color_and_make");

    store.put({ id: 1, color: "Red", make: "Tata Motors" });
    store.put({ id: 2, color: "Orange", make: "Mahindra" });
    store.put({ id: 3, color: "Blue", make: "Range Rover" });
    store.put({ id: 4, color: "White", make: "Hindustan Motors" });
    store.put({ id: 5, color: "Red", make: "Polo" });
}