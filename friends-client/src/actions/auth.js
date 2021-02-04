
export const CURRENT_USER = 'CURRENT_USER'
export const ADD_NEW_FRIEND = 'ADD_NEW_FRIEND'
export const USER_AVATAR = 'USER_AVATAR'
export const ADD_NEW_CHAT = 'ADD_NEW_CHAT'
export const UPDATE_INFO = 'UPDATE_INFO'

export const loadCurrentUser = (user) => {
    return (dispatch) => {
      fetch(`http://localhost:3001/users/${user.id}`)
      .then(response => response.json())
      .then(json => dispatch({
        type: CURRENT_USER,
        user: json,
        friends: json.friends,
        chats: json.chats,
      }))
    }
  }

  const addUsers = (users) => {
    return {
        type: "POPULATE_USERS",
        users
    }
   }

  export const loadAllUsers = () => {
    return (dispatch) => {
        fetch('http://localhost:3001/users')
            .then( resp => resp.json())
            .then( users => {   
                dispatch(addUsers(users))})
    }
}
const updateUser = (userInfo) => {
  return {
    type: USER_AVATAR,
    userInfo
  }
}
export const userEditFunction = (userData, history) => {  
    return (dispatch) => {  
       dispatch(updateUser(userData))
   }
  }
  
  export const addNewFriend = (friend, currentUser, history) => {
    
    return(dispatch) => {
      fetch('http://localhost:3001/friendships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
        },
        body: JSON.stringify({
          current_user_id: currentUser.id,
          friend_id: friend.id
        })
      })
      .then(response => response.json())
      .then(json => { 
        dispatch({
        type: ADD_NEW_FRIEND,
        friends: json.friends,
        new_friend: friend
      })
        history.push('/')
    })
   }
 }
    const addNewChat = (chat) => {
      return {
        type: ADD_NEW_CHAT,
        chat
      }
    }
           
 export const newChat = (friend, currentUser, history) => {
   return(dispatch) => {
     fetch('http://localhost:3001/chats', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'Accepts': 'application/json'
       },
       body: JSON.stringify({
         title: 'NEW',
         current_user_id: currentUser.id,
         friend_id: friend.id
       })
     })
     .then(response => response.json())
     .then(chat => { 
       dispatch(addNewChat(chat))
       history.push('/')
   })
  }
 }

    

 
 

   
   


      


    
      
         

        