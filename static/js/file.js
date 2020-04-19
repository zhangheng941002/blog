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
            $('<div>').appendTo('body').addClass('alert alert-success').html('操作成功').show().delay(2000).fadeOut();
            location.reload();
        }else if(data.status==-1){
            alert(data.msg)
        }
        else {
            alert("图片上传失败")
        }

}




function do_upload(){
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
        url: '/user/photo/upload/',
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



//空选择器验证
function emptyHtmlVal() {
    if ($('.btn-control').length <= 1){
        return false;
    }
    return true;
}
