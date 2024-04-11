class _PaymentIQCashier {
  url = "https://payaggregator.com/main/waiting-page/";

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
    callbackfunc(this.api);
    this.data = { ...this.data, ...data };
    const url = this.createUrl(data);
    console.log(this.data);
    setTimeout(() => {
      this.createIframe(id, url, this.data);
    }, 1000);
  }
  emitSuccess(data) {
    this.events.success(data);
  }

  createIframe(id, url, data) {
    const htmlBlock = document.querySelector(id);
    const iframe = document.createElement("iframe");
    iframe.setAttribute("src", url);
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    htmlBlock.style.width = "100%";
    htmlBlock.style.height = "100%";
    // iframe.style.minHeight = data.containerMinHeight;
    htmlBlock.appendChild(iframe);
  }

  createUrl(data) {
    console.log(data, "data in creating url");
    return `${this.url}${data.sessionId}/${data.userId}/${
      data.merchantId
    }?${new URLSearchParams({ ...data }).toString()}`;
  }

  responseWithCallBack(res) {
    return this.callbackfunc();
  }
}

// const data = {
//   merchantId: "87483265",
//   userId: "3415135",
//   sessionId: "222222",
//   environment: "dev",
//   method: "creditCard",
//   locale: "test",
//   providerType: "<?php echo $fields->providerType;?>",
//   mode: "<?php echo $fields->mode;?>",
//   attributes: "<?php echo json_encode($fields->attributesArr);?>",
//   user: "<?php echo json_encode($fields->userArr);?>",
//   autoProcess: "<?php echo ($fields->autoProcess ? 'true' : 'false');?>",
//   predefinedValues: false,
//   containerHeight: "100%",
//   containerMinHeight: "800px",
//   showFooter: false,
//   showHeader: false,
//   dev_close_transaction_with_status: "fail",
//   isWhiteList: true,
// };
