let tredningManga = [];

const convert = (apiEntry) => {
	let mangaObject = {
		title: apiEntry.canonicalTitle,
		rating: apiEntry.averageRating,
		favourites: apiEntry.favoritesCount,
		image: apiEntry.posterImage.tiny,
		synopsis: apiEntry.synopsis,
		rank: apiEntry.ratingRank,
	};
	return tredningManga.push(mangaObject);
};

fetch("https://kitsu.io/api/edge/trending/manga")
	.then((response) => {
		return response.json();
	})
	.then((jsonResponse) => {
		return jsonResponse.data.map((element) => element.attributes);
	})
	.then((manga) => manga.forEach((entry) => tredningManga.push(convert(entry))))
	.then(() => {
		insertIntoDiv();
	});

const insertIntoDiv = () => {
	tredningManga.forEach((entry) => {
		if (entry.title) {
			document.querySelector(".manga").innerHTML +=
				`<div class="card">` +
				`<div class="manga-title">${entry.title}</div>` +
				`<div class="rating">Rating: ${entry.rating}</div>` +
				`<div class="favourites">Favourites: ${entry.favourites}</div>` +
				`<img
				class="manga-img"
				src="${entry.image}"
				/>` +
				`</div>`;
		}
	});
};
