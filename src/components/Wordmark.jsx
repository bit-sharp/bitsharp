export default function Wordmark({ small }) {
  return (
    <span className={`wordmark ${small ? 'sm' : ''}`}>
      <span className="wm-bit">bit</span><span className="wm-slash">/</span><span className="wm-sharp">sharp</span>
    </span>
  )
}
