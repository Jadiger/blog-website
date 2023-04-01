import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { useContext } from "react"
import { useEffect } from "react"
import { Context } from "../context"
import { db } from "../firebase/config"

export function getBlog() {
    const {state,dispatch} = useContext(Context)
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
                dispatch({type : 'GET_BLOG', payload : list})
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