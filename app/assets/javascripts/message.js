$(function(){
  function buildHTML(message){
    var img  = message.image !== null ?`<img src="${message.image}">`: ""
    var html = `<div class="message">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                      ${message.user_name} 
                    </div>
                    <div class="message__upper-info__date">
                      ${message.created_at}
                    </div>
                  </div>
                    <p class="message__text__content">
                        ${message.content} 
                    </p> 
                      ${img}
                  </div>
                </div>`
    return html;
  };
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.form__submit').prop('disabled', false);
      $('form')[0].reset();
    })
    .fail(function(){
      alert('テキストもしくは画像を挿入してください');
      $('.form__submit').prop('disabled', false);
    });
  });

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    last_message_id = $('.message:last').data('message-id');
    var href =  'api/messages'
    $.ajax({
      url: href,
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function (messages) {
      messages.forEach(function (message) {
        var insertHTML = buildHTML(message);
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
    })
    .fail(function () {
      alert('自動更新に失敗しました');
    })
    .always(function(){
      $(".form__submit").removeAttr("disabled");
    });
  }
};
  setInterval(reloadMessages, 10000);
});

