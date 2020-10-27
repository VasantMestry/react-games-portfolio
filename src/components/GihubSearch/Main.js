import React from 'react'
import axios from 'axios'
import ModuleCSS from './Main.module.css'

class Main extends React.Component{

  constructor(props) {
    super(props)
  
    this.state = {
       firstUser: {
         user: ''
       },
       secondUser: {
         user: ''
       },
    }
  }

  submitHandler = (e) =>{

    const { firstUser, secondUser } =  this.state;

    e.preventDefault();
    axios.all([
      axios.get(`https://api.github.com/users/${firstUser}`),
      axios.get(`https://api.github.com/users/${secondUser}`),  // user info
      axios.get(`https://api.github.com/users/${firstUser}/followers`),
      axios.get(`https://api.github.com/users/${secondUser}/followers`), // followers
      axios.get(`https://api.github.com/users/${firstUser}/repos`),   // list of repos
      axios.get(`https://api.github.com/users/${secondUser}/repos`),   // list of repos
      axios.get(`https://api.github.com/users/${firstUser}/events`), // for every activity done
      axios.get(`https://api.github.com/users/${secondUser}/events`), // for every activity done
      // axios.get(`https://api.github.com/repos/VasantMestry/react-games-portfolio/commits`) // commits on particular repo
    ])
      .then(axios.spread((
        first,
        second, 
        firstFollowers, 
        secondFollowers,
        firstRepos,
        secondRepos,
        firstEvents,
        secondEvents
        ) =>{
          this.setState(()=>({
            firstUser: {
              user: first.data,
              followers: firstFollowers.data,
              repos: firstRepos.data,
              events: firstEvents.data,
            },
            secondUser: {
              user: second.data,
              followers: secondFollowers.data,
              repos: secondRepos.data,
              events: secondEvents.data,
            }
          }))
      }))
  }

  changeHandler = (e)=>{

    this.setState(()=> ({
      [e.target.name]: e.target.value
    }))

  }

  render(){

    const { firstUser, secondUser } =this.state;

    return (
      <div className={ModuleCSS.gitContainer}>
        <div
          className={ModuleCSS.cardWrapper}
        >

          <div className={ModuleCSS.card}>
            <div className={ModuleCSS.cardContent}>
              <img 
                className={ModuleCSS.cardImage}
                src={firstUser.user ? firstUser.user.avatar_url : 'https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png'}
              />
              <input 
                type="text"
                name='firstUser'
                className={ModuleCSS.cardInput}
                onChange={this.changeHandler}
                placeholder="Enter User"
              />
              {firstUser.user && 
                <p
                  className={ModuleCSS.userName}
                >
                  <span>User Name :</span> {firstUser.user.login} <br/>
                  <span>Followers :</span> {firstUser.followers.length} <br/>
                  <span>Repos :</span> {firstUser.repos.length} <br/>
                  <span>Events :</span> {firstUser.events.length} <br/>
                </p>
              }
            </div>
          </div>

          <div className={ModuleCSS.card}>
            <div className={ModuleCSS.cardContent}>
              <img 
                className={ModuleCSS.cardImage}
                src={secondUser.user ? secondUser.user.avatar_url : 'https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png'}
              />
              <input 
                type="text"
                name='secondUser'
                className={ModuleCSS.cardInput}
                onChange={this.changeHandler}
                placeholder="Enter User"
              />
              {secondUser.user && 
                <p
                  className={ModuleCSS.userName}
                >
                  <span>User Name:</span> {secondUser.user.login} <br/>
                  <span>Followers :</span> {secondUser.followers.length} <br/>
                  <span>Repos :</span> {secondUser.repos.length} <br/>
                  <span>Events :</span> {secondUser.events.length} <br/>
                </p>
              }
            </div>
          </div>

        </div>

        <div
          className={ModuleCSS.buttonWrapper}
        >
          <button
            type="submit"
            name="submit"
            onClick={this.submitHandler}
            className={ModuleCSS.getStatsBtn}
          >
            Get Stats
          </button>
        </div>
      </div>
    )
  }
}

export default Main
