const https = require("https");
const fs = require('fs');
const path = require('path');

module.exports = class FileDownloader {
  static async request(request, cookies, userData) {
    const options = {
      encoding: null,
      method: request._method,
      headers: request._headers,
      resolveWithFullResponse: true,
    }
    options.headers.Cookie = cookies.map(cookie => cookie.name + '=' + cookie.value).join(';');
  
    return new Promise((resolve, reject) => {
      const req = https.request(request._url, options, (response) => {
        if(response.statusCode !== 200) {
          reject()
          return
        }
        
        const machedArray = RegExp('filename=(.*)', 'g').exec(response.headers['content-disposition'])
        const filepath = path.join(userData.directoryToSaveFile || '', machedArray[1])

        const stream = fs.createWriteStream(filepath, { encoding: null });
        response.on('data', (chunk) => stream.write(chunk));
        response.on('end', () => {
          stream.end();
          request.abort()
          resolve()
        });
      });
      
      req.on('error', (e) => reject(e));
      req.write(request._postData);
      req.end();
    });
  }
}