import { Hono } from 'hono'
import os from 'node:os'

const info = new Hono()

info.get('/serverinfo', (c) => {
  const uptime = os.uptime()
  const loadavg = os.loadavg()
  const totalMem = os.totalmem()
  const freeMem = os.freemem()
  const platform = os.platform()
  const release = os.release()
  const cpus = os.cpus()

  const formatBytes = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB']
    let i = 0
    while (bytes >= 1024 && i < units.length - 1) {
      bytes /= 1024
      i++
    }
    return `${bytes.toFixed(2)} ${units[i]}`
  }

  return c.json({
    platform,
    release,
    uptime: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${Math.floor(uptime % 60)}s`,
    loadavg,
    memory: {
      total: formatBytes(totalMem),
      free: formatBytes(freeMem),
      used: formatBytes(totalMem - freeMem),
      percentage: `${((1 - freeMem / totalMem) * 100).toFixed(2)}%`
    },
    cpu: {
      model: cpus[0]?.model || 'Unknown',
      cores: cpus.length,
      speed: cpus[0]?.speed || 0
    }
  })
})

export default info
