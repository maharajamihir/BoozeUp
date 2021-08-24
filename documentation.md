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
1. Setup Database
2. Make connection from backend to database
3. Let *seller* put simple ad with type of booze, price and location(city name)
4. Display all ads on one screen
5. Implement browse functionality based on location, wanted booze
## Testing