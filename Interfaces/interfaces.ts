export interface RUDay{
  type: String,
  meat: RUItem[]
}

export interface RUItem{
  title: String,
  options: String
}

export interface news{
  text: String,
  link: String,
  date: string
}

export interface highLightNews{
  text: String,
  link: String,
  date: string,
  image: string
}

export interface event{
  image: string,
  text: String,
  link: String,
  date: string,
  price: string
}

export interface MenuItem{
  icon: string,
  name: string,
  path: string
}