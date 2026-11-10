/**
 * Contact form, handled by Netlify Forms. Netlify finds the form by scanning
 * the exported HTML for `data-netlify`, so this must stay a plain server-rendered
 * form (it works without JavaScript and posts straight to /success).
 */
export default function ContactForm() {
  const field = 'w-full rounded border-2 border-white/40 bg-navy-700/60 px-3 py-2 text-white focus:border-blue-300'
  return (
    <form
      className="grid max-w-2xl gap-6"
      name="contact-form"
      method="POST"
      action="/success"
      data-netlify="true"
      netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="contact-form" />
      <p hidden>
        <label>
          Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <div className="grid gap-2">
        <label htmlFor="name">Name</label>
        <input className={field} id="name" name="name" type="text" autoComplete="name" required />
      </div>
      <div className="grid gap-2">
        <label htmlFor="email">E-mail Address</label>
        <input className={field} id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="grid gap-2">
        <label htmlFor="message">Message</label>
        <textarea className={field} id="message" name="message" rows={6} required />
      </div>
      <div>
        <button
          className="rounded border-2 border-navy-800 bg-blue-400 px-16 py-4 font-semibold text-navy-800 hover:bg-blue-300"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  )
}
