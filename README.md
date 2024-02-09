# Bia

Bia is a social media platform for cooking enthusiasts and food lovers. Users are able to share their recipes, become registered Chefs while also being albe to follow other users and like/ comment on their uploads.

Click here to view the site (inset link)

(am i responsive image)

## Strategy Plane

### Site Aims

Bia's goal is to create a platform for like-minded users that love food and want to share their thoughts and experiences. Users can showcase their work, offer their opinion and engage with others in an interactive community.

<hr>

### Agile Planning

This project was developed utilizing agile methodologies, delivering small features in incremental sprints over three weeks, with a total of three sprints evenly spaced out.

Each feature was categorized into epics and prioritized under labels such as "Must have," "Should have," and "Could have." The implementation followed a sequence where "Must have" features were completed first, followed by "Should haves," and finally, "Could haves." This approach ensured that core requirements were addressed initially, with additional features incorporated based on available capacity.

The Kanban board was established using GitHub Projects, providing a visual representation of the project's progress. It can be accessed here for further details on individual project cards. All stories, excluding documentation tasks, were accompanied by comprehensive acceptance criteria to define the functionality required for their completion.

(kanpan image)

<hr>

### Epics

#### Set Up

This Epic encompasses the initial setup of the React application and its dependencies to facilitate the commencement of feature coding.

#### Recipes

This Epic focuses on the frontend development of the application concerning recipes. It aims to enable users to interact with the backend API through the user interface for creating, reading, updating, and deleting their recipes.

#### Comments

This Epic concentrates on the frontend development of the application concerning comments on recipes. Its objective is to enable users to interact with the backend API to add comments on recipes.

#### Profiles

This Epic concentrates on the frontend development of the application concerning user profiles. Its aim is to enable users to interact with the backend API through the user interface to manage their profiles.

#### Chefs

This Epic centers on the frontend development of the application concerning chefs. It aims to enable users to interact with the backend API to register/unregister themselves as chefs and display their chef information.

#### Reviews

This Epic focuses on the frontend development of the application concerning chef reviews. Its goal is to enable users to interact with the backend API through the user interface to leave reviews on specific chef.

<hr>

## User Stories

**Recipes**

- As a logged in user I can create recipes so that I can share my images
- As a user I can keep scrolling through the images on the site, that are loaded for me automatically so that I don't have to click on "next page"
- As a recipe owner I can edit my recipe title and description so that I can make corrections or update my recipe after it was created
- As a logged in user I can view content filtered by users I follow so that I can keep up to date with what they are posting about
- As a logged in user I can view the recipes I liked so that I can find the recipes I enjoy the most
- As a user I can view all the most recent recipes, ordered by most recently created first so that I am up to date with the newest content
- As a logged in user I can like a recipe so that I can show my support for the recipes that interest me
- As a user, I can search for recipes with keywords, so that I can find the recipes and user profiles I am most interested in.
- As a user I can view the details of a single recipe so that I can learn more about it

**Comments**

- As a logged in user I can add comments to a recipe so that I can share my thoughts about the recipe
- As a user I can see how long ago a comment was made so that I know how old a comment is
- As a user I can read comments on recipes so that I can read what other users think about the recipes
- As an owner of a comment I can delete my comment so that I can control removal of my comment from the application
- As an owner of a comment I can edit my comment so that I can fix or update my existing comment

**Profiles**

- As a user I can view all the recipes by a specific user so that I can catch up on their latest recipes, or decide I want to follow them
- As a user I can view other users profiles so that I can see their recipes and learn more about them
- As a user I can create a new account so that I can access all the features for signed up users
- As a user I can view user's avatars so that I can easily identify users of the application
- As a user I can tell if I am logged in or not so that I can log in if I need to
- As a user I can see a list of the most followed profiles so that I can see which profiles are popular
- As a user I can view statistics about a specific user: bio, number of recipes, follows and users followed so that I can learn more about them
- As a logged in user I can follow and unfollow other users so that I can see and remove recipes by specific users in my recipes feed
- As a logged in user I can edit my profile so that I can change my profile picture and bio
- As a logged in user I can update my username and password so that I can change my display name and keep my profile secure

**Setup**

- As a user, I would like a favicon on the website so that I can easily know which tab belongs to Bia
- As a logged out user I can see sign in and sign up options so that I can sign in / sign up
- As a user, I would like a fully responsive navigation menu so that I can easily access the site from any device

**Chefs** 

- As an chef, I would like to be able to register my details so others can view my work and contact details
- As a user, I would like to be able to rate an chef so that owthers can see my rating and review

**Contact**

- As a user, I would like to be able to contact the site owner in case I have any issues or queries.

<hr>

## The Structure Plane

## Features:

**Setup**

User Story

`As a user, I would like a favicon on the website so that I can easily know which tab belongs to Bia`

Implementation

A site favicon, featuring the site's logo, has been incorporated. This enhancement enables users to readily recognize Bia when navigating multiple open tabs.

(favicon tab screenshot)

User Story

`As a logged out user I can see sign in and sign up options so that I can sign in / sign up`

Implementation

Implemented checks to detect user authentication status (signed in or signed out) and adjust navigation items accordingly. This functionality prevents users from accessing restricted pages by clicking buttons in the UI.

Additionally, URL redirects were implemented to restrict access to pages intended for logged-in users, ensuring unauthorized access is prevented when users are logged out.

User Story

`As a user, I would like a fully responsive navigation menu so that I can easily access the site from any device`

Implementation

A navigation menu was implemented than collapses into a hamburger menu on smaller devices. This will ensure that no navigation items overlap and users can access and navigate the site from any size device.

**Navigation Menu**

User Stories

`As a logged out user I can see sign in and sign up options so that I can sign in / sign up`
`As a user, I would like a fully responsive navigation menu so that I can easily access the site from any device`

Implementation

A fully responsive navigation menu has been integrated throughout the website, enabling users to navigate effortlessly to various pages regardless of the device they are using. Navigation items dynamically adjust based on the user's logged-in status to restrict access to areas of the application intended exclusively for signed-in users.

Logged in users:

When a user is logged in the following navigation items are shown:

- Add Recipe
- Home
- Chefs
- Feed
- Liked
- Contact Us
- Sign Out
- Users Profile picture and Username

(navbar screenshot)

Logged out users:

- Home
- Contact Us
- Sign In
- Sign Up

(navbar screenshot)

The navigation icons transition to a green hue when the respective page is active. This feature serves to visually indicate to users their current location within the website.

**Home** 

User Story

``