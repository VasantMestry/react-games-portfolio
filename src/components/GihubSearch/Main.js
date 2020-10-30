import React from 'react'
import axios from 'axios'
import Modal from '../Modal/Modal'
import UserCard from '../UserCard/UserCard'
import ModuleCSS from './Main.module.css'
import { debounce } from 'lodash'

class Main extends React.Component{

  constructor(props) {
    super(props)
  
    this.state = {
      first: '',
      second: '',
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

  submitHandler = debounce((name, value) =>{

    if (value === '') return null;

    const apiCallUrls = [
      axios.get(`https://api.github.com/users/${value}`),
      axios.get(`https://api.github.com/users/${value}/followers`),
      axios.get(`https://api.github.com/users/${value}/repos`),   // list of repos
      axios.get(`https://api.github.com/users/${value}/events`), // for every activity done
      // axios.get(`https://api.github.com/repos/VasantMestry/react-games-portfolio/commits`) // commits on particular repo
    ]

    axios.all([...apiCallUrls])
    .then(axios.spread((
      userInfo,
      userFollowers, 
      userRepos,
      userEvents,
      ) =>{
        this.setState(()=>({
          [`${name}User`]: {
            user: userInfo.data,
            followers: userFollowers.data,
            repos: userRepos.data,
            events: userEvents.data,
          },
        }))
    }))
    .catch(()=>{
      this.setState(()=>({
        [`${name}User`]: {
          user: {
            avatar_url: 'https://i.pinimg.com/originals/34/bf/46/34bf463e47ec1ae480f8f61704a63a42.gif'
          }
        },
      }))
    })
  
  }, 1000);

  changeHandler = (e)=>{

    this.setState(()=> ({
      [e.target.name]: e.target.value
    }),
      ()=> this.submitHandler(e.target.name, e.target.value)
    )

  }

  playAgain = () => {

    this.setState(()=> ({
      first: '',
      second: '',
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

    const { firstUser, secondUser, first, second, show } =this.state;

    return (
      <div className={ModuleCSS.gitContainer}>
        <div
          className={ModuleCSS.cardWrapper}
        >
          <UserCard 
            firstUser={firstUser}
            user={first}
            name='first'
            changeHandler={this.changeHandler}
          />

          <UserCard 
            firstUser={secondUser}
            name='second'
            user={second}
            changeHandler={this.changeHandler}
          />
                    
        </div>

        {/* <div
          className={ModuleCSS.buttonWrapper}
        >
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
        } */}
      </div>
    )
  }
}

export default Main
