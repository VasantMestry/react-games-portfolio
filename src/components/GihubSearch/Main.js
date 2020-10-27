import React from 'react'
import axios from 'axios'
import ModuleCSS from './Main.module.css'

class Main extends React.Component{

  constructor(props) {
    super(props)
  
    this.state = {
       user: '',
       firstUser: {
         data: ''
       },
       secondUser: {
         data: ''
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
      .then(axios.spread((...responses) =>{
          console.log("Main -> submitHandler -> responses", responses)
          // this.setState(()=>({
          //   firstUser: {
          //     data: first.data,
          //     commits: firstCommit
          //   },
          //   secondUser: {
          //     data: second.data,
          //     commits: secondComm
          //   }
          // }))
          // console.log(first);
          // console.log(second);
          // console.log(firstCommit);
          // console.log(secondComm);
      }))
  }

  changeHandler = (e)=>{

    this.setState(()=> ({
      [e.target.name]: e.target.value
    }))

  }

  render(){

    const { user, firstUser, secondUser } =this.state;


    return (
      <div className={ModuleCSS.gitContainer}>

        {/* <div
          className={ModuleCSS.infoBox}
        >
          <div className={ModuleCSS.userWrapper}>
            <div className={ModuleCSS.imageWrapper}>
              <img 
                src={firstUser.avatar_url ? firstUser.avatar_url : 'https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png'}
              />
              <input
                type="text"
                placeholder="Enter User"
                onChange={this.changeHandler}
                name="firstUser"
                value={firstUser && firstUser.login}
                className={ModuleCSS.inputBox}
                />
              <p>{firstUser.login}</p>
            </div>
          </div>
        </div> */}
            {/* <div className={ModuleCSS.imageWrapper}>
              <img 
                src={secondUser.avatar_url ? secondUser.avatar_url : 'https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png'}
              />
              <input
                type="text"
                placeholder="Enter User"
                onChange={this.changeHandler}
                name="secondUser"
                value={secondUser && secondUser.login}
                className={ModuleCSS.inputBox}
                />
              <p>{secondUser.login}</p>
            </div> */}

      <div
        className={ModuleCSS.cardWrapper}
      >

        <div className={ModuleCSS.card}>
          <div className={ModuleCSS.cardContent}>
            <img 
              className={ModuleCSS.cardImage}
              src={firstUser.data ? firstUser.data.avatar_url : 'https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png'}
            />
            <input 
              type="text"
              name='firstUser'
              className={ModuleCSS.cardInput}
              onChange={this.changeHandler}
              placeholder="Enter User"
            />
            {firstUser.data && 
              <p
                className={ModuleCSS.userName}
              >
                <span>User Name:</span> {firstUser.data.login}
              </p>
            }
          </div>
        </div>

        <div className={ModuleCSS.card}>
          <div className={ModuleCSS.cardContent}>
            <img 
              className={ModuleCSS.cardImage}
              src={secondUser.data ? secondUser.data.avatar_url : 'https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png'}
            />
            <input 
              type="text"
              name='secondUser'
              className={ModuleCSS.cardInput}
              onChange={this.changeHandler}
              placeholder="Enter User"
            />
            {secondUser.data && 
              <p
                className={ModuleCSS.userName}
              >
                <span>User Name:</span> {secondUser.data.login}
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
