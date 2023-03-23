import React, { useEffect, useRef, useState } from 'react'
import { storage, db } from '../firebase/config'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import Loading from '../components/Loading'
function AddBlog() {
  const [category,setCategory] = useState('news')
  // const [data,setData] = useState(initialState)
  const formRef = useRef(null)
  const [title,setTitle] = useState(null)
  const [text,setText] = useState(null)
  const [imgURLs, setImgURLs] = useState([])
  const [images,setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [progress,setProgress] = useState(null)
  const [textValue,setTextValue]=useState('')
  const data = {
    title : title,
    text : text,
    category : category,
    imgURLs : imgURLs
  }
  // console.log(textValue);
  // console.log(images);
  // console.log(imgURLs);
  // console.log(progress);
  console.log(data);
  function addBlog(e) {
    if(text && title && (imgURLs.length> 0)) {
      // setLoading(true)
    addDoc(collection(db, "blogs"), {
      ...data, addTime : Date.now()
    })
    // setLoading(false)
    console.log(db.toJSON);
    e.target.reset()
    } else if (!title) {
      alert('please enter a blog title')
    } else if (!(imgURLs.length>0)) {
      alert('please add a picture to the blog')
    } else if (!text) {
      alert('please add text to the blog')
    }
    
    else {
      alert('Error')
    }
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
            console.log('loop');

            const sotrageRef = ref(storage, `images/${file.name}`);

            const uploadTask = uploadBytesResumable(sotrageRef, file);
            promises.push(uploadTask)
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const prog = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(prog);
                },
                (error) => console.log(error),
                async () => {
                    await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
                        setImgURLs(prevState => [...prevState, downloadURLs])
                        setTextValue(prev=> prev +`<img src='${downloadURLs}'/> `)
                        console.log("File available at", downloadURLs);
                    });
                }
            );
  
        })
        Promise.all(promises)
            .then(() => {
              setLoading(false)
              console.log(imgURLs);
              
              console.log(textValue);
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
                      <option value='javascript'>JavaScript</option>
                      <option value='react-js'>React Js</option>
                      <option value='redux'>Redux</option>
                  </select>
        </label>
        <label> <p>Add Image</p>
          <input type='file'
                  className='addBlog__input'
                  accept="image/png, image/jpg, image/jpeg"
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
                    onChange={(e)=> {
                      setText(e.target.value)
                    }}
                    defaultValue={textValue}
                    
          />
        </label>

        <button className='addBlog__btn'> Add Blog</button>
      </form>
    </div>
  )
}

export default AddBlog