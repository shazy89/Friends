import React, { useState } from 'react'
import { Modal, Button, Icon, TextInput} from 'react-materialize'
import {connect} from 'react-redux'
export const USER_AVATAR = 'USER_AVATAR'


const UserEditModal = (props) => {

    const [selectedFile, setSelectedFile] = useState();
    const [previewSource, setPreviewSource] = useState(props.currentUser.user.avatar);
    const [img, setImg] = useState("");
    const [username, setUsername] = useState(props.currentUser.user.username);
    const [userId, setUserId] = useState(props.currentUser.user.id);
    
    
   const handleFileInputChange = (e) => {
     
       const file = e.target.files[0];
       previewFile(file);
       setSelectedFile(file);

        setImg(e.target.value);
    };

   const previewFile = (file) => {
       const reader = new FileReader();
       reader.readAsDataURL(file);
       reader.onloadend = () => {
           setPreviewSource(reader.result);
       };
   };
   

   const handleSubmit = e => {
       
       e.preventDefault();
       if (!selectedFile) return;
         const reader = new FileReader();
         reader.readAsDataURL(selectedFile);

          reader.onloadend = () => {
           const user = {
             
               username: username, 
               reader: reader.result,
               user_id: userId 
             }
             const userEditFunction = (userData, history) => {   
              
               fetch(`http://localhost:3001/avatar/${userData.user_id}`, {
                   method: "PATCH",
                   headers: {
                       'Accept': 'application/json',
                       'Content-Type': 'application/json'
                   },
                   body: JSON.stringify(userData)
               })
               .then( resp => resp.json() )
               .then( user => { debugger
                 props.userEditFunction(user)
                 props.history.push('/')
             })
           }
           userEditFunction(user)
         }  
      }
      return (
      <Modal
        actions={[
           <Button flat modal="close" 
              node="button" waves="green">Close</Button>,      
              <Button  onClick={handleSubmit} placeholder="submit" className="waves-effect orange btn"
              type="submit" node="button"><Icon right> check</Icon>Change</Button>
      ]}
      bottomSheet={false}
      fixedFooter={false}
      header="UserEdit"
      id="Modal-0"
      open={false}
      options={{
        dismissible: true,
        endingTop: '10%',
        inDuration: 250,
        onCloseEnd: null,
        onCloseStart: null,
        onOpenEnd: null,
        onOpenStart: null,
        opacity: 0.3,
        outDuration: 250,
        preventScrolling: true,
        startingTop: '4%'
      }}
      
      trigger={  
           <Button  className='right'
             flat  
             icon={<Icon >portrait</Icon>}
             node="button"
             waves="red"
           />} >
    
    <form onSubmit={handleSubmit}>

       <TextInput id="TextInput-4" label="new img" s={4} m={4} l={4} xl={4} name="img"  
         type="file"  value= {img} onChange={handleFileInputChange}/>
         {previewSource && ( <img src={previewSource} alt="chosen" style={{ height: '100px' }}  />)}
           </form>
    </Modal>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    userEditFunction: (userInfo) => dispatch({ type: USER_AVATAR, userInfo})
  };
};

function mapStateToProps(users) {
  return {
      currentUser: users.auth.user,
      loggedIn: users.auth.loggedIn
      
      }
}
    
export default connect(mapStateToProps, mapDispatchToProps)(UserEditModal);
               
  
          
         

  // <TextInput id="TextInput-4" style={{width: '50%'}} s={5} m={4} l={4} xl={4} value={username}
  // placeholder='username' label="username" name="username" onChange={e => setUsername(e.target.value)}/>
             

  



  
                


     
    



    
    
   
  
