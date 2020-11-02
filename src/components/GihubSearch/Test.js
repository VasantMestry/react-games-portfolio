import React, { useEffect, useState } from 'react'
import { debounce } from "lodash";
import axios from 'axios'

function Test() { 
  
  const [user, setUser] = useState('')
  
  let source = axios.CancelToken.source();
  useEffect(debounce(() => {

    const getData = async () =>{
      try{
        
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1?delay=500',{
          cancelToken: source.token
        })
        .then((res)=>{
          setUser(res.data)
        })

      } catch(err){
        if(axios.isCancel(err)){
          console.log('caught cancel')
        } else {
          throw err
        }
      }
    }
    
    getData()
    return ()=>{
      // console.log('unmounting')
      // console.log(source.cancel())
    }

  }, 2000), [])

  console.log(user)
  return (
    <div>
      <p>Id {user.id}</p>
      {/* <p>Title {user.title}</p> */}

      <button
      onClick={()=>source.cancel()}
      >
        Create
      </button>
    </div>
  )
}

export default Test
