export interface IMovie {
    id: string;
    name: string;
    overview: string;
    releaseDate: string;
    score: string;
    // reviews: IReview[]
    img?: Ipicture;
}

interface Ipicture {
    url: string
}


export interface IRecommendedMovies {
    id: string,
    recommended: IMovie[]
}

interface IReview {
    id: string;
    author: string,
    content: string,
    language: string | null
}