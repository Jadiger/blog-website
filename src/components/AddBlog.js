import React, { useEffect, useRef, useState } from 'react'
import { storage, db } from '../firebase/config'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

function AddBlog() {

  const initialState = {
    title : '',
    text : '',
    category : '',
    imageURL : ''
  }
  const [category,setCategory] = useState('news')
  const [data,setData] = useState(initialState)
  const formRef = useRef(null)
  const [title,setTitle] = useState(null)
  const [text,setText] = useState(null)
  const [image,setImage] = useState(null)
  const [progress, setProgress] = useState(null)
  useEffect(()=> {
    function uploadImage() {
            setData(prev=>({...prev ,category : category, title : title, text : text}))
          // console.log(imageRef.current.files[0]);
          const storageRef = ref(storage, image.name)
          // console.log('storageRef:'+ storageRef);
          const uploadTask = uploadBytesResumable(storageRef, image)

          uploadTask.on('state_changed', (snapshot)=> {
            console.log(snapshot);
            const progr = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setProgress(progr)

            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
              setData((prev)=>({...prev, imageURL : downloadURL}))
              
            })
          })
    }

    image && uploadImage()
  
  },[image])
  function addBlog(e) {
    addDoc(collection(db, "blogs"), {
      ...data, addTime : Date.now()
    })

    console.log(db.toJSON);
    e.target.reset()
  }
  useEffect(()=> {
    console.log(data);
  }, [data]
  )
  return (
    <form className='flex'
          // ref = {formRef}
          onSubmit={(e)=> {
              e.preventDefault()
              addBlog(e)
                    }}
    >
      <label> <p>Title</p>
         <input type='text'
                placeholder='Title...'
                onChange={(e)=> {
                  setTitle(e.target.value)
                }}

         />
      </label>
      
      <label>
                <p>Category</p>
                <select onChange={(e)=> {
                    setCategory(e.target.value);
                }}>
                    <option value='news'>News</option>
                    <option value='football'>Football</option>
                    <option value='texnology'>Texnology</option>
                    <option value='math'>Matematika</option>
                    <option value='starts'>Stars</option>
                    <option value='it-texnology'>IT</option>
                </select>
      </label>
      <label> <p>Description</p>
         <textarea placeholder='blog-text ...'
                   style={{width : '50%', height : '100px',padding : '30px'}}
                   onChange={(e)=> {
                    setText(e.target.value)
                   }}
         />
      </label>
      <label> <p>Add Image</p>
         <input type='file'
                accept="image/png, image/jpg, image/jpeg"
                onChange={(e)=> {
                  setImage(e.target.files[0])
                }}
         />
      </label>

      <button style={{display : 'block', margin : '20px auto'}}> Add Blog</button>
    </form>
  )
}

export default AddBlog