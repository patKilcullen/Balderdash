
The main page would get all the games that are either open(not started) or the has a foreigh key of the player(userss) ID. OR each game can have arandom code generated and the creator of the game give it to friends to play. Creator can alos decide if game should be publi or not if they're looking for people to play with.




PROBLEMS: 

CHECK: when first couple of games are created, the gmaes are listed more thatn once.... sometimes...
DECLINE DOESNT ALWAYS REFRESH CORRECTLY
ACCEPT PLAYER TO game doesnt automatically clear it from page every time...maybe first time..
 


TIMER: when game is player,  neeed to set timer back to false



LAST UPDATE: 
if not working, check CreateRound... changed lovalhost link to process.env variable

users pick def and get point if guess right and give other player point if they guess their def
time is put on the Guess def component to give limited time to guess

// HERE   NEEd to update the game turn, if its 1, it needs to be set to numPlayers, otherwise it needs to subtrack by 1
      // will need to change or scores turn as well, but that may take a lot becuse you have to firt
      // get the sore with turn and set to ti false and then get soce with same turnnum as game turn
      // instead of ever using the score turn, can just compare their turn num to the game turn

added mongodb, can get rounds and post rounds
fake definition is sent to all other users. when user chooses a word, if it it the 'real' word, it sets correct to true,.. this shoudl add a point to the score in the databse.  
also should check if the word is not fake... if it is not, should add a point to the score in the datavbase that shares the userID as the key of the answer


MONGODD LINKS:
https://cloud.mongodb.com/v2/646c3fcb2cc21d7f9a5af495#/metrics/replicaSet/646c40d57d4ee04da523a6f6/explorer/sample_airbnb/listingsAndReviews/find

https://www.youtube.com/watch?v=mrHNSanmqQ4
 https://github.com/beaucarnes/restaurant-reviews/blob/master/backend/dao/reviewsDAO.js




Added playerTurnName === username in XGamePlay to useEffect to join room... make sure it doesn mis up room.....

when user enters other game page they need to refresh to get updated words WOULD putting work in the database solve this problem????  


TEST: for more than two players, all receive all player inputed defs
Maker sure decline player works..




REFRESH => when logged in users fresh and more that one are logged in on chrom or incognito, they sometimes because signed in as other user because they TOKEN in authentication is the same.  search "REFRESH" to find where can try to fix, should be in approutes and authSlice.  can set local storage to players name, as in the "REFRESH" comments, but when fresh they get logged out.  
Probabbly only a big deal because signing in to multi[le accounts at same time on same device, wont really be a bug otherwise, hopefully...]
