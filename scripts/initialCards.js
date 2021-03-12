const initialCards = [{
  name: 'Батайск',
  link: 'https://i.mycdn.me/i?r=AyH4iRPQ2q0otWIFepML2LxRS8l9iCIS9vT63qINr_7rSQ.jpg'
},
{
  name: 'Ростов-на-Дону',
  link: 'https://s00.yaplakal.com/pics/pics_preview/7/7/8/7128877.jpg'
},
{
  name: 'Таганрог',
  link: 'https://foma.ru/wp-content/uploads/2017/03/Kamennaya_lestnitsa_AlixSaz_viki-768x1152.jpg'
},
{
  name: 'Новосибирск',
  link: 'https://i1.photo.2gis.com/images/geo/0/30258560047953793_8d48.jpg'
},
{
  name: 'Таганрог',
  link: 'http://school30tag.moy.su/muzey/TAGAN02.jpg'
},
{
  name: 'Ростов-на-Дону',
  link: 'http://don.go2all.ru/imgs/25/19/53274.jpg'
},
];

function renderCard (card) {
	return `<li class="card">
	<img class="card__image" src="${card.link}" alt="${card.name}">
	<div class="card__info">
		<h2 class="card__title">${card.name}</h2>
		<button type="button" class="card__like"></button>
		<button type="button" class="card__delete-icon"></button>
	</div>
</li>`
}

function renderAllCards() {
	const cardHtml = initialCards.map(function(card){
		return renderCard(card);
	}).join("\n");

	document.querySelector(".cards").innerHTML = cardHtml;

	let likes = document.querySelectorAll('.card__like');

	likes.forEach(function(likeButton) {
		likeButton.addEventListener('click', function() {
			likeButton.classList.toggle('card__like_active');
		});
	});

	let cards = document.querySelectorAll('.card');
	let cardsContainer = document.querySelector('.cards');
	cards.forEach(function(card) {
		card.addEventListener('click', function(event) {
			if (event.target.classList.contains('card__delete-icon')) {
				cardsContainer.removeChild(event.currentTarget);
			}

			if (event.target.classList.contains('card__image')) {
				openGallery(event.target.src, event.target.alt);
			}
		});
	});
}

renderAllCards();