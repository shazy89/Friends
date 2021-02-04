class ChatsController < ApplicationController
  def index
    @chats = Chat.all
    render json: @chats
  end


  def create
    puts "in create"

    @chat = Chat.create(title: params[:title])
    user1 = User.find(params[:current_user_id])
    user2 = User.find(params[:friend_id])
    @chat.users << user1
    @chat.users << user2
    users = @chat.users
    chat_info = {chat: @chat, messages: [], users: users}
    
    render json: chat_info
  end
  


  def new
    render json
  end

  def show

    @chat = Chat.find(params[:id])
    messages = @chat.message_with_usernames
    users = @chat.chat_users
    chat_info = {chat: @chat, messages: messages, users: users}
    render json: chat_info
  end

  def edit
    render json
  end

  def send_message

   @chat = Chat.find(params[:id])

   @new_message = Message.create(content: params[:messages][:content], chat_id: params[:messages][:chat_id], user_id: params[:messages][:user_id], chat: @chat)
    
   ActionCable.server.broadcast('my_feed', @chat)
   return_json = @chat.message_with_usernames
   render json: return_json

  end

  private
  def chat_params
    params.require(:chat).permit(
      :title,
      user_ids: [],
      users_attributes: [
        :username, :password, :password_confirmation, :avatar
      ],
      message_ids: [],
      messages_attributes: [
        :content,
        :chat_id,
        :user_id
      ] 
    )
  end
end

