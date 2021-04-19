let tredningManga = [];

const convert = (apiEntry) => {
	let mangaObject = {
		title: apiEntry.canonicalTitle,
		rating: apiEntry.averageRating,
		favourites: apiEntry.favoritesCount,
		image: apiEntry.posterImage.tiny,
		synopsis: apiEntry.synopsis,
		rank: apiEntry.ratingRank,
		slug: apiEntry.slug,
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
	.then(() => insertIntoDiv());

const getLinkFromSlug = (slug) => `https://www.anime-planet.com/manga/${slug}`;
const goToMangaOrigin = (slug) => location.href = getLinkFromSlug(slug);

const insertIntoDiv = () => {
	tredningManga.forEach((entry) => {
		if (entry.title) {
			document.querySelector(".manga").innerHTML +=
				`
				<div class="card" onclick="goToMangaOrigin('${entry.slug}')">
				<div class="manga-title">${entry.title}</div>
				<div class="rating">Rating: ${entry.rating}</div>
				<div class="favourites">Favourites: ${entry.favourites}</div>
				<img
				class="manga-img"
				src="${entry.image}"
				/>
				</div>
				`;
		}
	});
};