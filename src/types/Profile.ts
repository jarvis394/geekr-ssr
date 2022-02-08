import Badge from './Badge'
import { Hub } from './Hub'

export interface Profile {
  id: number
  alias: string
  fullname: string
  /** Support for API version 1 */
  avatar: string
  avatarUrl: string
  speciality: string
}

export interface ProfileCompany {
  alias: string
  commonHubs: Hub[]
  descriptionHtml: string
  id: string
  imageUrl: string
  relatedData: Record<string, never>
  statistics: {
    subscribersCount: number
    rating: number
    invest: number
  }
  titleHtml: string
}

export interface ProfileContact {
  title: string
  url: string
  value: string
}

export interface ProfileWhois {
  aboutHtml: string
  alias: string
  badgets: Badge[]
  contacts: ProfileContact[]
  invitedBy: {
    issuerLogin: string
    timeCreated: string
  }
}

export interface ProfileTag {
  name: string
  count: number
}

export interface ProfileCompaniesResponse {
  pagesCount: number
  companyIds: string[]
  companyRefs: ProfileCompany[]
}

export interface ProfileHubs {
  pagesCount: number
  hubIds: string[]
  hubRefs: Hub[]
}

export interface ProfileChildren {
  userRefs: Profile[]
  /** Contains users' aliases for some reason (14.04.2021) */
  userIds: string[]
  pagesCount: number
}

export interface ProfileLocation {
  id: string
  title: string
}

export interface ProfileExtended {
  alias: string
  avatarUrl: string
  birthday: string
  counterStats: {
    postCount: number
    commentCount: number
    favoriteCount: number
  }
  followStats: {
    followCount: number
    followersCount: number
  }
  fullname: string
  gender: string
  isReadonly: boolean
  lastActivityDateTime: string
  location: {
    city: ProfileLocation
    country: ProfileLocation
    region: ProfileLocation
  }
  rating: number
  ratingPos: number
  paymentDetails: {
    paymentPayPalMe: string | number
    paymentWebmoney: string | number
    paymentYandexMoney: string | number
  }
  contacts: {
    title: string
    url: string
    value: string
  }[]
  registerDateTime: string
  relatedData: Record<string, never>
  scoreStats: {
    score: number
    votesCount: number
  }
  score: number
  votesCount: number
  speciality: string
  workplace: { alias: string; title: string }[]
}
