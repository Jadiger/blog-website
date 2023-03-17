import React, { useEffect, useRef, useState } from 'react'
import { storage, db } from '../firebase/config'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { BackImage } from '../styled/style'
import backImg from '../assets/category_page_background.jpg'
import Loading from '../components/Loading'
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
  const [loading, setLoading] = useState(false)
  useEffect(()=> {
    // setLoading(true)
    function uploadImage() {
            setData(prev=>({...prev ,category : category, title : title, text : text}))
          // console.log(imageRef.current.files[0]);
          const storageRef = ref(storage, image.name)
          // console.log('storageRef:'+ storageRef);
          const uploadTask = uploadBytesResumable(storageRef, image)
          
          uploadTask.on('state_changed', (snapshot)=> {
            console.log(snapshot);
            const progr = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            
            setLoading(true)
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
              setData((prev)=>({...prev, imageURL : downloadURL}))
              setLoading(false)
            })
          })
          
    }

    image && uploadImage()
    // setLoading(false)
  },[image])
  function addBlog(e) {
    // setLoading(true)
    addDoc(collection(db, "blogs"), {
      ...data, addTime : Date.now()
    })
    // setLoading(false)
    console.log(db.toJSON);
    e.target.reset()
  }
  useEffect(()=> {
    console.log(data);
  }, [data]
  )
  return (
    <BackImage className="addBlog" backImg={backImg}>
      {loading ? <Loading/> : ''}
      <form className='addBlog__form'
            // ref = {formRef}
            onSubmit={(e)=> {
                e.preventDefault()
                addBlog(e)
                      }}
      >
        <label>
          <p>Title</p>
          <input type='text'
                  className='addBlog__input'
                  placeholder='Title...'
                  onChange={(e)=> {
                    setTitle(e.target.value)
                  }}

          />
        </label>
        
        <label>
                  <p>Category</p>
                  <select className='addBlog__input addBlog__select'
                          onChange={(e)=> {
                      setCategory(e.target.value);
                  }}>
                      <option value='news'>News</option>
                      <option value='html'>HTML</option>
                      <option value='css'>CSS</option>
                      <option value='sass'>Sass</option>
                      <option value='bootstrap'>Bootstrap</option>
                      <option value='js'>JavaScript</option>
                      <option value='react-js'>React Js</option>
                      <option value='redux'>Redux</option>
                  </select>
        </label>
        <label> <p>Description</p>
          <textarea placeholder='blog-text ...'
                    className='addBlog__input addBlog__text'
                    onChange={(e)=> {
                      setText(e.target.value)
                    }}
          />
        </label>
        <label> <p>Add Image</p>
          <input type='file'
                  className='addBlog__input'
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={(e)=> {
                    setImage(e.target.files[0])
                  }}
          />
        </label>

        <button className='addBlog__btn'> Add Blog</button>
      </form>
    </BackImage>
  )
}

export default AddBlog