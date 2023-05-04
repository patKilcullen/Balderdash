FIRST: Allow users to pick their own words and definitions.


Score is lost when refreshing. Taht is how useState works, so the score would either have to be set in localStorage, sessionStorrage, or database...
Databacse woudl include a game table and player table. a game would have many players and players would have many games. The Game and Player Table would habe a through table called Score table.

The main page would get all the games that are either open(not started) or the has a foreigh key of the player(userss) ID. OR each game can have arandom code generated and the creator of the game give it to friends to play. Creator can alos decide if game should be publi or not if they're looking for people to play with.

For each play to get turn, they can be a player array with eahc of their names or numbers, the 0 index gets to play and after their turn, their name.index gets mover to the end of the 


PROBLEMS: when first couple of games are created, the gmaes are listed more thatn once.... sometimes...
DECLINE DOESNT ALWAYS REFRESH CORRECTLY

ACCEPT PLAYER TO game doesnt automatically clear it from page every time...maybe first time..
 
 OPEN 2 INCOGNITO, both incognito END UP WITH SAME NAME>>>>>


LAST UPDATE: 
owner can start new game... all players can see gameplay... only player who turnNum === game turn can get word




WHAT TO DO:

Maker sure decline player works..
Create input for definition that non turn players can add to def array
Input needs to show up only when player with turn accepts word....


May not need turn true.false on score because jsut see if the turnNum on Score matches turn on Game


ORDER:   player to create games goes first.  Whoever wins, goes next(turn is set to true)

REFRESH => when logged in users fresh and more that one are logged in on chrom or incognito, they sometimes because signed in as other user because they TOKEN in authentication is the same.  search "REFRESH" to find where can try to fix, should be in approutes and authSlice.  can set local storage to players name, as in the "REFRESH" comments, but when fresh they get logged out.  
Probabbly only a big deal because signing in to multi[le accounts at same time on same device, wont really be a bug otherwise, hopefully...]
