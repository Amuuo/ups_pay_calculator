
const OT_LIMIT_HOURS   = 5


let   CURRENT_WORKDAY  = new Workday()
let   MAIN_SHIFT       = new Shift(CURRENT_WORKDAY)

  
let register_link = document.createElement('a')
register_link.href = './register.php'
register_link.id   = 'register_link'


register_link.textContent  = 'Register'
document.querySelector('footer').prepend(register_link)
