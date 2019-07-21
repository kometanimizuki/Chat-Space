json.array! @users do |user|
  json.id user.id
  json.group group.id
end