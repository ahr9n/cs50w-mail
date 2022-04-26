<div align="center">
 <img style="width: 25%;" src="https://github.com/ahr9n/cs50w-mail/blob/master/mail/static/mail/assests/logo.png" alt="Reach everyone!">
</div>

# Mail
Project 3 for CS50’s Web Programming with Python and JavaScript.

## Overview
A front-end design for an email client that makes API calls to send and receive emails.

## Specification

This project fulfills the following requirements:

* **Send Mail:** When a user submits the email composition form, it actually sends the email. 
  * Making a `POST` request to `/emails`, passing in values for recipients, subject, and body.
  * Once the email has been sent, the user’s sent mailbox is loaded.
* **Mailbox:** When a user visits their Inbox, Sent mailbox, or Archive, the appropriate mailbox is loaded.
  * Making a `GET` request to `/emails/<mailbox>` to request the emails for a particular mailbox.
  * When a mailbox is visited, the application will first query the API for the latest emails in that mailbox.
  * When a mailbox is visited, the name of the mailbox will appear at the top of the page.
  * Each email should then be rendered in its own box (e.g. as a `<div>` with a border) that displays who the email is from, what the subject line is, and the timestamp of the email.
* **View Email:** When a user clicks on an email, the user is taken to a view where they see the content of that email.
  * Making a `GET` request to `/emails/<email_id>` to request the email.
  * The application shows the email’s sender, recipients, subject, timestamp, and body.
  * Adding an additional `div` to inbox.html (in addition to emails-view and compose-view) for displaying the email (here, as `email-details`). Updating code to hide and show the right views when navigation options are clicked. 
  * Once the email has been clicked on, the email is marked as read. Sending a `PUT` request to `/emails/<email_id>` to update whether an email is read or not.
* **Archive and Unarchive:** Allow users to archive and unarchive emails that they have received.
  * When viewing an Inbox email, the user is presented with a button that lets them archive the email. When viewing an Archive email, the user is presented with a button that lets them unarchive the email. This requirement does not apply to emails in the Sent mailbox.
  * Sending a `PUT` request to `/emails/<email_id>` to mark an email as archived or unarchived.
  * Once an email has been archived or unarchived, the user’s inbox is loaded.
* **Reply:** Allow users to reply to an email.
  * When viewing an email, the user is presented with a “Reply” button that lets them reply to the email.
  * When the user clicks the “Reply” button, they are taken to the email composition form.
  * Pre-filling the composition form with the `recipient` field set to whoever sent the original email.
  * Pre-filling the `subject` line. If the original email had a subject line of `foo`, the new subject line will be `Re: foo`. (If the subject line already begins with `Re: `, no need to add it again.)
  * Pre-filling the `body` of the email with a line like `On Jan 1 2020, 12:00 AM foo@example.com wrote:` followed by the original text of the email.

## Setup
Requires Python3 and the package installer for Python (pip) to run:

* Install requirements (Django4): `pip install -r requirements.txt`
* After cloning the repository, head/refer to the project folder and:
  1. Create new migrations based on the changes in models: `python3 manage.py makemigrations mail`
  2. Apply the migrations to the database: `python3 manage.py migrate`
  3. Create a superuser to be able to use Django Admin Interface: `python3 manage.py createsuperuser`
  4. Run the app locally: `python3 manage.py runserver`
  5. Visit the site: `http://localhost:8000`
  6. Enjoy!

## Topics
Built with [`Python`](https://www.python.org/downloads/), [`Django`](https://www.djangoproject.com/), [`JavaScript`](https://www.javascript.com/), and HTML/CSS..
