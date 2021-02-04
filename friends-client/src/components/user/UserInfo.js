import React, {useState} from 'react'
import { Button, TextInput, Icon, Textarea} from 'react-materialize'
import {connect} from 'react-redux'


const UserInfo = ({userEditFunction, user, history}) => {

const [name, setName] = useState(user.name ? user.name : '')
const [publicEmail, setPublicEmail] = useState(user.public_email ? user.public_email : '')
const [url, setUrl] = useState(user.url ? user.url : '')
const [about, setAbout] = useState(user.about ? user.about : '')
const [id, setId] = useState(user.id)

const handleUpdate = (e) => {
    e.preventDefault()
    const user = {
        user_id: id,
        name: name,
        public_email: publicEmail,
        url: url,
        about: about
    }
    
   const updateUserInfo = (userInfo) => {
       
       fetch(`http://localhost:3001/users/${userInfo.user_id}`, {
         method: "PATCH",
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(userInfo)
     })
     .then( resp => resp.json() )
     .then( user => { 
         userEditFunction(user)
         history.push('/')
     })
 }
 updateUserInfo(user)
}

      
return (
    <div>
        <form onSubmit={handleUpdate}>
        <TextInput
          id="TextInput-4"
         label="Name" 
          onChange={e => setName(e.target.value)}
          value={name}
         />
        <TextInput
          id="TextInput-3"
         label="Public email" 
         onChange={e => setPublicEmail(e.target.value)}
         value={publicEmail}
         />
        <TextInput
          id="TextInput-2"
         label="URL " 
         onChange={e => setUrl(e.target.value)}
         value={url}
         />
        <Textarea
          id="Textarea-1"
         label="About " 
         onChange={e => setAbout(e.target.value)}
         value={about}
         />
          <br />
        <Button  placeholder="submit" className="3f51b5 indigo"
         type="submit" node="button"><Icon right> check</Icon>Update profile</Button> 
         
        </form>
    </div>
 )
};
       
const mapDispatchToProps = (dispatch) => {
    return {
      userEditFunction: (userInfo) => dispatch({ type: 'UPDATE_INFO', userInfo})
    };
  };

   const mapStateToProps = usr => {
       return {
           user: usr.auth.user.user
       }
    }
      
export default connect(mapStateToProps, mapDispatchToProps )(UserInfo);


          


