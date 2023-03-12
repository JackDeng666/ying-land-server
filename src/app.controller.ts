
import { Controller, Get, Query } from '@nestjs/common';
import * as cheerio from 'cheerio';
import axios from 'axios';

@Controller('nav')
export class AppController {
  constructor(
  ) {}

  @Get('getNavInfoByUrl')
  async getNavInfoByUrl(@Query('url') url: string): Promise<any> {
    
    const res = await axios({
      url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
      }
    })
    const $ = cheerio.load(res.data);

    const titleDom = $('title'),
      descDom = $("meta[name='description']"),
      iconDom = $("link[rel~='iconUrl']");
    let title = '',
      desc = '',
      iconUrl = '';
    if (titleDom.text()) {
      title = titleDom.text();
    }
    if (descDom.length > 0) {
      desc = descDom[0].attribs.content;
    }
    if (iconDom.length > 0) {
      iconUrl = iconDom[0].attribs.href;
      if (iconUrl.startsWith('//')) {
        const pre = url.startsWith('https') ? 'https:' : 'http:';
        iconUrl = pre + iconUrl;
      } else if (iconUrl.startsWith('/')) {
        iconUrl = url + iconUrl;
      }
    } else {
      iconUrl = url + '/favicon.ico';
    }
    const data = {
      title,
      desc,
      iconUrl,
    };
    return {
      meta: { status: 200, msg: '获取成功' },
      data,
    };
  }

  @Get('getEnv')
  async getEnv(): Promise<any> {

    return {
      meta: { status: 200, msg: '获取成功' },
      data: {
        ...process.env
      },
    };
  }
}
