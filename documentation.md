# BoozeUp
Despite of the questionable Software Engineering course we took this semester, we will document the different steps in this engineering process.

## General Idea of App
1. Ebay-Kleinanzeigen but only for Booze
2. Per demand instead of supply

## Use Cases/ Functional Requirements

0. Sign up or Log in to profile (login screen)
1. Buyers have to enter:
    - location
    - radius
    - can search for booze (per supply) or ping people in radius for booze (per demand)

4. Sellers can put Ads with:
    - Type of Booze
    - Price
    - Location (optionally get it from Device location)
    -> optionally show address on ad, or on request
    - optionally add photo
    - Time range where booze available
    - activate/deactivate ad

## Implementation

### Sprint 1:
#### Backlog
1. Setup Database
2. Make connection from backend to database
3. Let *seller* put simple ad with type of booze, price and location(city name)
-> Make dropdown for boozecategories (database as well as backend) -> should be like enum instead of random string
-> reference booze_info table with a foreign key relationship
-> Make incremental primary key for all tables instead of starting count everytime server starts (Possibly UUID)
4. Display all ads on one screen
5. Implement browse functionality based on location, wanted booze (basic, without lat long)
6. Make Login Page in App (only UI) -> Email (as username), password, phone number, 18+ check
7. Deploy on Heroku
#### Recap
- Minimal verion of API working on localhost
- React Native project Navigation initialized
- Database setup (enter database with command "heroku psql:pg"
### Sprint 2:
1. Send Registration/Login Information to Backend and Store Users in Database
2. 18+ check in registration
3. Implement location based search via latitude and logitude instead of city name (optionally convert city to lat-long)
- APP: Map integration and getting location (lat-long) from user + integration to backend service
- BE: Search based on latlong in database, optionally conversion from city to lat-long
4. Pagination of said search results (configurable)
### Sprint 3:
1. APP: Implement Upload Ad screen 
- BE: Implement location service similarly to browse screen
- Implement Audit Log
- Implement log in DB
## Testing
