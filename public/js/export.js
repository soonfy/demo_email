$(function(){

  $('.export')
        .click(function(e) {
          var target = $(e.target)
          target.attr('disabled', true)
          setTimeout(function(){
            target.attr('disabled', false)
          }, 1000 * 5)
            $.ajax({
                type: 'get',
                url: '/email/export'
            })
            .done(function(data) {
                //console.log(data);

            })
        })
})
