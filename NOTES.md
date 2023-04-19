FIRST: Allow users to pick their own words and definitions.


Score is lost when refreshing. Taht is how useState works, so the score would either have to be set in localStorage, sessionStorrage, or database...
Databacse woudl include a game table and player table. a game would have many players and players would have many games. The Game and Player Table would habe a through table called Score table.

The main page would get all the games that are either open(not started) or the has a foreigh key of the player(userss) ID. OR each game can have arandom code generated and the creator of the game give it to friends to play. Creator can alos decide if game should be publi or not if they're looking for people to play with.

For each play to get turn, they can be a player array with eahc of their names or numbers, the 0 index gets to play and after their turn, their name.index gets mover to the end of the 


PROBLEMS: when first couple of games are created, the gmaes are listed more thatn once.... sometimes...



LAST UPDATE: Changed associations which required changing games api and probbaly other apis

WHAT TO DO:
get all users games=> do this in api or thunk? 
!!!!!ASSOCAITION STILL MAY BE WRONG!!! can;t find all users through game like before(with old association commentee out)so..
need to set it up so game have multip users and one owner
maye be accessible through scores???
HOWEVER>>>>> logging the user gets games!!!!!!!!!!!!!!!!! 


get public games
