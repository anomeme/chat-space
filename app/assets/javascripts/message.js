$(function(){
  $(document).on('turbolinks:load', function() { 
    function buildMessage(message){
      var image = message.image ? `<img src="${message.image}">`: " ";
      var html = `<div class="message_box">
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
                        ${message.text}
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
  });
});