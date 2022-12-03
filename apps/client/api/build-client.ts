import axios from 'axios'
import { NextPageContext } from 'next'

export const buildClient = ({ req }: NextPageContext) => {
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req?.headers,
    })
  } else {
    return axios.create({
      baseURL: '/',
      headers: req?.headers,
    })
  }
}
