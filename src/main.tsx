import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App, { type PageKind } from './App.tsx'

const root = document.getElementById('root')!
const path = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/+$/, '')
const pages: Readonly<Partial<Record<string, PageKind>>> = {
  '/partners-investors': 'partners',
  '/support': 'support',
  '/terms': 'terms',
  '/privacy-policy': 'privacy-policy',
  '/cookie-policy': 'cookie-policy',
}
const page = root.dataset.page === 'not-found' ? 'not-found'
  : path === '' ? undefined
  : pages[path] ?? 'not-found'

if (page === 'not-found') document.title = 'Page not found — LilDrills'

createRoot(root).render(
  <StrictMode>
    <App page={page} />
  </StrictMode>,
)
