# API LiST

## AUTH ROUTER

    - POST/signin
    - POST/login
    - POST/logout

## PROFILE ROUTER

    - GET/profile/view
    - PATCH/profile/edit
    - PATCH/profile/password - forgot password api

## CONNECTIONS REQUEST ROUTER

    - POST/request/send/interested/:userId
    - POST/request/send/ignored/:usedId
    - POST/request/review/:reqId
    - POST/request/rejected/:reqId

## USER ROUTER

     - GET/user/connections
     - GET/user/request/recived
     - GET/user/feed
