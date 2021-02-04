class FriendshipsController < ApplicationController
  def index
    friends = Friendship.all
    render json: friends
  end

  def create
    if params.include?(:friend_id)
      @new_friendships = Friendship.create_reciprocal_for_ids(params[:current_user_id], params[:friend_id])
      user = User.find(params[:current_user_id])
      render json: {friends: user.user_friends}
    else
      params[:user][:friend_ids].each do |f_id|
      @new_friendships = Friendship.create_reciprocal_for_ids(current_user_id, f_id)
      end
    end

    # redirect_to users_path
  end

  def destroy
    Friendship.destroy_reciprocal_for_ids(current_user_id, params[:friend_id])
    redirect_to(request.referer)
  end
end
          


