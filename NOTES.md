
T
<!-- NEW -->

LAST UPDATE: 

added cards to all games and an search game component that searhed by string for game name and links to that game.  removed fetchSingleGame extra reducer beacause wasnt used??? and if it the searched/found game was added to stat in store it woulnt load when clicking on the link, the game was null


added roundsLeft: game.roundsLeft - 1 to handleChangeGameTurn in GuessDefs becasue changing the roundsLeft seperately was occasionally causing probelms where it was or wasn't both players trn or one player went twice in a row.  This was possibly because the game was being updated twice.  IT seems to workd but need to test to make sure error doesnt happen


 WHAT TO DO:
PLay whose turn it is can't guess defs.
ADD Tie GAME CARD






THING TO DO less important:

in showBackOf Card... don't need the second "X" of "test" arguemnt.. also should just be sideOfCard
CardFront "Back of Card" has display: "FLEW" instead of flex




<!-- OLD -->

he main page would get all the games that are either open(not started) or the has a foreigh key of the player(userss) ID. OR each game can have arandom code generated and the creator of the game give it to friends to play. Creator can alos decide if game should be publi or not if they're looking for people to play with.




PROBLEMS: 

When new user is first created, then they join a game, when the game starts they dont get it thruogh the socke
SOLVED THIS(hopefully) by putting useScore in join_room useEffect dependency array

when choose def and card flips over, right side of card is cut off

CHECK: when first couple of games are created, the gmaes are listed more thatn once.... sometimes...
DECLINE DOESNT ALWAYS REFRESH CORRECTLY
ACCEPT PLAYER TO game doesnt automatically clear it from page every time...maybe first time..
 




VERY IMPORTTANT
removed  
 return () => {
      // Leave the room
      clientSocket.emit("leave_room", { room: game.name });
      // Disconnect the socket
      // clientSocket.disconnect();
    };
from SingleGame join_room  because it was interefering with socket update of start game(other play was leaving). But then issue with card flipping when on wrong game page..  So... added "game" to dependency array of useEffect(w/receive_word, etc..) in GamePlay.  Now all seems to work.


IMPORTANT: 
when player turn changes and page refresh,  the other user doesnt get the word after the first refresh... it appears to only happend when the people choosing the word is NOT the owner of the game
search PLAYER_TURN_PROBLEM,  it worrks when it goes by score.turn, but not when it compares game.turn to score.turnNum
when playerNAme if score.turn... the def doesnt send if the user who turn it is is not the owner
POSSIBLY SOLVED IT by addind playerTurn to dependency array of useEffect for join_room socket in XGamePlay
NOWWWWWW add to scores function not working.  one gets multiple points... possibly beacuse of socket???? or logic doubled somewhere possible thunk or route

LAST UPDATE:




doubled the card, the once on the bottom is all in the CardFront Component
NEXT maye b get the definition to be big like the temp score card

PLAYER TURN NAME in timer only ever right for the player whos turn it is NOT
PLAYER TURN NAME in send_score_card_info is not updating properly between rounds!!!!

score card is sent to singles game for both playerTurn and other players, when turn ends, through reload showScoreCArd is set to true in SingleGAme
SCORECARD STILL NEEDS TO UNMOUNT AFTER TIMER UP


Sent score card info to server and back, but cant do anthing with it... should mimic receive_player_fake death and add it to state ingamePlaySlice or Scores slice, like how addDefinition workd in gamePlaySlice


use location.reload() to change turns for now.  probably not the best practive because has to reload everything and it loses state, but it workd for now.
SOLVED THiS BY...add in to state in slice, cant recall exactly how but look at GuessDef timer



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
