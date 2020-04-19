1、需要执行模型的迁移,这样数据库中就会生成相应的表格</br>
    第一、python manage.py makemigrations user </br>
    第二、python manage.py migrate user </br>
    第三、python manage.py migrate </br>

2、创建超级管理员用户</br>
    python manage.py createsuperuser 回车</br>
    输入账号、密码、邮箱</br>
    已有管理员账号</br>
    admin</br>
    admin123</br>

3、班级相册的背景注释，修改地址</br>
    templates/user/class_photo.html 文件的第 73-39行</br>

