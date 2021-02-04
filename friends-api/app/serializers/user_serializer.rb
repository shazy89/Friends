class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :avatar, :name, :public_email, :url, :about 

  has_many :friendships
  has_many :chats
  has_many :messages

end