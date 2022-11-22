import { useState, useEffect } from "react"

const useDB = (
    database,
    version = 1,
    objectStore
) => {

    const [data, setData] = useState([])

    function fetch(){
        // Client side database management for scoresheet offline
        const DB = indexedDB
        const request = DB.open(database, version)

        request.onerror = (e) => {
            alert(e)
            console.log(e);
        }

        request.onsuccess = () => {
            const db = request.result
            const transaction = db.transaction(objectStore, "readonly")
            const collection = transaction.objectStore(objectStore)

            let response = collection.getAll()
            response.onsuccess = () => {
                setData(response.result)
            }

            transaction.oncomplete = () => {
                db.close()
            }
        }
    }

    useEffect(() => {
        fetch()
        // eslint-disable-next-line
    }, [])

    return ({data, fetch})
}

export default useDB