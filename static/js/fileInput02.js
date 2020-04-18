/**
 * make in phpstorm 2018/12/22
 * update in phpstorm 2019/1/22
 * @type {string[]}
 */

var fileTypeArr = ['jpg','gif','jpeg','png'];//文件格式限制
var fileSizeControl = 30;//文件大小控制 单位: MB
var allFile = [];//所有上传文件数组初始化 注：将根据此数组上传至后台
var htmlNums = 0;//页面元素ID属性控制
var activeOpen;//开启状态的button临时储存地址

/*FileReader 开始*/
//判断浏览器是否支持FileReader接口 
if(new FileReader == 'undefined') {
    result.InnerHTML = "<p>你的浏览器不支持FileReader！</p>";
    window.location.href = 'about:blank';
}

//上传图片触发方法
function up_files02(obj){
    obj.attr('isactive',true);
    if (obj.attr('filenums') == undefined){
        obj.attr('filenums',htmlNums);
        htmlNums++;
    }

    var modalHtml = //模态框的HTML内容
        '<div class="modal" >' +
        '<div class="modal-content">' +
        '    <!--主模态框-->' +
        '    <div class="file-reader">' +
        '        <div class="con_choice">' +
        '            <div class="input-click">' +
        '                <div class="chose-file" onclick="fileImg.click()">点击选择文件</div>' +
        '                <input id="fileImg" type="file" size="30" name="fileselect[]" multiple="" onchange="readAsDataURL('+obj.attr('filenums')+')">' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '    <!--主模态框 End-->' +
        '    <!--处理进度-->' +
        '    <div id="result">' +
        '        <div>' +
        '            <div id="result_info" class="info">选中0张文件，共0B。</div>' +
        '            <div id="result-btn">' +
        '                <div class="continue_upload" onclick="fileImg.click()">继续选择</div>' +
        '                <div class="simp-bt up_done" onclick="hideModal()">完成</div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '    <!--处理进度 End-->' +
        '    <!--临时图片浏览-->' +
        '    <div id="load_preview">' +
        '        <!--image is here-->' +
        '    </div>' +
        '    <!--临时图片浏览读取 End-->' +
        '</div>' +
        '<!--遮罩层-->' +
        '<div class="bar-hide" onclick="hideModal()">' +
        '</div>' +
        '<!--遮罩层 End-->' +
        '</div>';

    $('body').append(modalHtml);
    showModal(obj);
}

//该方法将文件读取为一段以 data: 开头的字符串，这段字符串的实质就是 Data URL，Data URL是一种将小文件直接嵌入文档的方案。
function readAsDataURL(namenum){
    //检验是否为图像文件
    var fileObj = $('#fileImg'); //获取图像临时路径
    var flagLength = 0;//文件循环标记
    var reader = new FileReader(); //初始化FileReader
    var valres = true;//图像验证标记
    var tempFileName;//临时上传图片标记 验证重复值使用

    if (fileObj[0].files.length != 0) {
        //多文件上传
        $.each(fileObj[0].files,function(k,v){
    	    valres = picVal(v);//图片大小和格式验证
        })
        if (valres == false) {return false;}

        reader.readAsDataURL(fileObj[0].files[flagLength]);
        // reader.onabort = function(e) {p("文件读取异常" + tempFileName);};
        // reader.onerror = function(e) {p("文件读取出现错误" + tempFileName);};

        reader.onload = function(e) {
            tempFileName = fileObj[0].files[flagLength].name;
            if(e.target.result) {
                if (!upPic_repeat(tempFileName)){//重复上传图片验证
                    $("#load_preview").append(getHtmlFile(fileObj[0].files[flagLength],reader.result));//加入模态框浏览

                    fileObj[0].files[flagLength]['tempUrl'] = reader.result;//临时浏览路径
                    fileObj[0].files[flagLength]['flagNums'] = namenum;//文件标记
                    allFile.push(fileObj[0].files[flagLength]);//将文件对象放入数组中

                }else{
                    alert('上传图片重复~');
                }

                flagLength++;//控制循环次数
                if(flagLength <  fileObj[0].files.length) {
                    reader.readAsDataURL(fileObj[0].files[flagLength]);//读取文件 再次调用onload
                } else {
                    //do something 图片上传全部完成之后
                    getNumAndSize();
                }
            }
        };
    }else{
        alert('请上传文件后再点击~');
    }
} 

/**
* 获取浏览图片页面追加元素
* @param tempUrl 返回的BASE64临时图片位置地址
*/
function getHtmlFile(obj,tempUrl){
    var cons =
        '<div class="file-append">' +
        '<div class="del-temp-file" onmouseover="showDel($(this))" onmouseleave="hideDel($(this))">' +
        '<div style="padding:5px;">' +
        '<p class="file_name">'+ obj.name +'</p>' +
        '<span class="file_del" data-index="0" title="删除" onclick="real_delFile($(this))"></span>' +
        '</div>' +
        '</div>' +
        '<a style="height:100px;width:120px;" href="#" class="imgBox" onmouseover="showDel($(this).parents(\'.file-append\').find(\'.del-temp-file\'))" onmouseleave="hideDel($(this).parents(\'.file-append\').find(\'.del-temp-file\'))">' +
        '<div class="uploadImg" style="width:105px">' +
        '<img id="uploadImage_0" class="upload-file" src="'+ tempUrl +'" style="width:expression(this.width > 105 ? 105px : this.width)">' +
        '</div>' +
        '</a>' +
        '<p id="uploadFailure_0" class="upload_fail">上传失败，请重试</p>' +
        '<p id="uploadSuccess_0" class="upload_success"></p>' +
        '</div>';
        return cons;
    }
    /*fileReader End*/

//删除浏览图片方法
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

//图片移入删除按钮显示
function showDel(obj){
    obj.addClass("del-temp-file-hover");
}
//图片移出删除按钮消失
function hideDel(obj){
    obj.removeClass("del-temp-file-hover");
}

//图片验证大小和格式
function picVal(obj){
    //验证格式
    if($.inArray(obj.type.substr(6),fileTypeArr)  == -1){ 
        alert("格式错误~"); 
        return false; 
    } 

    //验证大小
    if (obj.size >= fileSizeControl * 1024 * 1024) {
        alert("文件不能超过30MB~");
        return false;
    }
    return true;
}

/*****************************************PUBLIC 分割线~*************************************/
//隐藏模态框
function hideModal(){
    $('.modal').stop().hide();
    $('.bar-hide').stop().css('opacity',0);
    $('.modal-content').stop().css({'top':'30px','opacity':0});
    $('.modal').remove();//清除页面模态框
    $('.open-input').attr('isactive',false);
}
//显示模态框
function showModal(obj){
    var filenums = obj.attr('filenums');
    $('.modal').show();
    $('.bar-hide').animate({opacity:'1'},500);
    $('.modal-content').animate({top:'15px','opacity':1},500);

    activeOpen = obj;//将打开的对象放入临时储存地址
    //上传图片重新浏览
    $.each(allFile,function (k,v) {
        if (v.flagNums == filenums){
            $("#load_preview").append(getHtmlFile(allFile[k],v.tempUrl));//加入模态框浏览
        }
    })
    getNumAndSize();
}
//获取选中的文件数以及文件大小 并改变提示
function getNumAndSize(){
    var nowNum = activeOpen.attr('filenums');
    var nowFile = [];
    $.each(allFile,function (k,v) {
        if (v.flagNums == nowNum){
            nowFile.push(v);
        }
    })

    var allFileSize = 0;//总大小
    for (var i = 0; i < nowFile.length; i++) {
        allFileSize += nowFile[i].size;
    }
    var cons = '选中'+ nowFile.length + '张文件,共' + getComp(allFileSize)['val'].toString() + getComp(allFileSize)['comp'];

    $('#result_info').html(cons);//赋值
}
//大小单位 最高单位为MB
function getComp(comp){
    var compReturn = {};

    if (comp > 1024) {
        if (comp/1024 < 1024) {
            compReturn['comp'] = 'KB';
            compReturn['val'] = (comp/1024).toFixed(2);
        }else{
            compReturn['comp'] = 'MB';
            compReturn['val'] = (comp/1024/1024).toFixed(2);
        }
    }else{
        compReturn['comp'] = 'B';
        compReturn['val'] = comp;
    }

    return compReturn;
}
//清除FILE标签的内容 PS:防止删除图片后重新传造成重新传的相同图片无法上传的问题
function clearFile(){
    $('#fileImg').val('');
}
//验证上传的图片在allfile中是否有重复值 返回值为 true false
function upPic_repeat(name) {
    var rFlag = false;

    $.each(allFile,function (k,v) {
        if (v.name == name){
            rFlag = true;
        }
    })

    return rFlag;
}

//测试P
function p(cons){
    console.log(cons);
}
//新增 filereader浏览 formdata上传
//编辑 php浏览
