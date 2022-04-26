document.addEventListener('DOMContentLoaded', function () {

    // Use buttons to toggle between views
    document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
    document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
    document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
    document.querySelector('#compose').addEventListener('click', compose_email);
    // Send an email
    document.querySelector('#send-email').addEventListener('click', send_email);

    // By default, load the inbox
    load_mailbox('inbox');
});

function compose_email() {

    // Show compose view and hide other views
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'block';
    document.querySelector('#email-details').style.display = 'none';

    // Clear out composition fields
    document.querySelector('#compose-recipients').value = '';
    document.querySelector('#compose-subject').value = '';
    document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {

    // Show the mailbox and hide other views
    document.querySelector('#emails-view').style.display = 'block';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#email-details').style.display = 'none';

    // Show the mailbox name
    document.querySelector('#heading').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

    // Clear out emails
    document.querySelector('#emails-preview').innerHTML = '';

    console.log(`Requesting emails from ${mailbox}...`);

    fetch(`/emails/${mailbox}`)
        .then(response => response.json())
        .then(emails => {
            // Add emails to the mailbox
            emails.forEach(email => {
                const item = document.createElement('tr');
                item.innerHTML = `
                    <td class="sender">${email.sender}</td>
                    <td class="recipients">${email.recipients}</td>
                    <td class="subject">${email.subject}</td>
                    <td class="timestamp">${email.timestamp}</td>
                `;

                if (email.read) {
                    item.style.backgroundColor = '#D3D3D3';
                }else{
                    item.style.backgroundColor = '#FFFFFF';
                }
                item.querySelectorAll('td').forEach(td_tag => {
                    td_tag.addEventListener('click', () => {
                        email_details(email.id);
                    });
                });

                // Appending the email to the mailbox
                document.querySelector('#emails-preview').appendChild(item);
            })
        });
}

function email_details(id) {

    // Show the email details and hide other views
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#email-details').style.display = 'block';

    // Needed elements
    const info = document.createElement('p');
    const reply = document.createElement('button');
    const archive = document.createElement('button');

    const body = document.createElement('a');
    info.className = 'email-info';

    // Clear out the email details
    document.querySelector('#email-details').innerHTML = '';

    // Show the email details
    fetch(`/emails/${id}`)
        .then(response => response.json())
        .then(email => {
            // Buttons
            reply.innerHTML = 'Reply';
            archive.innerHTML = email.archived ? 'Unarchive' : 'Archive';
            reply.className = 'btn btn-sm btn-outline-primary';
            archive.className = 'btn btn-sm btn-outline-primary';
            archive.style.marginLeft = '5px';

            reply.addEventListener('click', () => {
                reply_email(email.id);
            });
            archive.addEventListener('click', () => {
                archive_email(email.id, email.archived);
            });

            // Email info
            info.innerHTML = `
                <p><b>From:</b> ${email.sender}<br>
                <b>To:</b> ${email.recipients}<br>
                <b>Subject:</b> ${email.subject}<br>
                <b>Timestamp:</b> ${email.timestamp}</p>
            `;
            body.innerHTML = `
                <hr>
                ${email.body}
            `;

            // Appending buttons and info to the email details
            document.querySelector('#email-details').appendChild(info);
            document.querySelector('#email-details').appendChild(reply);
            document.querySelector('#email-details').appendChild(archive);
            document.querySelector('#email-details').appendChild(body);
        });

    // Mark the email as read
    fetch(`/emails/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
        read: true
    })
    });
}

function reply_email(id){
    compose_email();

    // Get the email details
    fetch(`/emails/${id}`)
        .then(response => response.json())
        .then(email => {
            // Set the recipient
            document.querySelector('#compose-recipients').value = email.recipients;
            // Set the subject
            if (email.subject.startsWith('RE: ') === false)
                document.querySelector('#compose-subject').value = `RE: ${email.subject}`;
            else
                document.querySelector('#compose-subject').value = email.subject;
            // Set the body
            document.querySelector('#compose-body').value = 'On ' + email.timestamp + ", " + email.sender + " wrote:\n" + email.body;
        });
}

function archive_email(id, state) {

    // Mark the email as archived
    fetch(`/emails/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            archived: !state
        })
    });
    load_mailbox('archive');
}

function send_email() {

    // Show the email details and hide other views
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'block';
    document.querySelector('#email-details').style.display = 'none';

    // Send the email
    fetch('/emails', {
        method: 'POST',
        body: JSON.stringify({
            sender: document.querySelector('#compose-sender').value,
            recipients: document.querySelector('#compose-recipients').value,
            subject: document.querySelector('#compose-subject').value,
            body: document.querySelector('#compose-body').value
        })
    }).then(r => r.json())
        .then(email => {
            console.log(email);
        });
    load_mailbox('sent');
}