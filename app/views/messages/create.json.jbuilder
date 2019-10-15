json.name @message.user.name
json.date @message.created_at.strftime("%Y/%m/%d %H:%M")
json.text @message.text
json.image @message.image.url
json.id @message.id
