import axios from 'axios'
import { testPlatform } from './platform'

export const metro = {
  async reload({ platform, port }: { platform?: string; port?: number } = {}) {
    platform = platform || testPlatform.name || 'android'
    port = parseInt(process.env.METRO_PORT ?? '8081')
    try {
      return await axios.post(
        `http://localhost:${port}/reload`,
        { platform },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    } catch (error) {
      console.error(`Metro on port ${port}: reload: Error: ${error}`)
      return undefined
    }
  },
}
