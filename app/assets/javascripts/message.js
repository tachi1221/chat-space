$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="message">
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
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="message">
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
     return html;
   };
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
});