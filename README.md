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
