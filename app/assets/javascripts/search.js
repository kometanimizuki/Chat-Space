$(function() {

  function appendGroup(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">ユーザー名</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name="ユーザー名">追加</div>
                </div>`
  }
  $(".chat-group-form__input").on('keyup', function(e){
    var input = $(".chat-group-form__label").val();

    $.ajax({
      type: 'GET',
      url: '/users/index',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(groups) {
      $()
      if (groups.length !== 0) {
        groups.forEach(function(group){
          appendGroup(group);
        });
      }
      else {
        appendErrMsgHTML("ユーザー検索に失敗しました");
      }
    })
    .fail(function(data){
      alert('ユーザーの検索に失敗しました')
    })
  });
});
