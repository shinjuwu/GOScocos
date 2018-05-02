"use strict";
cc._RF.push(module, '558f6Ld1mxIVbQHXKNQfjIL', 'connect');
// scripts/connect.js

"use strict";

var mqtt = require("../Lib/umdMqtt");
var cfg = {
	load: function load() {
		console.log('mqtt');
		var client = mqtt.connect("ws://127.0.0.1:3653", {

			//var client = mqtt.connect("egret://127.0.0.1:3653",{
			//var client = mqtt.connect("laya://127.0.0.1:3653",{
			protocolId: 'MQIsdp',
			protocolVersion: 3,
			clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
			reconnectPeriod: 0 //不自动重连
		}); // you add a ws:// url here
		client.sendMessage = function (msgid, body) {
			//发送数据
			//这里是发送消息给服务端，可以先将 msgid 转 topic
			client.publish("Login/HD_Login/1", body);
		}.bind(client);
		client.on("message", function (topic, payload) {
			console.log([topic, payload].join(": "));
			//这里可以将 topic 转成 msgid 传给上一级代码
			//client.end()
		});
		client.on('connect', function () {
			//连接成功了，这里可以进行登陆操作
			console.log('connect');
			client.sendMessage(3001, "{\"userName\":\"xxxxx\", \"passWord\":\"123456\"}");
		});
		client.on('reconnect', function () {
			//当一个重连开始
		});
		client.on('close', function () {
			console.log('close');
		});
		client.on('error', function () {
			console.log('error');
			console.log(arguments);
		});
	}
};

module.exports = cfg;

cc._RF.pop();