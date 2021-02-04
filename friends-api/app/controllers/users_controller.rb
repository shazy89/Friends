class UsersController < ApplicationController
    
  def check_configuration
    render 'configuration_missing' if Cloudinary.config.api_key.blank?
  end

  def index
    users = User.all
    render json: users
  end
    
      def create
        
        user = User.find_or_create_by(username: params[:user][:username])
        user.update(avatar: 'https://materializecss.com/images/yuna.jpg')
        friends = user.friendships
        chats = user.chats
        user_info = {user: user, friends: friends, chats: chats}
        render json: user_info
      end
    
      def show
        @user = User.find(params[:id])
        @friends = @user.user_friends
        
        @chats = @user.chats.map do |chat|    
          messages = chat.message_with_usernames
          users = chat.chat_users
          {chat: chat, messages: messages, users: users}
        end
    
        user_info = {user: @user, friends: @friends, chats: @chats}
        render json: user_info
      end

      def new
    
        render json
      end

      def update
      
         @user = User.find( params[:user_id])
        if @user.update(user_params)
          render json: @user
           else
           render json: @car.errors, status: :unprocessable_entity
           end
       end

       def upload_avatar 
         @user = User.find( params[:user_id])
         url = uploadToCloudinary(params[:reader])
         @user.avatar = url
         if @user.save
           render json: @user
         else
           render json: @car.errors, status: :unprocessable_entity
         end
       end
      
       def destroy
     
       end
     
       private
     
       def user_params
         
         params.require(:user).permit(
           :username, :password, :password_confirmation, :avatar, :name, :public_email, :url, :about, 

           chat_ids: [],
           chats_attributes: [
             :title
           ],
           message_ids: [],
           messages_attributes: [
             :content,
             :chat_id,
             :user_id
           ]
         )
       end
     
   def uploadToCloudinary(data)
     Cloudinary::Uploader.upload(data, :folder => 'Friends')["url"]
   end
     
 end  

        
         
     
          
         
        
        
        
        
          

    
    
    
    
    
    
    
    