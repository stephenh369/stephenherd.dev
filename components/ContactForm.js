/**
 * Contact form, handled by Netlify Forms. Netlify finds the form by scanning
 * the exported HTML for `data-netlify`, so this must stay a plain server-rendered
 * form (it works without JavaScript and posts straight to /success).
 */
export default function ContactForm() {
  const field = 'w-full rounded-lg border border-white/30 bg-transparent px-3 py-2 text-white focus:border-blue-400'
  return (
    <form
      className="glass grid gap-6 p-6 md:p-10"
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
        <button className="btn w-full sm:w-auto sm:px-16" type="submit">
          Send
        </button>
      </div>
    </form>
  )
}
