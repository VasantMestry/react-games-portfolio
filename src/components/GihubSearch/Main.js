import React from 'react'
import axios from 'axios'
import Modal from '../Modal/Modal'
import UserCard from '../UserCard/UserCard'
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

  playAgain = () => {

    this.setState(()=> ({
      user1: '',
      user2: '',
      firstUser: {
        user: ''
      },
      secondUser: {
        user: ''
      },
      show: false,
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
          <UserCard 
            firstUser={firstUser}
            user={user1}
            name='user1'
            changeHandler={this.changeHandler}
          />

          <UserCard 
            firstUser={secondUser}
            name='user2'
            user={user2}
            changeHandler={this.changeHandler}
          />
                    
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
            playAgain={this.playAgain}
          >
            {this.getWinner()}
          </Modal>
        }
      </div>
    )
  }
}

export default Main
