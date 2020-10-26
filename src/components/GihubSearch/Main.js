import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ModuleCSS from './Main.module.css'

function Main() {

  const [ user, setUser ] = useState('');
  const [ firstUser, setFirstUser ] = useState('');
  const [ secondUser, setSecondUser ] = useState('');

  // useEffect(()=>{
  //   axios('https://api.github.com/users/vasantmestry11')
  //     .then((res)=> setUser(res.data))
  // }, [])

  const inputHandler = (e) =>{
    setUser(e.target.value)
  }

  const submitHandler = (e) =>{
    e.preventDefault();
    axios.all([
      axios.get(`https://api.github.com/users/${user}`),
      axios.get(`https://api.github.com/users/vasantmestry11`),
    ])
      .then(axios.spread((firstUser, secondUser) =>{
          setFirstUser(firstUser.data);
          setSecondUser(secondUser.data);
      }))
      .then(setUser(''))
  }

  // console.log(firstUser);
  // console.log(secondUser);

  return (
    <div className={ModuleCSS.gitContainer}>
      <div className={ModuleCSS.header}>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Enter User"
            onChange={inputHandler}
            name="user"
            value={user && user.name}
            className={ModuleCSS.inputBox}
          />
          <input 
            type="submit"
            name="submit"
            className={ModuleCSS.submitBtn}
          />
        </form>
      </div>
      <div
        className={ModuleCSS.infoBox}
      >
        <div className={ModuleCSS.userWrapper}>

          <div className={ModuleCSS.imageWrapper}>
            <img 
              src={firstUser.avatar_url ? firstUser.avatar_url : 'https://assets.stickpng.com/thumbs/5af573836554160a79bea074.png'}
            />
            <p>{firstUser.name}</p>
          </div>

          <div className={ModuleCSS.imageWrapper}>
            <img 
              src={secondUser.avatar_url ? secondUser.avatar_url : 'https://assets.stickpng.com/thumbs/5af573836554160a79bea074.png'}
            />
            <p>{secondUser.name}</p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Main
