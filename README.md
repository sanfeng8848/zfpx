### 珠峰培训架构课培训笔记记录
1. Node基础

2. git
```
1. 如果在github上创建了repo,并且有相关文件, 想把自己经在本地git管理的项目push到github, 
git push origin master 肯定要先pull
git pull origin master
会出现如下错误
fatal: refusing to merge unrelated histories

2. 解决
因为他们是两个不同的项目，要把两个不同的项目合并，git需要添加一句代码
git pull origin master --allow-unrelated-histories

3. 最后再push
git push origin master
```