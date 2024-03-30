//just a simple function to the thank the user for subscribing
let inputElement = document.querySelector(".form input");
let buttonElement = document.querySelector(".form button");

buttonElement.addEventListener("click", function(){
    event.preventDefault();
    if (inputElement.value == ""){
        alert("Please enter your email address");
    } else {
        alert("Thank you for subscribing!");
    }
});
//to change the image when hovering on product containers, I had to use a for each loop to loop through all the images and then add an event listener to each one, then I had to get the last part of the image source and then use that to change the image source to the hover image
let productImages = document.querySelectorAll(".product img");
productImages.forEach(function(image){
    image.classList.add('transition');
    let lastPart = image.src.split('/').pop().split('.')[0];
    let lastChar = (lastPart.slice(-2) >= '10' && lastPart.slice(-2) <= '16') ? lastPart.slice(-2) : lastPart.slice(-1);
    image.addEventListener("mouseover", function(){
        this.src = "images/finproduct-" + lastChar + "-1.webp";
    });
    image.addEventListener("mouseout", function(){
        this.src = "images/featured-" + lastChar + ".webp";
    });
});
let largeImage = document.querySelector('.productdets-image img');
let smallImages = document.querySelectorAll('.productdets-small img');

// Function to update the active small image, initially couldn't figure out how the image name splitting worked but after doing some research it was simple enough
function updateActiveSmallImage() {
    smallImages.forEach(function(smallImage) {
        smallImage.classList.remove('active');
    });

    let largeImageFilename = largeImage.src.split('/').pop();
    //for each loop to loop through all the images and then add the active class to the image that matches the large image
    smallImages.forEach(function(smallImage) {
        let smallImageFilename = smallImage.src.split('/').pop();
        if (smallImageFilename === largeImageFilename) {
            smallImage.classList.add('active');
        }
    });
}
updateActiveSmallImage();


smallImages.forEach(function(smallImage) {
    
    smallImage.addEventListener('click', function() {
        largeImage.src = this.src;

        updateActiveSmallImage();
    });
});
//function to run the quantity buttons, just adds or subtracts 1 from the quantity input throught the buttons
let decreaseButton = document.querySelector('#decrease');
let increaseButton = document.querySelector('#increase');
let quantityInput = document.querySelector('#quantity');

decreaseButton.addEventListener('click', function(event) {
    event.preventDefault();
    if (quantityInput.value > 1) {
        quantityInput.value--;
    }
});

increaseButton.addEventListener('click', function(event) {
    event.preventDefault();
    quantityInput.value++;
});
//So essentially this is a function which runs when clicking on a product box, it takes the product id from the url and then uses that to find the product details in the array, then it updates the product details on the page with the new product details. So I have an empty products.html and this script fills it in with the data from the array. I'm sure there's a better way to do this but I'm really proud of this one.
document.addEventListener('DOMContentLoaded', function () {
    //getting the product id from the url
    const productId = getProductIdFromUrl();
    if (productId) {
        const productDetails = getProductDetails(productId);
        updateProductDetails(productDetails);
    }
    //get the product id from the url
    function getProductIdFromUrl() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get('product');
    }
    //product details array with all the product data that needs to be filled in
    function getProductDetails(productId) {
        const products = [
            { id: '1', brand: 'Smith Corona', name: 'Smith Corona Galaxie Deluxe Typewriter', price: '$369.99 CAD', description: "Introducing the Late '60s Smith Corona Galaxie Deluxe Typewriter – a timeless piece of American craftsmanship for writers and creatives. Made in the USA, this vintage gem blends sleek design with reliable functionality. Each keystroke is a journey into typewriter nostalgia, making it the perfect companion for those who appreciate both style and substance. Unleash your creativity with the Smith Corona Galaxie Deluxe – where vintage charm meets the spirit of the late '60s." },
            { id: '2', brand: 'Underwood', name: 'Underwood Universal Typewriter', price: '$899.99 CAD', description: "Introducing the Black Enamel Underwood Universal Typewriter from the mid-1930s, crafted with precision in the USA. This vintage masterpiece features glass keys and a sleek black finish, offering writers, collectors, and young creatives a timeless connection to the art of writing. Whether you seek nostalgia, a collector's gem, or a tangible writing experience for the next generation, the Underwood Universal delivers enduring quality and a touch of typewriter history. Elevate your writing journey with this symbol of craftsmanship and innovation from the heart of the USA. Let the clack of keys transport you to an era where each word was a manual labor of love." },
            { id: '3', brand: 'Underwood', name: 'Underwood Deluxe Typewriter', price: '$249.99 CAD', description: "Introducing the 1950s Underwood Leader Typewriter – a Canadian classic designed for new typists and young minds entering the world of words. With its timeless design and smooth functionality, this vintage gem invites young creatives to experience the joy of tangible writing. Tailored for durability and nostalgia, the Underwood Leader is the perfect companion for the next generation of wordsmiths. Elevate your writing journey with this classic Canadian creation." },
            { id: '4', brand: 'Remington', name: 'Remington Travel Riter Typewriter', price: '$499.99 CAD', description: "Introducing the Late 1950s Remington Travel Riter Typewriter in Army Green – a compact delight from Holland designed for young poets and new typewriter enthusiasts. Portable and charming, this vintage gem invites you on a creative journey, offering a tactile writing experience perfect for those on the move. Whether you're a newcomer to typewriters or a poet seeking inspiration, the Remington Travel Riter in Army Green is your creative ally, blending Dutch craftsmanship with vibrant energy. Start your writing adventure today." },
            { id: '5', brand: 'Corona', name: 'Corona 3 Special (Emerald Green) Folding Typewriter', price: '$4,499.99 CAD', description: 'Classic Design Meets Portability: Rediscover the elegance of typewriting with our Corona 3 Folding Typewriter, now available in a striking Emerald Green finish. This vintage masterpiece is an ode to a bygone era, where craftsmanship met functionality and writers cherished the touch of each key.' },
            { id: '6', brand: 'Olivetti', name: 'Olivetti Valentine (White) Typewriter', price: '$2,499.99 CAD', description: "The Valentine typewriter was launched on 14 February 1969, explains the name 'Valentine'. It was designed by the late Italian architect and designer, Ettore Sottsass, with the British designer, Perry Ellis, for the Italian firm, Olivetti. This valentine was mostly sold in red possibly because of the launch date." },
            { id: '7', brand: 'Hermes', name: 'Hermes 3000 (Hebrew) Typewriter', price: '$2,399.99 CAD', description: `The Hermes 3000 Typewriter with a Hebrew keyboard is more than a writing tool; it's an embodiment of timeless grace and functionality. With each key pressed, you become part of a centuries-old tradition. Don't miss the opportunity to own this remarkable piece of typewriter history. Elevate your writing and collection with the Hermes 3000, where the beauty of Hebrew script meets the legacy of typewriter craftsmanship. Embrace the art of writing and make this collector's dream your own. Buy now and immerse yourself in the world of elegant expression.` },
            { id: '8', brand: 'Olympia', name: 'Olympia SM1 (Maroon) Typewriter', price: '$1,849.99 CAD', description: `Discover the rare and magnificent Burgundy Red Olympia SM1 Typewriter, crafted in West Germany in 1950. This vintage gem is more than just a writing instrument; it's a piece of history that boasts elegance and functionality. The Olympia SM1 is a testament to the craftsmanship of its time, offering both enduring functionality and a touch of nostalgia. The Burgundy Red hue adds a sense of sophistication to this typewriter, making it a standout piece in any collection. For writers seeking an exceptional and inspiring writing experience, the Olympia SM1 is the perfect companion. It transports you to a time when each keystroke was a deliberate act of creation, allowing your words to flow with grace and precision. Embrace the rarity and charm of the Burgundy Red Olympia SM1 Typewriter, a collector's dream and a writer's muse. Craft your words in style and experience the elegance of a bygone era with this timeless piece of history.​` },
            { id: '9', brand: 'Royal', name: 'Royal Quiet Deluxe (Sunbeam Yellow) Typewriter', price: '$1,799.99 CAD', description: "Unleash your creativity with the Sunbeam Yellow Royal Quiet Deluxe Typewriter from the mid-1950s. This vintage gem not only exudes a pop of color but also offers a delightful typing experience." },
            { id: '10', brand: 'Remington', name: 'Remington Streamliner (Gust of Wind) Typewriter', price: '$1,699.99 CAD', description: 'Introducing the Remington Gust of Wind Typewriter, a captivating blend of vintage charm and modern functionality. Crafted with precision, this typewriter sweeps you into a world of creative possibilities. ' },
            { id: '11', brand: 'Halda', name: 'Halda P Typewriter', price: '$1,399.99 CAD', description: 'Travel back in time to the late 1950s with the Halda P Typewriter, a beautifully crafted piece of history from Sweden. Immerse yourself in the vintage charm of this iconic typewriter, which speaks to the hearts of both collectors and writers seeking a unique and nostalgic writing experience.' },
            { id: '12', brand: 'Adler', name: 'Adler Tippa S (Cursive) Typewriter', price: '$1,399.99 CAD', description: "Introducing the Classic 1970s Adler Tippa S Typewriter in White with Elegant Cursive Typeface, Crafted in West Germany! Experience the timeless charm of the 1970s with our beautifully restored Adler Tippa S typewriter, exquisitely finished in pristine white and featuring a stunning cursive typeface. This remarkable piece of history hails from West Germany and is sure to captivate enthusiasts, collectors, and writers alike." },
            { id: '13', brand: 'RetroType', name: 'Typewriter Paper - Bare White', price: '$17.99 CAD', description: "Introducing Southworth Techweave Typewriter Paper – the epitome of precision and performance in every keystroke. Crafted with meticulous attention to detail, this paper is engineered for seamless compatibility with typewriters, ensuring a smooth and consistent typing experience. The innovative Techweave design enhances durability, making each sheet a reliable canvas for your words." },
            { id: '14', brand: 'RetroType', name: 'Typewriter Paper - White Linen', price: '$26.99 CAD', description: "Introducing the 24lb White Linen Southworth Typewriter Paper – a blend of sophistication and functionality. Crafted with 25% cotton, this paper offers a unique linen texture that adds a touch of elegance to your typewritten creations. The substantial weight ensures durability, while the crisp white colour provides a clean canvas for your words. Compatible with typewriters, this Southworth Typewriter Paper transforms each keystroke into a statement of style. Elevate your writing experience with the premium quality of the 24lb White Linen Typewriter Paper – where vintage charm meets modern functionality." },
            { id: '15', brand: 'RetroType', name: 'Typewriter Paper - Ivory White', price: '$33.99 CAD', description: "Unleash the full potential of your typewriter with our 100% Cotton 24lb Paper. Specially crafted for the clackety-clack of vintage keys, this paper offers a perfect balance of weight and texture. The cotton composition ensures durability and a smooth typing experience, making it the ideal companion for your typewriter adventures. Elevate your writing with each keystroke on our premium 100% Cotton 24lb Paper – the perfect match for typewriter enthusiasts." },
            { id: '16', brand: 'RetroType', name: 'Typewriter Paper - Woven Mint', price: '$44.99 CAD', description: `Introducing the 32lb Woven Southworth Typewriter Paper in Mint – a delightful blend of sophistication and creativity. Crafted from 100% cotton, this premium paper is designed for typewriter enthusiasts who seek both quality and style.

            The robust 32lb weight ensures a substantial feel under your fingertips, while the unique mint hue adds a touch of elegance to your documents. Each sheet embodies the perfect balance of strength and finesse, enhancing the tactile pleasure of typewriter keystrokes.
            
            Whether you're drafting a novel or crafting a letter, our Southworth Typewriter Paper in Mint provides a distinctive canvas for your words. Elevate your typewriting experience with the luxurious feel and minty freshness of this exceptional 100% cotton paper. Your typewriter deserves the best – indulge in the artistry of writing with Southworth.` },
            
        ];

        return products.find(product => product.id === productId);
    }

   //function to insert the product details into the html
    function updateProductDetails(productDetails) {
        if (productDetails) {
            
            document.getElementById('product-brand').innerText = productDetails.brand;
            document.getElementById('product-name').innerText = productDetails.name;
            document.getElementById('product-price').innerText = productDetails.price;
            document.getElementById('product-description').innerText = productDetails.description;

            document.getElementById('largeimage').src = `images/featured-${productDetails.id}.webp`;
            document.getElementById("smallimage1").src = `images/featured-${productDetails.id}.webp`;
            document.getElementById("smallimage2").src = `images/finproduct-${productDetails.id}-1.webp`;
            document.getElementById("smallimage3").src = `images/finproduct-${productDetails.id}-2.webp`;
            document.getElementById("smallimage4").src = `images/finproduct-${productDetails.id}-3.webp`;
        }
    }
});
