class CreateFriendships < ActiveRecord::Migration[6.0]
  def change
    create_table :friendships do |t|
      t.string :user_id
      t.string :friend_id

      t.timestamps
    end
    add_index :friendships, :user_id
    add_index :friendships, :friend_id
  end
end
