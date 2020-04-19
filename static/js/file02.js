function real_delFile(obj){
    var fileName = obj.parents('.del-temp-file').find('.file_name').html();
    var delFlag;


    $.each(allFile,function(k,v){
        if (fileName == v.name) {
            delFlag = k;
        }
    })

    allFile.splice(delFlag,1);
    obj.parents('.file-append').remove();
    getNumAndSize();
    clearFile();
}

function success(data) {

        if (data.status==1){
            $('<div>').appendTo('body').addClass('alert alert-success').html('操作成功').show().delay(1000).fadeOut().delay(3000);
            location.reload();
        }else if(data.status==-1){
            alert(data.msg)
        }
        else {
            alert(data.msg)
        }

}




//开始上传图片
function do_upload02(){
    var nameFlags = 0;
    var tempFile = [];
    $.each(allFile,function (k,v) {
        tempFile.push(new File([v],nameFlags.toString() + '.' + v.type.substr(6),{type: v.type}));
        nameFlags++;
    })

    var formData = new FormData();

    for(var i = 0; i < tempFile.length;i++){
        formData.append(i, tempFile[i]);
    }
    $.ajax({
        url: '/user/class_photo/upload/',
        type: 'POST',
        data: formData,
        dataType: 'JSON',
        cache: false,
        processData: false,
        contentType: false,
        success:function (res) {
           success(res,"",function(){
				})
            }
        }

    )
}



function emptyHtmlVal() {
    if ($('.btn-control').length <= 1){
        return false;
    }
    return true;
}
