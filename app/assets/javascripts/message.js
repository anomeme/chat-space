$(function(){
  $(document).on('turbolinks:load', function() { 
    function buildMessage(message){
      var text = message.text ? `${message.text}` : " ";
      var image = message.image ? `<img class="lower-info__image" src="${message.image}">`: " ";
      var html = `<div class="message_box" data-message-id="${message.id}">
                    <div class="right-contents__maine--info">
                      <div class="right-contents__maine--info--user">
                        ${message.name}
                      </div>
                      <div class="right-contents__maine--info--date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="right-contents__maine--text">
                      <p class="lower-message__text">
                        ${text}
                      </p>
                      ${image}
                    </div>
                  </div>`
      return html;
    }
    $('#new_message').on('submit', function(e){
      e.preventDefault();  
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(message){
        var html = buildMessage(message);
        $('.right-contents__maine').append(html);
        $('.right-contents__maine').animate({scrollTop: $('.right-contents__maine')[0].scrollHeight}, 'fast'); 
        $('#new_message')[0].reset();
      })
      .fail(function(){
        alert('メッセージを入力してください。');
      })
      .always(function(){
        $('.send').removeAttr("disabled");
      })
    });
    
    var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        var url = 'api/messages#index {:format=>"json"}'
        var message_id = $('.message_box:last').data('message-id');
        $.ajax({
          url: url,
          type: "GET",
          data: {id: message_id},
          dataType: "json"
        })
        .done(function(messages) {
          var html = '';
          messages.forEach(function(message) {
            html = buildMessage(message);
            $('.right-contents__maine').append(html);
            $('.right-contents__maine').animate({scrollTop: $('.right-contents__maine')[0].scrollHeight}, 'fast'); 
          });
        })
        .fail(function() {
          alert('自動更新に失敗しました');
        });
      }
    }
    setInterval(reloadMessages, 3000);
  });
});