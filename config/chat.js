module.exports = function (io) {

    var User = require('../models/user');
    var Message = require('../models/message');
    var Room = require('../models/room');

    io.on('connection', function (socket) {

        //Listens for new user
        socket.on('connect to chat', function (data) {

            Room.find({ members: data.userName }, function (err, rooms) {

                if (err) throw err;

                User.find( {}, { 'status': 1, 'name': 1, 'connectionId': 1 }).exec(function (err, users) {

                    if (err) throw err;

                    for (var i = 0; i < rooms.lenght; i++) {
                        socket.join(rooms[i].name);
                        io.in(rooms[i].name).emit('user joined', data);
                    }

                    socket.emit('connected', {
                        rooms: rooms,
                        users: users
                    });

                });

            });

            User.update({ name: data.name }, { $set: { connectionId: socket.connectionId } }, function (err, result) {

                if (err) throw err;

                socket.emit('new user connected', {
                    user: {
                        name: data.name,
                    }
                });

            });

        });

        //Listens for new user
        socket.on('new user', function (data) {
          //  socket.join(defaultRoom);
          //  io.in(defaultRoom).emit('user joined', data);
        });

        //Listens for switch room
        socket.on('switch room', function (data) {
           // socket.leave(data.oldRoom);
           // socket.join(data.newRoom);
           // io.in(data.oldRoom).emit('user left', data);
           // io.in(data.newRoom).emit('user joined', data);
        });

        socket.on('switch status', function (data) {
            
        });

        //Listens for a new chat message

        socket.on('new message', function (data) {

            var newMsg = new Message({
                sender: data.sender,
                content: data.content,
                roomName: data.roomName,
                type: data.type,
                createdDate: new Date()
            });

            console.log(data);

            if(data.contacts) newMsg.contacts = data.contacts;

            newMsg.save(function (err, msg) {

                if (err) throw err;

                io.in(msg.roomName).emit('new room message', msg);
            });
        });
    });

    io.on('connect', function (socket) {

    });
};