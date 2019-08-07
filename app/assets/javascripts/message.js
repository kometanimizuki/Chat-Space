$(document).on('turbolinks:load', function(){
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image.url ? `<img src= ${ message.image.url }>` : "";
    var html = `<div class="message__upper-info" data-id="${message.id}">
                    <p class="message__upper-info__talker">
                      ${message.user_name}
                    </p>
                    <p class="message__upper-info__date">
                      ${message.created_at}
                    </p>
                  </div>
                    <p class="lower-message__text">
                      <div>
                        ${content}
                      </div>
                      <div>
                        ${img}
                      </div>
                    </p>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formdata = new FormData(this);
    var url = (window.location.href);
    $.ajax({
      url: url,
      type: "POST",
      data: formdata,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('form')[0].reset();
    })
    .done(function scrollBottom(){
      var target = $('.message__upper-info').last();
      var position = target.offset().top + $('.messages').scrollTop();
      $('.messages').animate({
        scrollTop: position
      }, 300, 'swing');
    })  
    .fail(function(){
      alert('メッセージは送信できませんでした')
    })
    .always(function(){
      $('.submit-btn').prop('disabled', false); 
    })
  })

  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message__upper-info:last').data("id"); 
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {last_id: last_message_id}
      })
      .done(function (messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 3000);
  });