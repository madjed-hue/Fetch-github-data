let theInput = document.querySelector(".get-repos input"),
    getButton = document.querySelector(".get-button"),
    reposData = document.querySelector(".show-data");

window.onload = function(){
    theInput.focus();
}


getButton.onclick = function(){
    if (theInput.value == "" || null) {
        let theOverlay = document.createElement("div");
        theOverlay.className = "overlay";
        let overlaySpan = document.createElement("span");
            overlaySpan.innerHTML = "Please Put your Github username to fetch the data !";

        theOverlay.appendChild(overlaySpan);

        let theX = document.createElement("span");
            theX.innerHTML = "X";
            theX.className = "the-x";
            theOverlay.appendChild(theX);

            theX.onclick = () =>{
                theX.parentNode.remove();
                theInput.focus();
            }
        document.body.prepend(theOverlay);

    }else{
        getRepos();
    }
}

// let myOverlayBtn = document.querySelector(".overlay .the-x");



function getRepos(){
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
    .then((res) =>res.json())
    .then((results) => {
        reposData.innerHTML = "";
        results.forEach(result => {
            let mainDiv = document.createElement("div"),
                reposName = document.createTextNode(result.name);
            mainDiv.appendChild(reposName);

            let theUrl = document.createElement("a"),
                theUrlText = document.createTextNode("visit");
            
            theUrl.appendChild(theUrlText);
            theUrl.href = `https://github.com/${theInput.value}/${result.name}`;
            theUrl.setAttribute("target", "_blank");
            mainDiv.appendChild(theUrl);

            let starsSpan = document.createElement("span"),
                starsText = document.createTextNode(`Stars ${result.stargazers_count}`);
            starsSpan.appendChild(starsText);
            mainDiv.appendChild(starsSpan);

            mainDiv.className = "repo-box";

            reposData.appendChild(mainDiv);
            // console.log(mainDiv);
        })
    })
}
