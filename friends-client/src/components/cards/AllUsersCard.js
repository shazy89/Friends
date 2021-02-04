import React from 'react';
import { bindActionCreators } from 'redux';
import { Icon, Card, Button, Col, CardTitle} from 'react-materialize'
import {connect} from 'react-redux'
import * as Actions from '../../actions/auth'


const AllUsersCard = ({potentialFriend, user, history, addNewFriend, newChat }) => {
console.log(user)
       const handleFriendship = (e) => {
         e.preventDefault()
        addNewFriend(potentialFriend, user, history)
        newChat(potentialFriend, user, history)
       }

const withInfo = () => {
  if (potentialFriend.name || potentialFriend.about){
  return (
    <div>
    { potentialFriend.name ? <h4>{potentialFriend.name}</h4> : null}
    { potentialFriend.about ?  <p>{potentialFriend.about}</p> : null}
    { potentialFriend.public_email ? <p>contact: {potentialFriend.public_email}</p> : null}
    { potentialFriend.url ?  <p>{potentialFriend.url}</p> : null}
  </div> 
    )
  } else {
    return (
      <div>
        <h3>Not Available</h3>
      </div>
     )}};

    return (
        <div id={potentialFriend.id}>
        <Col m={3} s={12} l={3} id={potentialFriend.id}> 
          <Card
            className='small'
            closeIcon={<Icon>close</Icon>}
            style={{ borderRadius: '5%'}}
            header={<CardTitle style={{marginLeft: 'auto', marginRight: 'auto', width: '150px', borderRadius: '50%'}} 
            image={potentialFriend.avatar} reveal waves="light"/>}

          revealIcon={<Icon>more_vert</Icon>}
          title={potentialFriend.username}
          reveal={withInfo()} >
           <Button className='right e8eaf6 indigo lighten-5 black-text text-darken-2' style={{borderRadius: '50%'}}  node="button" type="submit" waves="teal" 
       onClick={handleFriendship}> Connect </Button>
     </Card>
 </Col> 
    </div>
   )
  }
          
 
const mapDispatchToProps = (dispatch) => {
return bindActionCreators(Actions, dispatch);
}

const mapStateToProps = usr => {
return {
   user: usr.auth.user.user
}
}
             
export default connect(mapStateToProps, mapDispatchToProps)(AllUsersCard);

  
                

         
           
         
          
    
       
   
   
  
 
 
                



      

        
   
 
