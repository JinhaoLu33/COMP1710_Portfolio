let galleryImages = document.querySelectorAll(".img");// select all the images for gallery to the galleryImages variable
let getLatestOpenedImg;//track the latest opened image
let windowWidth = window.innerWidth;

// the popup effect after click the image
// check whether there is images
if (galleryImages) {

    // use a loop to go through every image in the gallery
    galleryImages.forEach(function (image, index) {

        // use onclick event on the image
        image.onclick = function () {
            let getElementCss = window.getComputedStyle(image);//get all the styling for the elements from the css file
            let getFullImgUrl = getElementCss.getPropertyValue("background-image");//get the background property form the css
            let getImgUrlPos = getFullImgUrl.split("/Images/");//get the location of the image just clicked
            let setNewImgUrl = getImgUrlPos[1].replace('")', ''); //chose the second part(file name) and remove the ")



            getLatestOpenedImg = index; //get the current image position

            // pop up window
            let container = document.body; //create in the body of the page
            let newImgWindow = document.createElement("div"); //create a div when the image clicked
            container.appendChild(newImgWindow); //add the container to the div
            newImgWindow.setAttribute("class", "img-window");//styling in the css file
            newImgWindow.setAttribute("onclick", "closeImg()");//the second click will close the image

            let newImg = document.createElement("img");
            newImgWindow.appendChild(newImg);
            newImg.setAttribute("src", "Images/" + setNewImgUrl);
            newImg.setAttribute("id", "current-img");

            // load the image before the buttons to set the button position
            newImg.onload = function () {

                let imgWidth = this.width;
                let imageToEdge = ((windowWidth - imgWidth) / 2) - 90;

                // next button
                let newNextBth = document.createElement("a");
                let btnNextText = document.createTextNode("Next");
                newNextBth.appendChild(btnNextText);
                container.appendChild(newNextBth);//add the button to the container
                newNextBth.setAttribute("class", "img-btn-next");
                newNextBth.setAttribute("onclick", "changeImg(1)"); //assign the changeImg function to onclick event
                newNextBth.style.cssText = "right: " + imageToEdge + "px;";

                // prev button
                let newPrevBth = document.createElement("a");
                let btnPrevText = document.createTextNode("Prev");
                newPrevBth.appendChild(btnPrevText);
                container.appendChild(newPrevBth);
                newPrevBth.setAttribute("class", "img-btn-prev");
                newPrevBth.setAttribute("onclick", "changeImg(0)");
                newPrevBth.style.cssText = "left: " + imageToEdge + "px;";
            }

        }
    });
}

// close the image
function closeImg() {
    document.querySelector(".img-window").remove(); //remove the img-window
    document.querySelector(".img-btn-next").remove();
    document.querySelector(".img-btn-prev").remove();
}

//change image function
// direction: decide change next or pre
function changeImg(direction) {

    document.querySelector("#current-img").remove(); //remove the current image
    let getImgWindow = document.querySelector(".img-window"); //get the current image window
    let newImg = document.createElement("img");//get the new image
    getImgWindow.appendChild(newImg); //add the new image into the container

    let calcNewImg;// calculate the index of next/prev image
    if (direction === 1) {
        calcNewImg = getLatestOpenedImg + 1; //current index plus 1

        //when it is the last image, the index will be set to 0 to start over again
        if (calcNewImg >= galleryImages.length) {
            calcNewImg = 0;
        }
    } else if (direction === 0) {
        calcNewImg = getLatestOpenedImg - 1;
        if (calcNewImg < 0) {
            calcNewImg = galleryImages.length-1;
        }
    }

    let newImgUrl = window.getComputedStyle(galleryImages.item(calcNewImg)).getPropertyValue("background-image"); //use the new index to allocate the next/prev image in the array:galleryImages
    let getImgUrlPos = newImgUrl.split("/Images/");//get the location of the image just clicked
    let setNewImgUrl = getImgUrlPos[1].replace('")', ''); //remove the last part
    newImg.setAttribute("src","Images/"+setNewImgUrl); //form the new url
    newImg.setAttribute("id","current-img");

    getLatestOpenedImg = calcNewImg; // update the index

    newImg.onload = function (){
        let imgWidth = this.width;
        let imageToEdge = ((windowWidth - imgWidth) / 2) - 90;

        //update the button location when the image size changed
        let nextBtn = document.querySelector(".img-btn-next")
        nextBtn.style.cssText = "right: " + imageToEdge + "px;";
        let prevBtn = document.querySelector(".img-btn-prev")
        prevBtn.style.cssText = "left: " + imageToEdge + "px;";
    }


}