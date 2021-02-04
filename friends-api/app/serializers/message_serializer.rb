class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content

  belongs_to :chat_id
  belongs_to :user_id

end