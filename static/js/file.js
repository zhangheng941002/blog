function real_delFile(obj){
    var fileName = obj.parents('.del-temp-file').find('.file_name').html();
    var delFlag;

    //从文件集合的数组中删除这个文件
    $.each(allFile,function(k,v){
        if (fileName == v.name) {
            delFlag = k;//储存键
        }
    })

    allFile.splice(delFlag,1);//删除对应键位数据 防止数组长度问题出现的报错
    obj.parents('.file-append').remove();//将这个文件从页面浏览中删除
    getNumAndSize();//重新提示
    clearFile();
}

function success(data) {

        if (data.status==1){
            // $('.alert').html(data.msg).addClass('alert-success').show().delay(1500).fadeOut();
            $('<div>').appendTo('body').addClass('alert alert-success').html('操作成功').show().delay(2000).fadeOut();
            // alert();
            location.reload();
        }else if(data.status==-1){
            alert(data.msg)
        }
        else {
            alert("图片上传失败")
        }

}




//开始上传图片
function do_upload(){
    //整理最终上传文件
    var nameFlags = 0;//重写文件名命名标记
    var tempFile = [];//临时文件对象存储变量
    console.log(111111111111111111111111111111111)
    $.each(allFile,function (k,v) {
        tempFile.push(new File([v],nameFlags.toString() + '.' + v.type.substr(6),{type: v.type}));//重建文件 加入数组
        nameFlags++;
    })

    var formData = new FormData();//FormData 转换成二进制文件上传至后台

    for(var i = 0; i < tempFile.length;i++){
        // formData.append('updown_iamges', tempFile[i]);
        formData.append(i, tempFile[i]);
    }
    // let token = window.sessionStorage.getItem('user_id')
    // console.log('---------------', token)
    $.ajax({
        url: 'user/photo/upload/',
        type: 'POST',
        // headers:{
        //     token: token
        // },
        data: formData,                    // 上传formdata封装的数据
        dataType: 'JSON',
        cache: false,                      // 不缓存
        processData: false,                // jQuery不要去处理发送的数据
        contentType: false,                // jQuery不要去设置Content-Type请求头
        success:function (res) {           //成功回调
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
