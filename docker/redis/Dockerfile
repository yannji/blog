# 基础镜像
FROM redis:6.0.18
# author
MAINTAINER yannji
# 挂载目录
VOLUME /home/yannji/redis
# 创建目录
RUN mkdir -p /home/yannji/redis
# 指定路径
WORKDIR /home/yannji/redis
# 复制conf文件到路径
COPY ./conf /home/yannji/redis/
## 执行命令
ENTRYPOINT ["redis-server","./redis.conf"]
