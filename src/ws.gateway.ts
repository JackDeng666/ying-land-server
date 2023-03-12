import { Controller } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { promiseSleep } from './utils';
console.log(process.env.WEB_SOCKET_ORIGIN_URL)
@WebSocketGateway(80, {
  cors: {
    origin: process.env.WEB_SOCKET_ORIGIN_URL,
    credentials: true,
  },
  allowRequest: (req, callback) => {
    callback(null, req.headers['token-header'] == 'abcd');
  },
})
@Controller('/io')
export class WsStartGateway {
  handleConnection(socket) {
    setTimeout(() => {
      socket.emit(
        'csToUser',
        `连接成功！请输入快捷键选择功能：\n1. 帮助\n2. 人工客服`,
      );
    }, 500);
  }

  @SubscribeMessage('userToCs')
  async userToCs(@MessageBody() data: string): Promise<WsResponse<unknown>> {
    let res = '0';
    if (data == '1') {
      res = 'hhhhhhhhhhhhhh';
    } else {
      res = '爬';
    }
    await promiseSleep(2000);
    return { event: 'csToUser', data: res };
  }
}
