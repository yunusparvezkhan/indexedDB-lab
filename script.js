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
    // References
    const db = request.result;
    const transaction = db.transaction("cars", "readwrite");
    const store = transaction.objectStore("cars");
    const colorIndex = store.index("cars_color");
    const makeModelIndex = store.index("color_and_make");

    // Data entries
    store.put({ id: 1, color: "Red", make: "Tata Motors" });
    store.put({ id: 2, color: "Orange", make: "Mahindra" });
    store.put({ id: 3, color: "Blue", make: "Range Rover" });
    store.put({ id: 4, color: "White", make: "Hindustan Motors" });
    store.put({ id: 5, color: "Red", make: "Polo" });

    // Data fetching

    // Data fetching using unique keyPath
    const idQuery = store.get(2)
    console.log(idQuery);

    // Data fetching using custom indexes
    const colorQuery = colorIndex.getAll(["Red"]);
    console.log(colorQuery);


    // Data fethching using custom indexes with multiple conditions/checkpoints
    // --------------------------------------------------------------------------------------------------
    // (!)  This example below uses the get() method instead of getAll() method like the previous one    |
    //      Therefore, this code below will fetch only the first result that matches it's conditions.    |
    // --------------------------------------------------------------------------------------------------
    const colorAndMakeQuery = makeModelIndex.get(["Red", "Polo"]);       //
    console.log(colorAndMakeQuery);                                     //
    // -----------------------------------------------------------------

    // Logging results of functions above
    idQuery.onsuccess = () => {
        console.log('idQuery: ', idQuery.result)
    };

    colorQuery.onsuccess = () => {
        console.log('colorQuery: ', colorQuery.result)
    };

    colorAndMakeQuery.onsuccess = () => {
        console.log('colorAndMakeQuery: ', colorAndMakeQuery.result)
    };

    // Close a database on completion of the tasks
    transaction.oncomplete = () => {
        db.close();
    };


}