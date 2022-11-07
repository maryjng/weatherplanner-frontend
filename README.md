# weatherplanner-frontend

https://github.com/maryjng/weatherplanner-backend

#Project Requirements
The basic goal of the app is to incorporate weather forecasts into a calendar so that users can have more information to make their appointments with. The app will need to have/do the following:
- Basic user register and login functions. 
- Calendar functions. Adding, editing, and deleting appointments and having this reflect on an interactable calendar. React Big Calendar will be used.
  - This will require a backend (Express) server with CRUD routes and models for Postgres database interaction.
- There needs to be a function that allows users to get forecasts (forecast data is requested from a third party weather API) and view them as the user is filling out the create appointment form.
- Forecasts will need to be saved into the database.
- An appointment's forecast(s) will be called from the database and shown along with the appointment's details.

#Stretch Goals
- A notification system for when an appointment's forecast changes.
- Support/better design for hourly forecast and single day appointments. App currently caters to multiple day appointments, with forecasts going by days only.
- A general super stretch would be to enable multiple users to coordinate and join events. This could include a messaging and invite system, plus permissions on who can join or edit events.


#Component Hierarchy and General Explanation

![component-hierarchy-weatherplanner](https://user-images.githubusercontent.com/68235230/200211314-1d6e07d8-a642-46b7-89ff-7bf677255670.png)

The main component that handles appointment and forecast CRUD functionality is the <HomeCalendar /> component. It contains the React Big Calendar app, <Calendar />, and two different components that will display depending on what the user clicks on. One is <ViewEditAppt />, which has the form to edit appointments. The other is <NewApptCalendar />, which has the <ZipcodeForm /> that allows users to lookup forecasts based on zipcode. Both <ViewEditAppt /> and <NewApptCalendar /> contain the <ForecastCalendar /> component, which is used to display forecast data. <ForecastCalendar /> is made up of <ForecastDay /> components which each represent a day of forecast.
