class _PaymentIQCashier {
  url = "https://payaggregator.com/main/waiting-session/";
  postUrl = "https://payaggregator.com/main/set-session/";
  data = {};
  events = {
    success: () => {},
  };
  api = {
    on: (event) => {
      for (let key in event) {
        if (key === "success") {
          this.events[key] = event[key];
        }
      }
    },
    set: (data) => {
      this.data = { ...data.config };
    },
    css: (css) => {
      return css;
    },
  };

  constructor(id, data, callbackfunc) {
    this.Init(id, data, callbackfunc);
  }

  async Init(id, data, callbackfunc) {
    callbackfunc(this.api);
    this.data = { ...this.data, ...data };
    const setSession = await this.postRequestToCreateSession(this.data);
    const url = this.createUrl(this.data);
    console.log(this.data);
    this.createIframe(id, url);
  }
  emitSuccess(data) {
    this.events.success(data);
  }

  createIframe(id, url) {
    const htmlBlock = document.querySelector(id);
    const iframe = document.createElement("iframe");
    iframe.setAttribute("src", url);
    iframe.style.width = "100%";
    iframe.style.height = "45rem";
    htmlBlock.style.width = "100%";
    htmlBlock.style.height = "45rem";
    // iframe.style.minHeight = data.containerMinHeight;
    htmlBlock.appendChild(iframe);
  }

  async postRequestToCreateSession(data) {
    return await fetch(this.postUrl, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //make sure to serialize your JSON body
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response, "response from post request");
      //do something awesome that makes the world a better place
    });
  }

  createUrl(data) {
    console.log(data, "data in creating url");
    return `${this.url}${data.sessionId}`;
  }

  responseWithCallBack(res) {
    return this.callbackfunc();
  }
}
