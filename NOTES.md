FIRST: Allow users to pick their own words and definitions.


Score is lost when refreshing. Taht is how useState works, so the score would either have to be set in localStorage, sessionStorrage, or database...
Databacse woudl include a game table and player table. a game would have many players and players would have many games. The Game and Player Table would habe a through table called Score table.

The main page would get all the games that are either open(not started) or the has a foreigh key of the player(userss) ID. OR each game can have arandom code generated and the creator of the game give it to friends to play. Creator can alos decide if game should be publi or not if they're looking for people to play with.

For each play to get turn, they can be a player array with eahc of their names or numbers, the 0 index gets to play and after their turn, their name.index gets mover to the end of the 


PROBLEMS: when first couple of games are created, the gmaes are listed more thatn once.... sometimes...



LAST UPDATE: decline request deletes score from database and reloads.  It works, but what should be done with the return? Should score have its own ID? should stae have all scores associated with game, and when deteler, it filters ou
DECLINE DOESNT ALWAYS REFRESH CORRECTLY
 
 OPEN 2 INCOGNITO, both incognito END UP WITH SAME NAME>>>>>


WHAT TO DO:
WHEN PLAYER REQUESTS TO JOIN...  use socket to notify game owner
Get a users score for game by SINGLESCORESLICE and displya that on page when not owner(or probably when owner too)
and when not owner use it to determine if non-owner can ask to play..
Probably dont have to make new slice, just het single score... thought that might change all score slice(might have to split up initial state)OR just fitler for users scofre in component an display it that way.. wouuld that change rendering????



ORDER:   player to create games goes first.  Whoever wins, goes next(turn is set to true)

REFRESH => when logged in users fresh and more that one are logged in on chrom or incognito, they sometimes because signed in as other user because they TOKEN in authentication is the same.  search "REFRESH" to find where can try to fix, should be in approutes and authSlice.  can set local storage to players name, as in the "REFRESH" comments, but when fresh they get logged out.  
Probabbly only a big deal because signing in to multi[le accounts at same time on same device, wont really be a bug otherwise, hopefully...]
