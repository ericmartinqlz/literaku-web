export default function (req, res, next) {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Referrer-Policy', 'same-origin')
  // res.setHeader('Content-Security-Policy', contentSecPolicies.join('; '))
  res.setHeader('Strict-Transport-Security', 'max-age=16768000')
  res.setHeader('X-Frame-Options', 'SAMEORIGIN')
  res.setHeader('X-XSS-Protection', '1; mode=block')

  next()
}
