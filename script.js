const API = 'https://rel.ink/api/links/';
const displayOutput = document.querySelector('.display-links');
const submitButton = document.querySelector('.submit');
const errors = document.querySelector('.errors');
const linkInput = document.querySelector('#url');
const hamburger = document.querySelector('.hamburger');
const collapseNavbar = document.querySelector('.collapse-navbar');
const links = JSON.parse(localStorage.getItem('links')) || [];

function fetchURL() {
    errors.innerText = "";
    const link = document.querySelector('#url').value;
    if(!link){
        errors.innerText = "Please add a link";
        return;
    }
    if (link) {
        shortenURL(link);
        linkInput.value = "";

    }
}

function shortenURL(url) {
    fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            url: url
        })
    }).then(
        res => res.json()
    ).then(
        json => {
            const item = {
                original: url,
                short: `https://rel.ink/${json.hashid}`
            };
            links.push(item);
            console.log(json)
            localStorage.setItem('links', JSON.stringify(links));
            displayURL();

        }).catch(
        err => console.log(err)
    );
}

function displayURL() {
    let allLinks = Array.from(JSON.parse(localStorage.getItem('links')));
    displayOutput.innerHTML = allLinks.map((link, i) => {
        return `
        <div class="link-output">
        <p id="original-link">${link.original}</p>
        <a class="shortened-link" id="link${i}">${link.short}</a>
        <a class="btn btn-primary shortenedLinks" alt="Copy to clipboard">Copy</a>
      </div>
        `;
    }).join('');
}

hamburger.addEventListener('click', e => {
    collapseNavbar.classList.toggle('active');
})
submitButton.addEventListener('click', fetchURL);
displayURL();