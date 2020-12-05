window.sr = ScrollReveal();

sr.reveal(".animate-left", {
	origin: "left",
	duration: 1500,
	distance: "10rem",
	delay: 600,
	easing: "cubic-bezier(0.5, 0, 0, 1)",
});

sr.reveal(".animate-right", {
	origin: "right",
	duration: 1500,
	distance: "10rem",
	delay: 600,
	easing: "cubic-bezier(0.5, 0, 0, 1)",
});

sr.reveal(".animate-up", {
	origin: "up",
	duration: 1500,
	distance: "10rem",
	delay: 600,
	easing: "cubic-bezier(0.5, 0, 0, 1)",
});

sr.reveal(".animate-down", {
	origin: "down",
	duration: 1500,
	distance: "10rem",
	delay: 600,
	easing: "cubic-bezier(0.5, 0, 0, 1)",
});

$(".navbar-nav>li>a").on("click", function () {
	$(".navbar-collapse").collapse("hide");
});

const select = element => {
	return document.querySelector(element);
};

const navToggler = select(".nav-button");
const navBar = select(".navbar");

navToggler.addEventListener("click", () => {
	navBar.classList.toggle("open");
});

const buttonFilterGraphic = document.querySelector(".button-group-2");
const allButtonsGraphic = document.querySelectorAll(
	".button-group-2 .btn-port",
);

const buttonFilterUI = document.querySelector(".button-group-1");
const allButtonsUI = document.querySelectorAll(".button-group-1 .btn-port");

const graphicDesignCard = select(".graphic-design-card");
const uiDesignCard = select(".ui-design-card");
const developerCard = select(".developer-card");

const addPortfolio = async (file, body, developer) => {
	const data = await fetch(`./js/${file}.json`);
	const graphicPort = await data.json();

	graphicPort.Portfolio.map((item, index) => {
		createElement(item.item, body, index, developer);
	});
};

const createElement = (
	{ image, filter, title, text, link },
	body,
	index,
	developer,
) => {
	const div = document.createElement("div");
	if (!developer) {
		div.classList = `col-xl-4 col-md-6 col-sm-12 portfolio-card ${filter}`;
		div.innerHTML = ` 
			<div class="inner-card">
				<div class="portfolio-card-title">
					<div class="portfolio-card-img" style="object-fit: none">
						<a class=${!link && "test-popup-link"} href=${
			!link ? image : link
		} target="_blank">
							<img src=${image} alt="" >
						</a>
					</div>
					<div class="portfolio-card-content mt-4 text-uppercase">
						<h3>${title}</h3>
						${
							!link
								? "<p>" + text + "</p>"
								: "<a class='btn button-primary' href=" +
								  link +
								  " target='_blank' >Visit</a>"
						}
					
					</div>
				</div>
				</div>
    `;
	} else {
		div.classList = `col-xl-12 col-md-12 col-sm-12 portfolio-card no-padding`;
		div.innerHTML = ` 
                    <div class="portfolio-card-img img-hidden" style="object-fit: none">
                    <a class=${!link && "test-popup-link"} href=${
			!link ? image : link
		} target="_blank">
                        <img src=${image} alt="" >
                    </a>
                </div>
            <div class="button-group"  >
            
                <a href=${link} target="_blank">
                    <button class="button-text" >${index + 1}. ${title}</button>
                    <div class="button-img">
                        <img src=${image} />
                    </div>  
                </a>
            </div>
    `;
	}

	body.appendChild(div);
};

const filterCard = (item, button2, element) => {
	button2.forEach(item => {
		item.classList.remove("active");
	});

	if (item.target.classList.contains("btn-port")) {
		item.target.classList.add("active");

		const attrib = item.target.getAttribute("data-filter");
		$(element).isotope({
			filter: attrib,
		});
	}
};

window.addEventListener("DOMContentLoaded", async e => {
	if (buttonFilterGraphic) {
		buttonFilterGraphic.addEventListener("click", e => {
			filterCard(e, allButtonsGraphic, ".portfolio .graphic-design-card");
		});
	}

	if (buttonFilterUI) {
		buttonFilterUI.addEventListener("click", e => {
			filterCard(e, allButtonsUI, ".portfolio .ui-design-card");
		});
	}

	if (uiDesignCard) {
		await addPortfolio("ui-ux-portfolio", uiDesignCard);
	}

	if (graphicDesignCard) {
		await addPortfolio("graphic-portfolio", graphicDesignCard);
	}

	if (developerCard) {
		await addPortfolio("developer", developerCard, true);
	}

	//gallery popup

	$(".portfolio .grid .test-popup-link").magnificPopup({
		type: "image",
		mainClass: "mfp-with-zoom",
		gallery: { enabled: true },
		mainClass: "scrolling-image",
		image: {
			verticalFit: false,
		},
		zoom: {
			enabled: true, // By default it's false, so don't forget to enable it

			duration: 300, // duration of the effect, in milliseconds
			easing: "ease-in-out", // CSS transition easing function

			// The "opener" function should return the element from which popup will be zoomed in
			// and to which popup will be scaled down
			// By defailt it looks for an image tag:
			opener: function (openerElement) {
				// openerElement is the element on which popup was initialized, in this case its <a> tag
				// you don't need to add "opener" option if this code matches your needs, it's defailt one.
				return openerElement.is("img")
					? openerElement
					: openerElement.find("img");
			},
		},
	});
});
