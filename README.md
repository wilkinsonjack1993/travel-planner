# Jack Wilkinson - Travel Timetable for Grape

## Getting Started

Requirements (other versions may be usable but were not tested):
Node version: 16
npm version: 8

Checkout the repository then install:

```
npm ci
```

To run locally:

```
npm run dev
```

## Technologies/Framework/Library Choices

In this project, I have used Next JS to SSR the page. (To be honest, in this example it seems like overkill - we don't use Next JS for anything else (e.g navigation) and we don't prefetch any data.)

I have used [MUI](https://mui.com/) as a design system. Other than the main reason of getting the project off the ground quickly, there are a couple of other reasons for this:

- I really like the structure they use with their theming and philosophy. This makes overriding styles and global styles very simple. (See theme file for the overrides to the defaults that I used)
- They have addressed a lot of accessibility requirements out of the box which is useful for users who require screen readers.
- The documentation is really good.
- They have some really useful prebuilt components like autocomplete.
- They have a lot of inbuilt user feedback, such as hover states on buttons, ripples on button clicks and opening and closing transitions of accordian components.

I have used [date-fns](https://date-fns.org/) for doing some date formatting.

## Project description and design decisions

I decided to design this project a single page where the search process has 2 steps 'Search' and 'Results'. I like the stepper as it shows progress to the user as they step through the form. We could then extend this project to have a third step such as buying a ticket. The step process also prevents too much information from being shown to the user at once. It also has the additional benefit of being easier to test in isolation.

The app should be mobile responsive, but this could be greatly improved.

### The Search Form

This page has a simple form containing:

- Origin station and Destionation station - autocomplete components that searches for matching addresses as you type. You must type 3 characters before it will start refining your search. These fields are required..

- A date field and a radio button with 3 options for the date search - 'now', 'arrive by' and 'depart at' - if you specify now, no date is required as this is done in the background. If you select either of the other two options you must provide a date that is not in the past.

- The submit button - this should be disabled when we do not have a value for both stations and when no date is provided AND the radio button is not 'now'

### Known issues

The error messaging is not great and there are a couple of very edgy edge cases where you can click the search button without filling the fields with valid inputs.
To improve this, it would probably be best to use something like react hook forms or Formik to validate inputs better. I didn't do this as it felt a bit over the top for this use case but its an option for the future.

It would be nice to have other search filters to make it more thorough.

### The Results Page

The result page is just a very rudimentary way of displaying the information of the next trains to the user. It uses and accordian that allow the user to expand the summary to show a detailed breakdown of the sections of the journey.
There is also a reset button to allow the user to go back to the start of the process.

### Known issues

While I have made it mobile responsive, the mobile view looks cramped and could definitley be reworked to be clearer.

We could definitely display more information to the user, such as the mode of transport for each section.

It would be nice to have a 'show earlier trains' and a 'show later trains' option to scroll through further options.

The lack of a back button to go back to step 1 is annoying and should be added.

We don't currently show the date of travel, only the times. So if a user searched for a train at 11pm today, the results may show times tomorrow morning which would be confusing to the user without showing them the date.

## Other bits if I had more time

- Adding more features such as more search filter and more results details
- Tests (using react testing library)
- Integration tests (Using Cypress)
- Give some more thought to the design - currently it is pretty basic and could do with a lot of improvement
- Test it on older browsers if that is a requirement
- Better error handling
- Internationalisation
- Analytics

## Resources

This repo to get started with Next and MUI
https://github.com/mui/material-ui/tree/9d6e08ba6883211828cdfcc44703ad7e2b131514
