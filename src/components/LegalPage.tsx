import terms from '../content/legal/terms.html?raw'
import privacy from '../content/legal/privacy-policy.html?raw'
import cookies from '../content/legal/cookie-policy.html?raw'
import './LegalPage.css'

const documents = {
  terms,
  'privacy-policy': privacy,
  'cookie-policy': cookies,
}

export type LegalPageKind = keyof typeof documents

export default function LegalPage({ kind }: { kind: LegalPageKind }) {
  // The published documents are stored as reviewed, static HTML in the repository.
  return <div dangerouslySetInnerHTML={{ __html: documents[kind] }} />
}
