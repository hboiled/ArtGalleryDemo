export class ArtModel {
    id?: number;
    title: string;
    artist: string;
    year: number;
    genre: string;
    review: string;
    country: string;
    imgPath: string;

    constructor(        
        title: string,
        artist: string,
        year: number,
        genre: string,
        review: string,
        country: string,
        imgPath: string,
        id?: number
    ) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.year = year;
        this.genre = genre;
        this.review = review;
        this.country = country;
        this.imgPath = imgPath;
    }
}