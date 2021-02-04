
Rails.application.routes.draw do

    resources :users
    resources :friendships
    resources :chats

    patch '/avatar/:id', to: 'users#upload_avatar'
    post '/login', to: 'auth#login'
    get '/current_user', to: 'auth#currentUser'
    post '/signup', to: 'auth#signup'

    post '/chats/:id/messages', to: 'chats#send_message'
    mount ActionCable.server => '/cable'


end


