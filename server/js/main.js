$(document).ready(function () {
    function load_obj(num, min_p, max_p, type) {
        var st_num = num || 0;
        var fn_num = st_num + 15;
        window.next = fn_num;
        $.ajax('http://mintfile.ru:90/volg', {
            type: 'post',
            data: { 'num': st_num, 'min': min_p, 'max': max_p, 'type': type },
            isLocal: true,
            dataType: 'text',
            success: function (data) {
                var result = JSON.parse(data);
                for (var i = 0; i < result.length; i++) {
                    $('<article class="obj"><h2>' + result[i].ownerName + '</h2><p>' + result[i].description + '</p><article class="price">' + result[i].price + '</article><article class="obj_tel">' + result[i].ownerPhone + '</article></article>').appendTo('.obj_list');
                };
            },
            error: function (err) {
                $('<p>Error</p>').appendTo('.obj_list');
            }
        });
    };
    $('#but_load_new').click(function () {
        load_obj(next, min_pr, max_pr, type);
    });
    $('#but_sub_filter').click(function () {
        window.min_pr = $('#min_pr').val() || 0;
        window.max_pr = $('#max_pr').val() || 100000;
        if(isNaN(+min_pr) || isNaN(+max_pr)) {
            $('.input_req').slideDown();
        }
        else {
            $('.filter').slideUp(function () {
                var type_arr = [];
                for (var j = 1; j < 30; j++) {
                    if($('#ot'+j).is(':checked')) {
                        type_arr.push(j);
                    }
                };
                if (!type_arr[0]) {
                    window.type = '1, 2, 3, 12, 20, 27';
                }
                else {
                    window.type = type_arr.join(',');
                }
                load_obj(0, min_pr, max_pr, type);
                $('#but_load_new').show();
            });
        }
    });
});