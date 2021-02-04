import React from 'react'
import { Icon, Card, Col} from 'react-materialize'
import {Link, NavLink} from 'react-router-dom'
import { connect } from 'react-redux';

const UserBioCard = ({user}) => {

return (
<div>
<Col m={9} l={9} xl={9} s={12}>  
<Card

      className="e8eaf6 indigo lighten-5"
      closeIcon={<Icon>close</Icon>}
      revealIcon={<Icon>more_vert</Icon>}
      textClassName="black-text"
      title="About"
    >
      <NavLink to='/settings'><Icon className ='right'>create</Icon></ NavLink>
      <div>
         {user.about}
      </div>
    </Card>
  </ Col>  
</div>
)};
     
const mapStateToProps = usr => {
  return {
    user: usr.auth.user.user,
    loggedIn: usr.auth.loggedIn 
  }
};

export default connect(mapStateToProps)(UserBioCard);
