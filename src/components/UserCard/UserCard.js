import React from 'react'
import ModuleCSS from './UserCard.module.css'

function UserCard(props) {


  const {
    firstUser,
    user,
    name,
    changeHandler
  } = props;

  return (
    <div className={ModuleCSS.card}>
      <div className={ModuleCSS.cardContent}>
        <img
          className={ModuleCSS.cardImage}
          src={firstUser.user ? firstUser.user.avatar_url : 'https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png'}
        />
        <input
          type="text"
          name={name}
          className={ModuleCSS.cardInput}
          onChange={changeHandler}
          placeholder="Enter User"
          value={user}
        />
        {firstUser.user.login &&
          <div
            className={ModuleCSS.userStats}
          >
            <div><span>User Name :</span> {firstUser.user.login}</div> <br />
            {/* <div><span>Followers :</span> {firstUser.followers.length}</div> <br/>
            <div><span>Repos :</span> {firstUser.repos.length}</div> <br/>
            <div><span>Events :</span> {firstUser.events.length}</div> <br/> */}
          </div>
        }
      </div>
    </div>
  )
}

export default UserCard
