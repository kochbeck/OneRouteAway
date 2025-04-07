# One Route Away: San Francisco

## Overview

One Route Away is a predominantly mobile device targeted Next.js application that helps its users find merchants along nearby bus, subway, and train routes. This enables them to find enjoyable or useful things to do which are conveniently located to them based on their current location.

The application will provide information for the San Francisco Bay Area.

## Technical Features

- Next.js-based application with a shadcn ui based interface
- Responsive web application primarily targeted at mobile phone users
- Provides login services via Clerk in order to support common OAUTH providers
- Uses the Google Maps API to find destinations and plan routes
- Uses 511.org API to find nearest stops and next arrivals of vehicles
- Has a server-side background process that caches destinations along various routes in order to limit the frequency and quantity of data being downloaded from Google and other APIs
- Saves cached data in a server-side Firebase database
- API keys are stored in a server-side .env.local file
- All npm packages used shall be their latest long-term support versions

## UI Specification

At startup, if the application does not have permission to access location services, permission is requested of the user. If the user declines location services, the application presents a non-dismissable modal dialog that says, "This application requires location services to operate properly." Below the message is a button to trigger the request of location services again. The dialog dismisses automatically when location services permission is granted to the application.

### View: Main View

The Main View offers the following controls:

#### Control: Login / Register

A button which takes the user to the Login View.

#### Control: Walking Distance

A dropdown menu allowing the user to select:

- Less than 2 minute walk
- Less than 5 minute walk
- Less than 10 minute walk

This control determines how far from a transit stop the user is willing to walk to a destination.

#### Control: Operating Hours

A dropdown menu allowing the user to select:

- Open now
- Open for the next 2 hours
- Open for the next 4 hours

#### Control: Destination Type

A dropdown menu allowing the user to select:

- Food & drink
- Apparell, shoes, accessories, and bags
- Grocery
- Beer, wine, and spirits
- Housewares and hardware
- Florists and gifts
- Theaters, cinema, and event venues
- Dry cleaning and laundry
- Tourist attractions and scenic attractions

#### Control: Route Selection Card Stack

The Route Selection Card Stack is a stack of cards. On each card are the following public transit information for transit routes (from the 511.org APIs) with stops within a 10 minute walk from the user's current location (from the Google Maps API):

- The route number
- The route name
- The route direction
- The location of the nearest stop
- The ETA for the next vehicle at the nearest stop (which updates every 60 seconds)
- A count of the number of destinations on this route that meet the criteria setup by Walking Distance, Operating Hours, and Destination Type

When the user touches or clicks on a card, it opens the Route Detail View.

### View: Route Detail View

The Route Detail View slides over the Main View when a specific Route Selection Card is chosen by the user. The following are the controls in this view:

#### Control: Close Route Detail View

The Close Route Detail View is a button. When pressed, the Route Detail View slides closed revealing the Main View it was covering.

#### Control: Route Detail Card

This card shows the following information:

- The route number
- The route name
- The route direction
- The location of the nearest stop
- The ETA for the next three vehicles at the nearest stop (which updates every 60 seconds)

If the user taps or clicks the card, the application opens Google Maps to walking directions to the nearest stop on this route.

#### Control: Destination Card Stack

The Destination Card Stack is a stack of cards. The cards are sorted first by whether the destination is a Favorite and then by the distance away from the nearest route stop from closest to farthest. The destinations are filtered to obey the Walking Distance, Operating Hours, and Destination Type settings on the Main View. On each Destination Card is the following information (from the Google Maps API):

- The name of the destination
- The hours of operation for the destination
- The rating from Google's reviews
- How many stops beyond the nearest route stop the destination's stop is
- How many minutes walk from the destination's stop the destination is

Tapping or clicking on a Destination Card slides open the Destination Detail View.

### View: Destination Detail View

The Destination Detail View slides over the Route Detail View when a Destination Card is selected. The Destination Detail View has the following controls:

#### Control: Close Destination Detail View

The Close Destination Detail View is a button that, when pressed, slides the Destination Detail View closed and reveals the Route Detail View below it.

#### Control: Set/Unset Favorite Destination

The Set/Unset Favorite Destination control is a gold star that can be toggled. The default state is off. If the user toggles it on, the destination is saved to the user's account as a favorite, and the star will appear gold when that destination is next accessed.

#### Control: Directions

The Directions control is a button. When pressed, the user is sent to Google Maps, and the map is preloaded to give directions to the destination via public transit.

#### Control: Destination Details

The Destination Details card shows all the information about the destination as provided by the detail query of the Google Places API.

### View: Login View

This view presents the Clerk login widget allowing the user to login by creating an account or add themselves as a user via OAUTH.
