import React from 'react'
import { Row , Col} from 'react-materialize'
import AllUsersCard from './cards/AllUsersCard'
import LoadingPage from './LoadingPage'
import { connect } from 'react-redux';

const Network = ({users, currentUser, loading, history}) => {

 if(!loading && currentUser.loggedIn){
   const frnds = currentUser.friends.map(fr => parseInt(fr.friend_id))
  const list = users.filter(user => {
return !frnds.includes(user.id) && currentUser.user.user.id !== user.id}).map(user => {
  return <AllUsersCard key={user.id} potentialFriend={user} currentUser={currentUser} history={history} />});
  
  return (
     <div className='container' > 
        <h4 className='center' style={{fontFamily: 'serif'}}>People you may want to connect</h4>
       <Row >
            {list}
       </Row> 
     </div>
    )
  }
     
  if(loading && !currentUser.loggedIn){
    return (
        <div>
          <LoadingPage />
        </div>
    )
  }};
    
  function mapStateToProps(users) {
      return {
           users: users.users.users,
           currentUser: users.auth,
           loading: users.users.loading
          }
   }
   export default connect(mapStateToProps, null)(Network);
    
    
   
  
          
              
   
         
     
          
    
        


