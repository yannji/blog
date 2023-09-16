# 基础镜像
FROM openjdk:8-jre
# author
MAINTAINER yannji
# 挂载目录
VOLUME /home/yannji
# 创建目录
RUN mkdir -p /home/yannji
# 指定路径
WORKDIR /home/yannji
# 复制jar文件到路径
COPY ./jar /home/yannji/
# 启动系统服务
ENTRYPOINT ["java","-jar","blog.jar"]
