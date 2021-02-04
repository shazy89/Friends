class FeedChannel < ApplicationCable::Channel
    def subscribed
      stream_from "my_feed"
    end
  
    def unsubscribed
      # Any cleanup needed when channel is unsubscribed
    end
  end