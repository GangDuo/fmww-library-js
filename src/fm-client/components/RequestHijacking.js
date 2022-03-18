module.exports = class RequestHijacking {
  get page() {
    return this.page_
  }

  set page(v) {
    this.page_ = v
  }

  constructor(page) {
    this.page = page;
  }

  async intercept(url, requestSender, userData) {
    const page = this.page
    
    if(!requestSender) return;
    await page.setRequestInterception(true);
        
    page.on('request', async (request) => {
      const pattern = new RegExp(url, 'g')
      if(!pattern.test(request._url)) {
        request.abort()
        return
      }

      const cookies = await page.cookies();
      await requestSender.call(null, request, cookies, userData)
    });  
  }
}