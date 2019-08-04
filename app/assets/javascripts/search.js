$(document).on('turbolinks:load', function() {

  function appendUser(user) {
    var html = `<div class="user-search-result">
                <div class="chat-group-user clearfix chat-group-form__field">
                  <p class="chat-group-user__name">
                    ${user.name}
                  </p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>
                </div>`
                return html;
  }

    function appendMember(id, name) {
      var html = `<div class="chat-group-user clearfix chat-group-form__field">
                    <input name="group[user_ids][]" type="hidden" value=${id}>
                    <p class="chat-group-user__name">${name}</p>
                    <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove">削除</div>
                  </div>`
                  return html;
    }

  $('#user-search-result').on('click', '.user-search-add', function() {
    var id = $(this).attr('data-user-id');
    var name = $(this).attr('data-user-name');
    var user = appendMember(id, name)
    $('#chat-group-users').append(user)
    $(this).parent().remove();
  })

  $(document).on('click', '.user-search-remove', function() {
    $(this).parent().remove();
    $(this).parent('#chat-group-user').remove();
  })

  $('#user-search-field').on('input', function() {
    var input = $('#user-search-field').val();
    if (input.length !== 0) {
      $.ajax ({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users) {
        $('#user-search-result').empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            var html = appendUser(user);
            $('#user-search-result').append(html)
          });
        } else {
          alert("ユーザーが見つかりません")
        }
      })
      .fail(function() {
        alert("ユーザーの検索に失敗しました")
      })
    }
    else {
      $('.user-search-result').remove()
    }
    });
  });
