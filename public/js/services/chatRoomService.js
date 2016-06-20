App.factory('chatRoom', ['socket', '$rootScope', '$timeout', '$location', 'Notification',

function (socket, $rootScope, $timeout, $location, Notification) {

    var connectCallback, getPrivateMessageCallback, getRoomMessageCallback,
        getRoomsCallback, getUsersCallback, getChatsCallback, getStatusCallback;

    socket.on('connected', function (data) {

        getRoomsCallback(data.rooms);
        getUsersCallback(data.users);
        getStatusCallback(data.stasus);

        var chats = [];

        for (var i = 0; i < data.rooms.length; i++) {
            var newChat = {
                name: data.rooms[i].name,
                messages: []
            };
            chats.push(newChat);
        }

        for (var i = 0; i < data.users.length; i++) {
            if (data.users[i].name == $rootScope.userName) {
                getStatusCallback(data.users[i].status);
            }
            else {
                var newChat = {
                    name: data.users[i].name,
                    messages: []
                };
                chats.push(newChat);
            }
        }

        getChatsCallback(chats);
    });

    socket.on('new private message', function (data) {
        getPrivateMessageCallback(data);
    });

    socket.on('new room message', function (data) {
        getRoomMessageCallback(data);
    });

    return {
        sendMessage: function (message) {
            socket.emit('new message', {
                 sender: message.userName,
                 content: message.message,
                 roomName: message.currentChat.roomName,
                 type: message.type,
                 contacts: message.contacts
            });
        },

        switchRoom: function (roomData) {
            socket.emit('switch room', roomData);
        },

        connectToChat: function (userData) {
            if (userData)
                socket.emit('connect to chat', { userName: userData });
        },

        getMessages: function () {
            return messages;
        },

        getPrivateMessage: function (callback) {
            getPrivateMessageCallback = callback;
        },

        getRoomMessage: function (callback) {
            getRoomMessageCallback = callback;
        },

        getRooms: function (callback) {
            getRoomsCallback = callback;
        },

        getUsers: function (callback) {
            getUsersCallback = callback;
        },

        getChats: function (callback) {
            getChatsCallback = callback;
        },

        getStatus: function (callback) {
            getStatusCallback = callback;
        },

    }

}]);