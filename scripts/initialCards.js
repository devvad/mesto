const initialCards = [{
  name: 'Батайск',
  link: 'https://stihi.ru/pics/2013/12/07/8880.jpg'
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
		<button type="button" class="card__like card__like_active"></button>
	</div>
</li>`
}

function renderAllCards() {
	const cardHtml = initialCards.map(function(card){
		return renderCard(card);
	}).join("\n");

	document.querySelector(".cards").innerHTML = cardHtml;
}

renderAllCards();

// 1. Внутри renderAllCards после того, как добавили карточки, нужно найти все сердечки (querySelectorAll);

// 2. Пройтись по всем элементам, используя метод forEach (https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll#accessing_the_matches).
 // Для каждого элемента навесить обработчик на событие click, в котором переключать класс card__like_active (classList.toggle).