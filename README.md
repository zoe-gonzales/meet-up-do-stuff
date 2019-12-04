# MeetUp Clone

## Overview

This project is a basic clone of the site [Meetup.com](https://www.meetup.com/), where users can create a profile, join groups, and rsvp to attend events. It is in progress.

I chose this project because I wanted to create a full stack app using [Go](https://golang.org/) on the back end and [React](https://reactjs.org/) on the front end.

Other tools/packages used so far include: <br>
[PostgreSQL](https://www.postgresql.org/) <br>
[GORM](https://gorm.io/) <br>
[Authboss](https://github.com/volatiletech/authboss) <br>
[Redux](https://redux.js.org/) <br>
[SASS](https://sass-lang.com/) <br>

An outline of user stories and wireframes can be found [here](https://github.com/zoe-gonzales/meet-up-do-stuff/tree/master/process).

The project KanBan can be found [here](https://github.com/zoe-gonzales/meet-up-do-stuff/projects/1).

### Installing & running

This app is currently not deployed. To run it locally, Go, Node, and PostgreSQL are required.

To run locally, clone this repo. Open two separate terminals. In the first, run ` go build ` in the root directory and then ` ./meet-up-do-stuff ` to run the API server.

In the second terminal, ` cd ` into client and run ` npm install `, then ` npm start `. From there, you will find the app running at localhost:3000.
