import React from 'react'
import axios from 'axios'
import Modal from '../Modal/Modal'
import ModuleCSS from './Main.module.css'

class Main extends React.Component{

  constructor(props) {
    super(props)
  
    this.state = {
      user1: null,
      user2: null,
      firstUser: {
        user: ''
      },
      secondUser: {
        user: ''
      },
      show: false,
    }
  }

  showModal = () =>{
    console.log("called")
    this.setState(()=>({
      show: true,
    }))
  }

  closeModal = () => {
    this.setState(()=>({
      show: false,
    }))
  }

  submitHandler = (e) =>{

    const { user1, user2 } =  this.state;

    e.preventDefault();
    axios.all([
      axios.get(`https://api.github.com/users/${user1}`),
      axios.get(`https://api.github.com/users/${user2}`),  // user info
      axios.get(`https://api.github.com/users/${user1}/followers`),
      axios.get(`https://api.github.com/users/${user2}/followers`), // followers
      axios.get(`https://api.github.com/users/${user1}/repos`),   // list of repos
      axios.get(`https://api.github.com/users/${user2}/repos`),   // list of repos
      axios.get(`https://api.github.com/users/${user1}/events`), // for every activity done
      axios.get(`https://api.github.com/users/${user2}/events`), // for every activity done
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

  getWinner = () =>{

    const { 
      firstUser: { 
        user: fUser, 
        followers: fFollowers, 
        repos : fRepos, 
        events: fEvents
      }, 
      
      secondUser : { 
        user: sUser, 
        followers: sFollowers, 
        repos: sRepos, 
        events: sEvents
      },
      user1, 
      user2
    } =  this.state;

    let winner;
    
    let firstUserResult = fFollowers.length + fRepos.length + fEvents.length;
    let secondUserResult = sFollowers.length + sRepos.length + sEvents.length;

    if ((firstUserResult > secondUserResult)){
      winner = fUser.name ? fUser.name : fUser.login
    } else if ((secondUserResult > firstUserResult)){
      winner = sUser.name ? sUser.name : sUser.login
    } else {
      winner = "Score Are Equal"
    }
    
    return (
      <div>
        <h1>{winner}</h1>
      </div>
    )
  }

  render(){

    const { firstUser, secondUser, user1, user2, show } =this.state;

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
                name='user1'
                className={ModuleCSS.cardInput}
                onChange={this.changeHandler}
                placeholder="Enter User"
              />
              {firstUser.user && 
                <div
                  className={ModuleCSS.userStats}
                >
                  <div><span>User Name :</span> {firstUser.user.login}</div> <br/>
                  <div><span>Followers :</span> {firstUser.followers.length}</div> <br/>
                  <div><span>Repos :</span> {firstUser.repos.length}</div> <br/>
                  <div><span>Events :</span> {firstUser.events.length}</div> <br/>
                </div>
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
                name='user2'
                className={ModuleCSS.cardInput}
                onChange={this.changeHandler}
                placeholder="Enter User"
              />
              {secondUser.user && 
                <div
                  className={ModuleCSS.userStats}
                >
                  <div><span>User Name :</span> {secondUser.user.login}</div> <br/>
                  <div><span>Followers :</span> {secondUser.followers.length}</div> <br/>
                  <div><span>Repos :</span> {secondUser.repos.length}</div> <br/>
                  <div><span>Events :</span> {secondUser.events.length}</div> <br/>
                </div>
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
            disabled={!(user1 && user2)}
          >
            Get Stats
          </button>

          <button
            type="submit"
            name="submit"
            onClick={this.showModal}
            className={ModuleCSS.winnerBtn}
            disabled={!(firstUser.user && secondUser.user)}
          >
            Get Winner
          </button>
        </div>

        { show &&
          <Modal
            show={show}
            closeModal={this.closeModal}
          >
            {this.getWinner()}
          </Modal>
        }
      </div>
    )
  }
}

export default Main
