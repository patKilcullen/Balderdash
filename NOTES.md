FIRST: Allow users to pick their own words and definitions.


Score is lost when refreshing. Taht is how useState works, so the score would either have to be set in localStorage, sessionStorrage, or database...
Databacse woudl include a game table and player table. a game would have many players and players would have many games. The Game and Player Table would habe a through table called Score table.

The main page would get all the games that are either open(not started) or the has a foreigh key of the player(userss) ID. OR each game can have arandom code generated and the creator of the game give it to friends to play. Creator can alos decide if game should be publi or not if they're looking for people to play with.

For each play to get turn, they can be a player array with eahc of their names or numbers, the 0 index gets to play and after their turn, their name.index gets mover to the end of the 


PROBLEMS: when first couple of games are created, the gmaes are listed more thatn once.... sometimes...



LAST UPDATE: Accept usr/score.... make sure its updating correctly... also, handleAccept should also reload state.... to that 

WHAT TO DO:
get all users games=> do this in api or thunk? (can now do it through user...)
GET all users of a game who have not been accepted(right now it's null in db, but could probably just be false and owner either turns to true or delets).  CAn either get all user on the front end with filter, or in a thunk, or in an API.... maybe api is the best?? 
ALL GAMES line 87.... getting only accepted games to render.



ORDER:   player to create games goes first.  Whoever wins, goes next(turn is set to true)
