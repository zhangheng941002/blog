# 人丑就要多学习

from django.conf.urls import url
from user.views import *

urlpatterns = [
    url(r'^login/$', login),
    url(r'^register/$', register),
    url(r'^ucenter/(\d*)$', ucenter),
    url(r'^user_center/(\d*)$', user_center),
    url(r'^logout/$', logout),
    url(r'^comment/$', comments),
    url(r'^push_sug$', push_sug),
    url(r'^photo/(\d*)$', photo),
    url(r'^school_photo/(\d*)$', school_photo),
    url(r'^load/$', load),
    url(r'^register_exist/$', register_exist),
    url(r'^yanzhengma/$', yanzhengma),
    url(r'^xgmm/$', xgmm),
    url(r'^photo/upload/$', upload),
    url(r'^class_photo/upload/$', class_upload),
    url(r'^delete_photo', delete_photo),
    url(r'^delete_class_photo', delete_class_photo),
    url(r'^update_sign', update_sign),
    url(r'^school_conment/(\d*)$', school_conment),
    url(r'^query/(\d*)$', query),
    url(r'^query_first/$', query_first),
    url(r'^update_school_comment', update_school_comment),

]
