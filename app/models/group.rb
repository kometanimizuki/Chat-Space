class Group < ApplicationRecord
  has_many :messages
  has_many :group_users
  has_many :messages, through: :group_users
  validates :name, presence: true, uniqueness: true
  has_many :messages
end
