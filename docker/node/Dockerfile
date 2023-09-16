FROM node:16.20.0

MAINTAINER yannji
# 挂载目录
VOLUME /home/yannji/node
# 创建目录
RUN mkdir -p /home/yannji/node
# 指定路径
WORKDIR /home/yannji/node
# 复制html文件到路径
COPY ./output/ /home/yannji/node/

ENTRYPOINT ["node", "./server/index.mjs"]
