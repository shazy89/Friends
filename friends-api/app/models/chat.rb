class Chat < ApplicationRecord
  has_many :messages
  has_many :user_chats
  has_many :users, through: :user_chats

  def message_with_usernames

    self.messages.map { |message|
      message.slice(:id, :username, :avatar, :content, :chat_id, :created_at)
    }
  end

  def message_attributes=(message_attributes)
    message_attributes.values.each do |message|
      message = Message.find_or_create_by(message)
      self.messages << message
    end
  end

  def user_attributes=(user_attributes)
    user_attributes.values.each do |user|
      user = User.find_or_create_by(user)
      self.users << user
    end
  end

  def chat_users
    users = []
    self.messages.each do |msg|
      u = User.find_by(username: msg.username)
      if !users.any? {|usr| usr.id == u.id}
        users << u
      end
    end
    return users
  end
  
  end