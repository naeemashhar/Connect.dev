 - All api's in (Connect.dev)

    authRouter
 - POST => /signup 
 - POST => /login 
 - POST => /logout
 

    profileRouter
 - GET => /profile/view
 - PATCH => /profile /edit 
 - PATCH => /profile /password (forgot password api)
 - DELETE => /profile

    connectionRequestRouter
 status : ignored, interested, acceptRequest, rejectRequest
 - POST => /request/send/:status/:userId (ignored, interested)
 - POST => /request/review/:status/:requestId  (accept, reject)

    userRouter
 - GET => /user/request/received 
 - GET => /user/connections 
 - GET => /user/feed (shows all other profile in app.)


 
