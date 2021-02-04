import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Row, TextInput, Icon, Col, Card, CardTitle, Button} from 'react-materialize'
import {loadCurrentUser} from '../actions/auth'
import { connect } from 'react-redux';
import {Link, NavLink} from 'react-router-dom'
import vid from '../assets/myVid.mp4'

class Signup extends Component {
  static propTypes = {
    setLoggedInUser: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props)

    this.state = {
      credentials: {
        username: "",
        password: ""
      }
    }
  }
  setLoggedInUser = (user) => {
    localStorage.setItem('token', user.token)
    this.setState({
      auth: {
        user: {
          username: user.username,
          id: user.id
        },
        loggingIn: false
      }
    })
    this.props.loadCurrentUser(this.state.auth.user)
}


  formListener = (event) => {
    const {name, value} = event.target
    let currentCredState = Object.assign({},this.state.credentials)
 
    currentCredState[name] = value
    this.setState({
      credentials: currentCredState
    })
    console.log(this.state)
  }

  signUpUser = (event) => {
  event.preventDefault()
  fetch("http://localhost:3001/signup", {
    method: 'POST',
    headers:
    {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
    },
    body: JSON.stringify({user: this.state.credentials})
  })
    .then(res => res.json())
    .then(resp => {
      if (resp.error) {
        alert(resp.error)
      } else {
        this.props.setLoggedInUser(resp)
        this.props.history.push('/')
      }
    })
    }
  render() {
return (
<div >
<video autoPlay loop muted 
   s={12}
style={{
   position: 'absolute',
   width: '100%',
   left: '50%',
   right: '50%',
   height: '100%',
   objectFit: 'cover',
   transform: 'translate(-50%, -50%)',
   zIndex: '-1',
   marginTop: '280px',


  }}
   
   >
   <source src={vid} type='video/mp4' />
</video>

 <Row  >
 
   <Col 
       className='center container'
       style={{marginLeft: 'auto', marginTop: 'auto', float: 'none', marginTop: '10%'}}
   >
     <Card
       
       closeIcon={<Icon>close</Icon>}
       header={<h1 style={{fontFamily: 'cursive'}}>friends</h1>}
       revealIcon={<Icon>more_vert</Icon>}
       title="SignUp"

     >
        <TextInput 
            s={12}
       
            placeholder="username"
            type="text"
            name="username"
            onChange={this.formListener}
          />
        <TextInput 
            s={12}
        
            placeholder="password"
            type="password"
            name="password"
            onChange={this.formListener}
            />
         <Button placeholder="submit" type="submit"  
           onClick={this.signUpUser}
            node="button"
            waves="light"
            className="waves-effect orange btn"
            ><Icon right> check</Icon>
              SignUp
          </Button>
         <p>
           <NavLink to='/login'>
           Already have an account? Log in
           </NavLink >
         </p>
       </Card>
     </Col>
   </Row>
 </div>
 )}
};

function mapStateToProps(user) {

  return {
  //  user: state.auth.user,
  //  friends: state.user.friends,
  //  chats: state.user.chats,
  }
}
export default (connect(mapStateToProps, {loadCurrentUser})(Signup));








           

           
 
