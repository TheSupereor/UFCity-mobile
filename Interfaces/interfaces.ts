export interface RUDay{
  type: String,
  meat: RUItem[]
}

export interface RUItem{
  title: String,
  options: String
}

export interface news{
  text: string,
  link: string,
  date: string
}

export interface highLightNews{
  text: string,
  link: string,
  date: string,
  thumbnailUrl: string
}

export interface event{
  image: string,
  text: string,
  link: string,
  date: string,
  price: string
}

export interface MenuItem{
  icon: string,
  name: string,
  path: string
}

export interface highLightNewsResponse {
  highlight: highLightNews[],
  latestNews: highLightNewsResponseLatestNews[]
}

export interface highLightNewsResponseLatestNews{
  img: string,
  title:{
    url: string,
    description: string
  },
  description: string
}