FROM node
RUN mkdir -p /opt/chat-room
WORKDIR /opt/chat-room
COPY . .
RUN yarn install --production
ENV PORT=80
EXPOSE 80
CMD ["npm", "start"]