export interface IMovie {
    id: string;
    name: string;
    overview: string;
    releaseDate: string;
    // reviews: IReview[]
    img?: Ipicture;
}

interface Ipicture {
    url: string
}

interface IReview {
    id: string;
    author: string,
    content: string,
    language: string | null
}