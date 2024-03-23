export default eventHandler((event) => {
  sendRedirect(event, '/account', 302)
})
