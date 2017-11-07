function reloadArticle() {
    var getParam = getURLParameter();
    var addParam = '';

    if (!('id' in getParam))
        return false;
    else if ('page' in getParam && Number(getParam['page']) !== 1)
        return false;
    else {
        addParam += 'id=' + getParam['id'];

        if ('exception_mode' in getParam && getParam['exception_mode'] === 'recommend')
            addParam += '&page=1&exception_mode=recommend';
    }

    var orig = $('.t_notice');
    var finalNum;
    var $final;
    var ajaxFlag = true;

    for (var i = 0; i < orig.length; i++) {
        if (orig.eq(i).html() !== '공지') {
            if (orig.eq(i).html().indexOf('<img') !== -1)
                finalNum = Number(getParam['no']);
            else
                finalNum = Number(orig.eq(i).html());

            $final = orig.eq(i).parent();
            break;
        }
    }

    setInterval(function() {
        if (!ajaxFlag)
            return;

        ajaxFlag = false;
        jQuery.ajax({
            url: 'http://gall.dcinside.com/board/lists/?' + addParam,
            headers: {
                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8"
            },

            xhr: function () {
                var xhr = jQuery.ajaxSettings.xhr();
                var setRequestHeader = xhr.setRequestHeader;
                xhr.setRequestHeader = function (name, value) {
                    if (name == 'X-Requested-With') return;
                    setRequestHeader.call(this, name, value);
                };
                return xhr;
            },

            success: function (data, textStatus, jqXHR) {
                var maxNum = finalNum;
                var row = $(data).find('.t_notice');
                var new_list = [];

                for (var i = 0; i < row.length; i++) {
                    var $this = row.eq(i);
                    if ($this.html() !== '공지') {
                        var thisNum = Number($this.html());
                        if (thisNum > finalNum) {
                            if (thisNum > maxNum)
                                maxNum = thisNum;

                            new_list.push($this.parent());
                        }

                        if (thisNum === finalNum) {
                            var fadeInDelay = 0;
                            for (var j = new_list.length - 1; j >= 0; j--) {
                                $final.before(new_list[j].css({
                                    'display': 'none'
                                }));
                                $final = $final.prev();
                                $final.delay(fadeInDelay).fadeIn();
                                fadeInDelay += 300;
                            }
                            break;
                        }
                    }
                }
                finalNum = maxNum;
                ajaxFlag = true;
            }
        });
    }, 5100);
}

reloadArticle();