class User < ApplicationRecord
  has_many :friendships, dependent: :destroy
 
  has_many :user_chats
  has_many :chats, through: :user_chats
  has_many :messages

  has_secure_password
  # validates :username, presence: true
  # validates :password, presence: true


  def message_attributes=(message_attributes)
    message_attributes.values.each do |message|
      message = Message.find_or_create_by(message)
      self.messages << message
    end
  end


  def chat_attributes=(chat_attributes)
    chat_attributes.values.each do |chat|
      chat = Chat.find_or_create_by(chat)
      self.chats << chat
    end
  end

  def friend_attributes=(friend_attributes)
    friend_attributes.values each do |friend|
      friend = User.find_by(friend)
      self.friendships << friend
    end
  end

  def user_friends
    self.friendships
  end

  def user_chats
    self.chats
  end


    def chats_with_users
      self.user_chats.map do |chat|
        puts chat.chat_users
      end
    end

end