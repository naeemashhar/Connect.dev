 - JWT (json web tokens) => use to identify if the request coming from user in AUTHENTICATE or NOT.
 & working : once we login to website, the server send a token (JWT), then whenever we try to access another resource like update/delete profile the server checks/validate the JWT token as an authentication....
 & to create JWT npm(jsonwebtoken_library) => example below
 -var token = jwt.sign({ foo: 'bar' }, privateKey(Connect@Dev$9923), { expiresIn:'//any'});

 - Above all working done by COOKIES.

 - Cookies => provided by expressJS ()
 & whenever we need to read the cookies => npm(cookie-parser_library)

 - to apply routing in app using (express.router).

 - for compound-index visit => https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/
 - for dynamic quaries $or etc . visit=>https://www.mongodb.com/docs/manual/reference/operator/query/

 - to use REF and Populate first-way => populate("fromUserId", ["firstName", "lastName"])
 second-way => populate("fromUserId", "firstName, lastName")

 -Set() data structure example => [A, B, C] if we trying to add A again it will not add. (Set contain only unique elements)

 - $nin => finding all people whos not present in that perticular array.
 - $ne => means don't want that own id in feed.

 - pagination => (adding limited amount of user in new/old Users FEED).

 eg : /feed?page=1&limit10 =>  1-10 => .skip(0) .limit(10)
      /feed?page=2&limit10 =>  11-20 => .skip(10) .limit(10)

      formulae for skip() => (page-1)*limit()

- .skip() => how many docs u want to skip
- .limit() => limit the docs      