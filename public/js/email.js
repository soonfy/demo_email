/**
 * jquery 需要1.6以上
 */
$(function() {
    // 删除跟踪任务
    $('.del')
        .click(function(e) {
            var target = $(e.target)
            var id = target.data('id')
            var tr

            if (id !== undefined) {
                tr = $('.item-id-' + id)
            } else {
                var ids = []
                var trs = []
                $("input[name='subBox']")
                    .each(function() {
                        if ($(this).prop('checked') === true) {
                            var item = $(this)
                                        .parents('tr')
                                        .attr('class')
                                        .replace(/item-id-/, '')
                            ids.push(item)
                            trs.push($('.item-id-' + item))
                        }
                    })
            }
            id = id || ids.join(',')
            tr = tr || trs
            $.ajax({
                    type: 'DELETE',
                    url: '/email/list?id=' + id
                })
                .done(function(results) {
                    if (tr.length > 0) {
                        $.each(tr, function(index, ele) {
                            $(ele).remove()
                        })
                    }
                })
        })
    // 加入到跟踪列表
    $('.add-track')
        .click(function(e) {
            var title = $('.resource1').val()
            var url = $('.resource2').val()
            //console.log(title);
            var target = $(e.target)
            target.attr('disabled', true)
            setTimeout(function(){
                $('.resource1').val('')
                $('.resource2').val('')
                target.attr('disabled', false)
            }, 1000 * 5)

            $.ajax({
                type: 'get',
                url: '/email/add' +
                    '?title=' + title + '&url=' + url
            })
            .done(function(data) {

            })
        })

    // 加入到跟踪列表
    $('.update')
        .click(function(e) {
            var target = $(e.target)
            var id = target.data('id')
            var title = target.data('title')
            var url = target.data('url')
            $('.resource1').val(title)
            $('.resource2').val(url)

            var tr

            if (id !== undefined) {
                tr = $('.item-id-' + id)
            } 
            id = id
            tr = tr
            $.ajax({
                    type: 'DELETE',
                    url: '/email/list?id=' + id
                })
                .done(function(results) {
                    if (tr.length > 0) {
                        $.each(tr, function(index, ele) {
                            $(ele).remove()
                        })
                    }
                })
        })
          

    // 批量操作
    $('.all')
        .click(function() {
            var checked = $(this).children().prop('checked')
            // input有属性时，用双引号，其他内部没有的用单引号
            $("input[name='subBox']").each(function() {
                $(this).prop('checked', checked)
            })
        })
    var $subBox = $("input[name='subBox']")
    $subBox
        .click(function() {
            $('.all')
                .prop('checked', $subBox.length == $("input[name='subBox']:checked").length ? true : false)
        })
})
