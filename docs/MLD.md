GAME: Game_id, Label, Slug, Picture, Logo, Description, Favorite, Paralympic, Tag
HAPPEN, 0N GAME, 11 EVENT
EVENT: Event_id, Day, Slot,#Game_id, #Site_id
BASE, 11 EVENT, 0N SITE
SITE: Site_id, Name, Slug, City, Picture, Description, Latitude, Longitude

:

WATCH, 0N EVENT, 0N USER

:

USER: User_id, Nickname, First name, Last name, Mail, Password

Table d’association pour relation 0N 0N:

**WATCH** ( #Event_id, #User_id )