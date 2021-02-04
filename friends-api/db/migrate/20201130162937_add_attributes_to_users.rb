class AddAttributesToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :name, :string
    add_column :users, :public_email, :string
    add_column :users, :url, :string
    add_column :users, :about, :text
  end
end
