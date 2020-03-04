$(function(){ 
  
  var buildHTML = function(message) {
    if (message.content && message.image) {
      var html = `<div class="message" data-message-id="${message.id}">
        <div class="message__messageInfo">
          <div class="message__messageInfo__talker">
            ${message.user_name} 
          </div>
          <div class="message__messageInfo__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message__text">
          <p class="message__text__content">
            ${message.content}
          </p>
          <img src="${message.image}" class="message__text__image" >
        </div>
      </div>`
    } else if (message.content) {
      var html = `<div class="message" data-message-id="${message.id}">
        <div class="message__messageInfo">
          <div class="message__messageInfo__talker">
            ${message.user_name}
          </div>
          <div class="message__messageInfo__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message__text">
          <p class="message__text__content">
            ${message.content}
          </p>
        </div>
      </div>`
    } else if (message.image) {
      var html = `<div class="message" data-message-id="${message.id}">
        <div class="message__messageInfo">
          <div class="message__messageInfo__talker">
            ${message.user_name}
          </div>
          <div class="message__messageInfo__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message__text">
          <img src="${message.image}" class="message__text__image">
        </div>
      </div>`
    };
    return html;
  };
  

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
    .done(function(data){
      var html = buildHTML(data);
      $('.mainChat__messageList').append(html);
      $('.mainChat__messageList').animate({ scrollTop: $('.mainChat__messageList')[0].scrollHeight});
      $('form')[0].reset();
      $('.inputBox__submitBtn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
  
  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.mainChat__messageList').append(insertHTML);
        $('.mainChat__messageList').animate({ scrollTop: $('.mainChat__messageList')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});