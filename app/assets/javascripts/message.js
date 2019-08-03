$(function(){
  function buildHTML(message){
    var img = ""
    if (message.image !== null) {
       img = `<img src="${message.image}">`
    } 
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
  }
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
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
      $('#message_content').val('');
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('テキストもしくは画像を挿入してください');
      $('.form__submit').prop('disabled', false);
    });
  });
});