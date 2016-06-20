App.controller('ChatController', ['$scope', '$rootScope', '$timeout', '$location', 'Notification', 'chatRoom', '$localStorage',

 function ($scope, $rootScope, $timeout, $location, Notification, chatRoom, $localStorage) {

     chatRoom.getChats(getChats);
     chatRoom.getRooms(getRooms);
     chatRoom.getUsers(getUsers);
     chatRoom.getStatus(getStatus);

     chatRoom.connectToChat($scope.userName);

     $scope.chats = [];
     $scope.rooms = [];
     $scope.users = [];

     $scope.currentChat= { name: 'general', type: 'Group' };

     $scope.status = '';

     $scope.message = '';

     $scope.sendMessage = function () {

         if ($scope.message == '') return;

         var newMsg = {
                 sender: $rootScope.userName,
                 content: $scope.message,
                 roomName: $scope.currentChat.name,
                 type: $scope.currentChat.type
             }

         if ($scope.currentChat.type == 'Personal') {

             newMsg.contacts = [$rootScope.userName, currentChat.name];
         }

         chatRoom.sendMessage(newMsg);
         $scope.message = '';
     };

     $scope.chooseChat = function (chat) {
        $scope.currentChat = {
            name: chat.name
        }
         if(chatRoom.status)
        $scope.currentChat.type = 'Personal';
        else $scope.currentChat.type = 'Group';
     };

     function getChats(chats) {
        $scope.chats = chats;
     }

     function getRooms(rooms) {
        $scope.rooms = rooms;
     }

     function getUsers(users) {
        $scope.users = users;
     }

     function getStatus(status) {
        $scope.status = status;
     }

 }]);