var websock = null;
var globalCallback = null;
var lockReconnect = false;// 避免重复连接

/* 初始化weosocket */
function initWebSocket(wsurl, callback) {
    if (typeof (WebSocket) === 'undefined') {
        alert('您的浏览器不支持socket');
    } else {
        websock = null;
        globalCallback = callback;
        websock = new WebSocket(wsurl);
        websock.onopen = function() {
            websocketOpen();
        };
        websock.onerror = function() {
            reconnect(wsurl, callback);
            console.log('WebSocket连接发生错误');
        };
        websock.onmessage = function(e) {
            heartCheck.reset().start();
            websocketonmessage(e);
        };
        websock.onclose = function(e) {
            websocketclose(e);
        };
    }
}

/* 初始化失败，继续连接 */
function reconnect(wsurl, callback) {
    if (lockReconnect) return;
    lockReconnect = true;
    setTimeout(function() {
        initWebSocket(wsurl, callback);
        lockReconnect = false;
    }, 2000);
}

/* 实际调用的方法
* 1.若是ws开启状态
* 2.若是 正在开启状态，则等待1s后重新调用
* 3.若未开启 ，则等待1s后重新调用
* */
function sendSock(agentData) {
    if (websock.readyState === websock.CONNECTING) {
        setTimeout(() => {
            websock.send(JSON.stringify(agentData));
        }, 1000);
    }
    // if (websock.readyState === websock.OPEN) {
    //     agentData();
    // } else if (websock.readyState === websock.CONNECTING) {
    //     setTimeout(function() {
    //         sendSock(agentData);
    //     }, 1000);
    // } else {
    //     setTimeout(function() {
    //         sendSock(agentData);
    //     }, 1000);
    // }
}

/* 数据接收 */
function websocketonmessage(e) {
    if (globalCallback != null && globalCallback !== '' && globalCallback !== undefined) {
        if (typeof e.data === 'string') {
            try {
                JSON.parse(e.data);
                globalCallback(e.data);
            } catch (e) {
            }
        }
    } else {
        alert('在初始化时，没有给回调');
    }
}

/* 关闭 */
function websocketclose(e) {
    websock.close();
    globalCallback = null;
    console.log('WebSocket关闭成功');
}

function websocketOpen(e) {
    console.log('连接成功');
}

/* 心跳检测 */
var heartCheck = {
    timeout: 60000, // 60秒
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function() {
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        return this;
    },
    start: function() {
        var self = this;
        this.timeoutObj = setTimeout(function() {
            // 这里发送一个心跳，后端收到后，返回一个心跳消息，
            // onmessage拿到返回的心跳就说明连接正常
            websock.send('HeartBeat');
            self.serverTimeoutObj = setTimeout(function() { // 如果超过一定时间还没重置，说明后端主动断开了
                websock.close();// 如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
            }, self.timeout);
        }, this.timeout);
    }
};

export default {
    initWebSocket,
    sendSock,
    websocketonmessage,
    websocketclose
};
