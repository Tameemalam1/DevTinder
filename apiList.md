<!-- DevTinder API's -->

## authRouter

- Post - /signup
- Post - /login
- Post - /logout

## profileRouter

- Get - /profile/view
- Patch - /profile/edit
- Patch - /profile/password

## connectionRequestRouter

- Post - /request/send/interested/:userId
- Post - /request/send/ignored/:userId
- Post - /request/review/accepted/:requestId
- Post - /request/review/rejected/:requestId

## userRouter

- Get - /user/connections
- Get - /user/requests/received
- Get - /user/feed - gets the profiles of others

Statuses - ignored, interested, accepted, rejected
