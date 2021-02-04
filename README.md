# friends

Social Media App featuring real-time message delivery, user profile customization, easy network building, user authentication, mobile optimized.

# Usage and Features

friends is a Social Media App where messages are delivered red in real-time and the user can use multiple tools to access chats, edit profile, upload images, and connect with new friends.

# Prerequisites

## Backend

* Ruby on Rails 
* PostgreSQL
* Action Cable

## Frontend

* React
* React Router
* Redux Thunk middleware
* NPM Action Cable Package
* Custom JWT authentication system that integrates with JWT auth on the Rails API side.
* Cloudinary

# Installing

## Backend

After cloning this repo, first run the Rails server:
 
1. 
    ```
       cd friends-api
       bundle install 
    ```  

2. Database installation:

   ``` 
       rake db:create
       rake db:migrate
       rake db:seed 
   ```  
       
     
3. Run Rails server:
   rails s

   # Frontend

    ```
       cd ..  
       cd friends-client
       npm install && npm start 
     ```  
   
   


       