# BoozeUp
Despite of the questionable Software Engineering course we took this semester, we will document the different steps in this engineering process.

## General Idea of App
1. Ebay-Kleinanzeigen but only for Booze
2. Per demand instead of supply

## Use Cases/ Functional Requirements

0. Sign up or Log in to profile (login screen)
1. Buyers have to enter:
    - location (from device)
    - radius
    - can search for booze in radius for booze 
    - optionally filter for booze-types

4. Sellers can put Ads with:
    - Type of Booze
    - Price
    - Location (get it from Device location)
    -> optionally show address on ad, or on request
    - optionally add photo
    - Time range where booze available
    - activate/deactivate ad

## Implementation

### Sprint 1:
#### Backlog
- [X] Setup Database
- [X] Make connection from backend to database
- [X] Let *seller* put simple ad with type of booze, price and location(city name)
-> Make dropdown for boozecategories (database as well as backend) -> should be like enum instead of random string
-> reference booze_info table with a foreign key relationship
-> Make incremental primary key for all tables instead of starting count everytime server starts (Possibly UUID)
- [X] Display all ads on one screen
- [X] Implement browse functionality based on location, wanted booze (basic, without lat long)
- [X] Deploy on Heroku
#### Recap
- All backlog items implemented successfully.
- Minimal verion of API working on localhost
- React Native project Navigation initialized
- Database setup (enter database with command "heroku pg:psql"
- made two tables in database (user and boozeoffers)

### Sprint 2:
- [X] Make basic Login Screen and let User log in with sending data to backend and checking data in database
- [X] Make basic Registration screen with sending data to backend and checking data in database
- [X] Make token and send it to FE after Log in/ Registration
- [X] Implement Location based search via zipcode and fetch all booze offers in that area from backend
- [ ] Let user add a booze-offer and display his offers after successfully adding offer to database
- [ ] Make simple Profile screen where all of user data is displayed (username, email, phonenumber, token) by sending token to BE and getting getting data
### Sprint 3:
- [ ] 18+ check in registration
- [ ] Implement location based search via latitude and logitude instead of city name (optionally convert city to lat-long)
- APP: Map integration and getting location (lat-long) from user + integration to backend service
- BE: Search based on latlong in database, optionally conversion from city to lat-long
- [ ] Toggle between Map view and List view
- [ ] In List view, enable clicking on the Booze and getting redirected to a screen with more info about that offer.
- [ ] Upload Offer Screen:
    - [ ] Add parameters *name* and *description* to booze-offers (also in Database and BE)
    - [ ] make *booze_type* an enum by implementing dropdown or so. 
    - [ ] Get userlocation instead of manually entering location
### Sprint 4:
- [ ] Design a clean UI or simplistic design and make screens a bit more usable
- [ ] Test for possible inputs and either prevent illegal inputs or handle wrong inputs nicely
- [ ] ...
## Testing
