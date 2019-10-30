## 这是一个贴吧类型的项目
> 下面是该项目需求的粗略描述，因为是练习用项目，所以只做单个贴吧。
 **用户需求**  
   用户：  
   1. 发布帖子，可对自己发的贴子进行删除修改评论，设置禁止回复，对其他用户进行回复
   2. ~~修改个人信息~~
   
   吧主：
   1. 发布帖子，可以置顶帖子，可以对所有帖子进行删除和设置禁止回复
   2. 可以禁言用户，删除用户回复
   3. ~~将帖子设置为他人不可见~~
   4. 设置精品贴子
   5. ~~可以转让吧主~~

**系统需求**
  1. 发布帖子  
  基本的文本输入（暂定md格式输入），图片上传并压缩
  2. 评论&回复  
  可以在帖子下方进行回复，可在其它用户的回复下进行回复
  3. 删除帖子  
  存在垃圾箱中，可由管理员进行还原，手动清理垃圾箱或自动清理
  4. 禁止回复  
  禁止回复后不能再添加新的回复，但是之前的回复保留
  5. 置顶&加精帖子  
  将一个或多个帖子放在所有帖子前进行显示，可以对帖子进行加精标注
  6. 帖子浏览  
  防止页面dom元素过多造成卡顿，需要对帖子进行分页加载

**后台需求**
  1. 主要是管理员对帖子垃圾箱进行管理
  2. 对每个用户的发帖数，回复数进行统计
  3. 记录每个帖子的点击量

# 项目架构
> 使用 Vue + Koa + MySql 进行的个人全栈开发

下面是前端需要的内容粗略归纳，斜体表示可复用组件
## 前端
  首页：  
  - *导航条*
  - *本吧信息*
  - 吧主信息
  - 置顶帖
  - 帖子列表
  - *底部标注*
  - *悬浮窗*

  帖子编辑页：
  - 帖子头
  - 帖子内容
  - MD格式预览
  - 底部工具

  帖子草稿页：
  - *导航条*
  - 草稿箱
  - *底部标注*

  帖子浏览页：
  - *导航条*
  - 楼主信息
  - 帖子基本信息
  - 帖子内容
  - 帖子回复
  - *底部标注*
  - *悬浮窗*

  吧主管理页：
  - *导航条*
  - 本人信息
  - *本吧信息*
  - 用户列表
  - *底部标注*

  后台管理页：
  - *本吧信息*
  - 垃圾箱
  - 统计表

下面是后端需要的功能粗略归纳
## 后端主要交互请求
 用户登录：
 - （白名单）用户登陆后取得权限，非白名单请求需要权限。
 - 疑问：使用什么方式来设置权限？如何区分普通用户，吧主，和管理员

 用户注册：
 - （白名单）需要自定用户名和密码，密码需要加密。

 发帖子：
 - 确认权限后，将帖子信息存在服务器
 - 疑问：文本以什么格式存储？图片上传如何处理？

 看帖子：
 - （白名单）点击帖子，根据帖子唯一标识来返回帖子的数据以及楼主信息
 - 疑问：数据库中，帖子数据如何与楼主信息相关联？

 回复：
 - （白名单）根据用户当前浏览帖子的唯一标识返回该帖子的所有回复内容。
 - 确认权限后，用户发表的回复将存在数据库中
 - 疑问：数据库中，帖子如何与回复相关联，用户之间的回复如何关联？

 删除帖子：
 - 确认权限后，将用户选择的帖子移入垃圾箱
 - 疑问：数据库该如何表示帖子在垃圾箱中？

 置顶&加精帖子：
 - 确认吧主权限后，将帖子标识为置顶或加精
 - 疑问：数据库中如何表示置顶和加精状态？

 关闭回复：
 - 确认权限后，将帖子标识为不可回复状态
 - 疑问：数据库中如何标识不可回复状态？

 删除回复：
 - 确认权限后，将某一楼以及旗下全部回复删除
 - 技术难点：数据库中回复的关联需要设计好！

 设置他人不可见：
 - 确认吧主权限后，将该帖子隐藏。
 - 疑问：如何标识隐藏状态？

 ## 权限约束
  用户登录后，服务端给客户端签发 含有user_id 的token，请求非白名单API时，服务端校验token，并取得user_id