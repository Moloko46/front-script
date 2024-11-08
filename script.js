class _PaymentIQCashier {
    url = (env) => {
        if (env == "production") {
            return "https://4re.team/main/waiting/";
        }
        if (env == "test") {
            return "https://staging.payaggregator.com/main/waiting/";
        }
    };
    postUrl = (env) => {
        if (env == "production") {
            return "https://4re.team/main/pending/";
        }
        if (env == "test") {
            return "https://staging.payaggregator.com/main/pending/";
        }
    };
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
        console.log(this.data);
        const setSession = await this.postRequestToCreateSession(this.data);
        const url = this.createUrl(this.data);
        if (this.data.redirect) {
            window.top.location.href = url;
        } else {
            this.createIframe(id, url);
        }
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
        htmlBlock.appendChild(iframe);
    }

    async postRequestToCreateSession(data) {
        return await fetch(this.postUrl(data.environment), {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((response) => {});
    }

    createUrl(data) {
        return `${this.url(data.environment)}${data.sessionId}`;
    }

    responseWithCallBack(res) {
        return this.callbackfunc();
    }
}
