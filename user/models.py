from django.db import models
from django.utils.html import format_html


# 用户信息
class User(models.Model):
    username = models.CharField("用户名", max_length=10)
    password = models.CharField("密码", max_length=20)
    email = models.CharField("邮箱", max_length=60)
    class_id = models.CharField("班级ID", max_length=255)
    class_num = models.CharField("班级", max_length=255)
    school_id = models.CharField("学校ID", max_length=255)
    school_name = models.CharField("学校", max_length=255)
    sign = models.TextField("个性签名", blank=True, null=True)
    jf = models.IntegerField(default=0)
    status = models.IntegerField("用户状态", default=1)

    class Meta:
        db_table = 'user'
        verbose_name_plural = '学生'
        verbose_name = '学生'


class School(models.Model):
    school_name = models.CharField("学校名称", max_length=255)
    comment = models.TextField('学校简介')
    status = models.IntegerField('状态', blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'school_info'
        verbose_name_plural = '学校'
        verbose_name = '学校'


class ClassInfo(models.Model):
    class_name = models.CharField("班级", max_length=255)
    school_name = models.CharField("学校", max_length=255)

    class Meta:
        managed = True
        db_table = 'class_info'
        verbose_name_plural = '班级'
        verbose_name = '班级'


class Photo(models.Model):
    user_id = models.CharField("用户ID", max_length=255)
    user_name = models.CharField("用户名", max_length=255)
    class_id = models.CharField("相册归属", max_length=255)
    img = models.CharField("图片", max_length=255)
    create_date = models.DateField("上传时间", auto_now_add=True)
    status = models.IntegerField('状态', blank=True, null=True, default=1)

    def image_data(self):
        return format_html(
            '<a href="/static/load/{}" target="_blank"><img src="/static/load/{}" width="100px"/></a>',
            self.img, self.img
        )

    image_data.short_description = '图片'

    def class_name(self):
        try:
            if self.class_id:
                _class_names = ClassInfo.objects.filter(id=self.class_id)
                _class_name = _class_names.first().class_name + "---班级相册"
            else:
                _class_name = "个人相册"
            return format_html(
                '<span>{}</span>', _class_name
            )
        except:
            return "aaa"

    class_name.short_description = '相册归属'

    class Meta:
        managed = True
        db_table = 'photo'
        verbose_name_plural = '照片'
        verbose_name = '照片'


class Comment(models.Model):
    title = models.CharField('标题', max_length=255)
    user_id = models.CharField('用户id', max_length=255)
    user_name = models.CharField('用户名', max_length=255)
    comment = models.TextField('内容')
    create_date = models.DateTimeField('发表时间', auto_now_add=True)
    update_date = models.DateTimeField('更新时间', auto_now_add=True)
    status = models.IntegerField('状态', default=1)

    class Meta:
        managed = True
        db_table = 'comment'
        verbose_name_plural = '日志'
        verbose_name = '日志'


class SchoolComment(models.Model):
    user_id = models.CharField('用户id', max_length=255)
    class_id = models.CharField('班级id', max_length=255)
    user_name = models.CharField('用户名', max_length=255)
    comment = models.TextField('评论')
    create_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField('状态', default=1)

    class Meta:
        managed = True
        db_table = 'school_comment'
        verbose_name_plural = '班级留言板'
        verbose_name = '班级留言板'
