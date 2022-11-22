// Client side database creation

const createDB = (
    database,
    version = 1,
    objectStore,
    createIndex = false,
    indexName,
    indexToUse,
    indexIsUnique = false
) => {

    const DB = indexedDB
    const request = DB.open(database, version)

    request.onerror = (e) => {
        alert(e)
        console.log(e);
    }

    request.onupgradeneeded = () => {
        const db = request.result
        const collection = db.createObjectStore(objectStore, { keyPath: "id" })

        if (createIndex){
            collection.createIndex(indexName, indexToUse, { unique: indexIsUnique })
        }
    }
}

const populateDBCollection = (
    database,
    version = 1,
    objectStore,
    data = []
) => {
    
    const DB = indexedDB
    const request = DB.open(database, version)

    request.onerror = (e) => {
        alert(e)
        console.log(e);
    }

    request.onsuccess = () => {
        const db = request.result
        const transaction = db.transaction(objectStore, "readwrite")
        const collection = transaction.objectStore(objectStore)

        data.map((i) => (
            collection.add(i)
        ))        

        transaction.oncomplete = () => {
            db.close()
        }
    }
}

const updateDBCollection = (
    database,
    version = 1,
    objectStore,
    data
) => {
    
    const DB = indexedDB
    const request = DB.open(database, version)

    request.onerror = (e) => {
        alert(e)
        console.log(e);
    }

    request.onsuccess = () => {
        const db = request.result
        const transaction = db.transaction(objectStore, "readwrite")
        const collection = transaction.objectStore(objectStore)

        collection.put(data)

        transaction.oncomplete = () => {
            db.close()
        }
    }
}
 
export { createDB, populateDBCollection, updateDBCollection };