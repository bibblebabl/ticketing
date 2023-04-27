import axios from 'axios'
import { NextPageContext } from 'next'

export const buildClient = ({ req }: NextPageContext) => {
  if (typeof window === 'undefined') {
    // We are on the server
    return axios.create({
      // baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      baseURL: 'http://www.getticket.store',
      headers: req?.headers,
    })
  } else {
    // We must be on the browser
    return axios.create({
      baseURL: '/',
      headers: req?.headers,
    })
  }
}
