import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect } from "react"
import { db } from "../firebase/config"

export function getBlog(setBlogs) {
    useEffect(()=> {
        const q = query(
            collection(db,"blogs"),
            orderBy("addTime", "desc")
        )
        const unsub = onSnapshot(
            q,
            // orderBy("addTime"),
            (snapshot)=> {
                let list = []
                snapshot.docs.forEach((doc,index)=> {
                    list.push({id : doc.id, ...doc.data()})
                })
                setBlogs(list)
            },
            (error)=> {
                console.log(error);
            }
        )
        return ()=> {
            unsub()
        }
    },[]) 
}