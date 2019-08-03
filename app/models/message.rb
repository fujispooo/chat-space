class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :content, presence: true, unless: :image?
  mount_uploader :image, ImageUploader
  # validates :content, presence: true, if: -> { image.blank? }
  # validates :image, presence: true, if: -> { content.blank? }
end
