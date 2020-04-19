from django.contrib import admin
from django.utils.safestring import mark_safe

from user.models import *


class UserAdmin(admin.ModelAdmin):
    # show info
    list_display = ['username', 'email', 'class_num', 'school_name', 'sign']

    # every page show 10 info
    list_per_page = 10

    # filter field
    list_filter = ("school_name", "class_num")

    # search field
    search_fields = ("class_num",)


class SchoolAdmin(admin.ModelAdmin):
    list_display = ['id', 'school_name', 'comment']

    list_per_page = 10


class ClassInfoAdmin(admin.ModelAdmin):
    list_display = ['id', 'class_name', 'school_name']

    list_per_page = 10


class PhotoAdmin(admin.ModelAdmin):
    list_display = ['user_name', 'image_data','class_name', 'create_date']

    list_per_page = 10

    search_fields = ("user_name",)

    def has_add_permission(self, request):
        return False


class CommentAdmin(admin.ModelAdmin):
    list_display = ['title', 'user_name', 'comment', 'create_date']

    list_per_page = 10

    search_fields = ("user_name",)


class SchoolCommentAdmin(admin.ModelAdmin):
    list_display = ['user_name', 'comment', 'create_date']

    list_per_page = 10

    search_fields = ("user_name",)


admin.site.register(User, UserAdmin)
admin.site.register(School, SchoolAdmin)
admin.site.register(ClassInfo, ClassInfoAdmin)
admin.site.register(Photo, PhotoAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(SchoolComment, SchoolCommentAdmin)
