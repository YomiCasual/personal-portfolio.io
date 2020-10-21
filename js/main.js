

window.sr = ScrollReveal()



sr.reveal('.animate-left', {
    origin: 'left',
    duration: 1500,
    distance: '10rem',
    delay: 600,
    easing: 'cubic-bezier(0.5, 0, 0, 1)'
})

sr.reveal('.animate-right', {
    origin: 'right',
    duration: 1500,
    distance: '10rem',
    delay: 1200,
    easing: 'cubic-bezier(0.5, 0, 0, 1)'
})

sr.reveal('.animate-up', {
    origin: 'up',
    duration: 1500,
    distance: '10rem',
    delay: 1200,
    easing: 'cubic-bezier(0.5, 0, 0, 1)'
})

sr.reveal('.animate-down', {
    origin: 'down',
    duration: 1500,
    distance: '10rem',
    delay: 1200,
    easing: 'cubic-bezier(0.5, 0, 0, 1)'
})


$('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});


const select = (element) => {
    return document.querySelector(element)
}

const navToggler = select(".nav-button")
const navBar = select(".navbar")


navToggler.addEventListener('click', () => {
    navBar.classList.toggle('open')
})

const buttonFilterGraphic = document.querySelector('.button-group-2')
const allButtonsGraphic = document.querySelectorAll('.button-group-2 .btn-port')

const buttonFilterUI = document.querySelector('.button-group-1')
const allButtonsUI = document.querySelectorAll('.button-group-1 .btn-port')

const graphicDesignCard = select('.graphic-design-card');
const uiDesignCard = select('.ui-design-card')


const addPortfolio = async (file,body) => {
    const data = await fetch(`./js/${file}.json`)
    const graphicPort = await data.json()
    
    graphicPort.graphicPortfolio.map(item => {
        createElement(item.item, body)
    })
}


const createElement = ({ image, filter, title, text}, body) => {
    const div = document.createElement('div');
    div.classList = `col-xl-4 col-md-6 col-sm-12 portfolio-card ${filter}`
    div.innerHTML = ` 
         <div class="inner-card">
            <div class="portfolio-card-title">
                <div class="portfolio-card-img">
                    <a class="test-popup-link" href=${image}>
                        <img src=${image} alt="" >
                    </a>
                </div>
                <div class="portfolio-card-content mt-4 text-uppercase">
                    <h3>${title}</h3>
                    <p>${text}</p>
                </div>
            </div>
            </div>
    `

    body.appendChild(div)
}


const filterCard = (item, button2, element) => {

    button2.forEach((item) => {
        item.classList.remove('active')
    })

    if (item.target.classList.contains('btn-port')) {
        item.target.classList.add('active')

        const attrib = item.target.getAttribute('data-filter')
        $(element).isotope({
            filter: attrib
        })
    
    }

}

window.addEventListener("DOMContentLoaded", async (e) => {

        buttonFilterGraphic.addEventListener('click', (e)=>  {
            filterCard(e, allButtonsGraphic, ".portfolio .graphic-design-card")
         })

         buttonFilterUI.addEventListener('click', (e) => {
            filterCard(e, allButtonsUI, ".portfolio .ui-design-card")
         })

    //add portfolio files
    await addPortfolio("ui-ux-portfolio", uiDesignCard)

    await addPortfolio("graphic-portfolio", graphicDesignCard)


    //gallery popup

    $(".portfolio .grid .test-popup-link").magnificPopup({
        type: "image",
        gallery: {enabled: true}
    })
})
