export interface List {
  id: number;
  poster_path: string;
  title: string;
  name: string;
  overview: string;
}

export interface DetailParams {
  id: string;
  type: string;
}

export interface Cast {
  name: string;
  character: string;
  profile_path: string;
}

export interface Movie {
  title: string;
  backdrop_path: string;
  name: string;
  overview: string;
  poster_path: string;
  credits: {
    cast: Array<Cast>;
  };
}
