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
users join games socket room on refresh is players
when user gets word its sent to other player socket and can render, but getting TypeError, cannot read props of undefined (reading 'gamePlay) which probably comes from gamePlay slice.  The word still renders though and is in gamePlay state.    
SUBmitting players own def gets sent to server but not being received by other players



WHAT TO DO:
HERE:  need to share the same socket between components....

PROBLEM HERE is that refreshing the page loses the socket

<!-- ChatGP -->

In Socket.IO, when a user joins a room, it is specific to the connection instance associated with that user. If a user joins a room in one React component and then sends a message to that room, only the users who are currently connected to the socket and have explicitly joined that room will receive the message.

If a user joins a room in one React component but doesn't receive messages in another React component until they explicitly join the room in that component, it suggests that the socket connection or the room joining process is not shared between the components.

Here are a few possible reasons for this behavior:

Separate socket instances: If you are creating a new instance of the socket in each React component, they will have separate connections and won't share the same rooms. Make sure you are using the same socket instance or sharing the connection object between the components.

Delay in joining the room: If the second React component attempts to send a message to the room immediately after rendering, and the user from the first component hasn't joined the room yet, the message won't be received. Ensure that the user joins the room before any relevant messages are sent.

Timing issues: If there is an asynchronous operation involved in joining the room, such as fetching data or establishing a connection, make sure it completes successfully before attempting to send or receive messages in the other component.

To resolve this issue, you can consider the following approaches:

Lift the socket connection state up: Lift the socket connection state up to a higher-level component that wraps both components. This way, both components can access and share the same socket connection and rooms.

Use a state management library: Utilize a state management library like Redux or React Context to manage the socket connection and room joining process. This allows for centralized control and ensures that the connection and room status are consistent across components.

Pass the socket connection as props: Pass the socket connection and room information as props from the parent component to both child components. This ensures that they use the same socket connection instance and room information.

By ensuring that both components share the same socket connection instance and the user has joined the room appropriately, the messages sent to the room should be received by all connected users, regardless of which component they are in.







ANSWER TO SOCKET>TO.... it when it calls socket.join, its only joining its own socket, not the other players... possiblly there is a way to join for another player, otherwise the other player is the one who need to join  
THAT may not work.... Try hard coding the room name to see if that changes anything
ORR maybe its because the room name is a number> 


HERE: can't get socket to send 'word' to other users... it hits the serve and console logs, but it doesnt pick it up client side... this is back and forth on the GamePlay component and client/index
 
word is set in state only on the of the player whose turn it is...
so... send the word through socket then set it in state...
possibly with different thunk.. one thunk(existing thunk) sets it in for the player whose turn it is, the other thunk sets it for player whose turn it is not

Maker sure decline player works..
Create input for definition that non turn players can add to def array
Input needs to show up only when player with turn accepts word....


May not need turn true.false on score because jsut see if the turnNum on Score matches turn on Game





ORDER:   player to create games goes first.  Whoever wins, goes next(turn is set to true)

REFRESH => when logged in users fresh and more that one are logged in on chrom or incognito, they sometimes because signed in as other user because they TOKEN in authentication is the same.  search "REFRESH" to find where can try to fix, should be in approutes and authSlice.  can set local storage to players name, as in the "REFRESH" comments, but when fresh they get logged out.  
Probabbly only a big deal because signing in to multi[le accounts at same time on same device, wont really be a bug otherwise, hopefully...]
