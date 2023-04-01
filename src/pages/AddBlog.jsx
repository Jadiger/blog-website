import React, { useEffect, useRef, useState } from 'react'
import { storage, db } from '../firebase/config'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import Loading from '../components/Loading'
import { useContext } from 'react'
import { Context } from '../context'
function AddBlog() {
  const {dispatch} = useContext(Context)
  const [category,setCategory] = useState('news')
  const [title,setTitle] = useState(null)
  const [text,setText] = useState(null)
  const [imgURLs, setImgURLs] = useState([])
  const [images,setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [textValue,setTextValue]=useState('')
  const data = {
    title : title,
    text : text,
    category : category,
    imgURLs : imgURLs
  }
  // console.log(data);
  function addBlog(e) {
    if(text && title && (imgURLs.length> 0)) {
      dispatch({type: 'SET_ALERT', payload : 'Blog Added'})
      dispatch({type: 'SET_ALERT_CLASS', payload : 'alert__success'})
    addDoc(collection(db, "blogs"), {
      ...data, addTime : Date.now()
    })
    e.target.reset()
    } else if (!title) {
      dispatch({type: 'SET_ALERT', payload : 'Please enter a blog title'})
      dispatch({type: 'SET_ALERT_CLASS', payload : 'alert__error'})
    } else if (!(imgURLs.length>0)) {
      dispatch({type: 'SET_ALERT', payload : 'Please add a picture to the blog'})
      dispatch({type: 'SET_ALERT_CLASS', payload : 'alert__error'})
    } else {
      dispatch({type: 'SET_ALERT', payload : 'Please add text to the blog'})
      dispatch({type: 'SET_ALERT_CLASS', payload : 'alert__error'})
    }

    setTimeout(()=> {
      dispatch({type: 'SET_ALERT', payload : ''})
      dispatch({type: 'SET_ALERT_CLASS', payload : ''})
    },2000)
  }
  useEffect(()=> {
    if(images.length>0) {
      uploadFiles(images)
    }
    
    
  },[images])
    // setLoading(true)
      function uploadFiles(files) {
        setImages([])
              setImgURLs([])
        setLoading(true)
        const promises = []
        Array.from(files).map((file) => {
            // console.log('loop');

            const sotrageRef = ref(storage, `images/${file.name}`);

            const uploadTask = uploadBytesResumable(sotrageRef, file);
            promises.push(uploadTask)
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const prog = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                },
                (error) => console.log(error),
                async () => {
                    await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
                        setImgURLs(prevState => [...prevState, downloadURLs])
                        setTextValue(prev=> `<img src='${downloadURLs}'/> `+prev)
                        console.log("File available at", downloadURLs);
                    });
                }
            );
  
        })
        Promise.all(promises)
            .then(() => {
              setLoading(false)
              // console.log(imgURLs);
              
              // console.log(textValue);
            })
            .then(err => console.log(err))
    };
   
  useEffect(()=> {
    // console.log(data);
  }, [data]
  )
  return (
    <div className="addBlog">
      <div className="addBlog__title">
          Add Blog
      </div>
      {loading ? <Loading/> : ''}
      <form className='addBlog__form'
            onSubmit={(e)=> {
                e.preventDefault()
                addBlog(e)
                setTextValue(null)
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
                      <option value='javascript'>JavaScript</option>
                      <option value='react-js'>React Js</option>
                      <option value='redux'>Redux</option>
                  </select>
        </label>
        <label> <p>Add Image</p>
          <input type='file'
                  className='addBlog__input'
                  accept="image/png, image/jpg, image/jpeg, image/webp"
                  onChange={(e)=> {
                    // setImage(e.target.files)
                    setImages(e.target.files);
                    
                    
                  }}
              
                  multiple='multiple'
          />
        </label>
        <label> <p>Description</p>
          <textarea placeholder='blog-text ...'
                    className='addBlog__input addBlog__text'
                    defaultValue={textValue? textValue : ''}
                    onChange={(e)=> {
                      setText(e.target.value)
                    }}
                    
          />
        </label>

        <button className='addBlog__btn'> Add Blog</button>
      </form>
    </div>
  )
}

export default AddBlog