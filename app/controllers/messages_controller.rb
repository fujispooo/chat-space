class MessagesController < ApplicationController
  def index
  end

  def create
    message = Message.create(content: message_params[:text],image: message_params[:image] ,user_id: current_user.id, group_id: message_params[:group_id])
    redirect_to "/groups/#{message.group.id}" 
  end

  private

  def message_params
    params.permit(:text :group_id :image)
  end
end
