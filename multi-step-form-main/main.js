import { planPack } from './cards.js'
import { addOnsPack } from './cards.js'

document.addEventListener('DOMContentLoaded', () => {
  // Selecting all the required elements
  const form = document.querySelector('#form')
  const sections = [...form.querySelectorAll('section')]
  const username = document.querySelector('#username')
  const email = document.querySelector('#email')
  const number = document.querySelector('#number')
  const circles = document.querySelectorAll('.circle')
  const planArticle = document.querySelector('.planArticle')
  const payPer = document.querySelectorAll('.payPer')
  const addArticle = document.querySelector('.addArticle')
  const change = document.querySelector('.change')
  const cardName = document.querySelector('.cardName')
  const summaryCard = document.querySelector('.summaryCard')
  const onTotal = document.querySelector('.onTotal')
  const rate = document.querySelector('.rate')

  // Setting up pages step by step
  let currentStep = sections.findIndex((step) => {
    return step.classList.contains('show')
  })

  const showCurrentStep = () => {
    sections.forEach((step, index) => {
      step.classList.toggle('show', index === currentStep)
    })
    circles.forEach((circle, index) => {
      circle.classList.toggle('active', index === currentStep)
    })
  }
  // setting page info on default
  if (currentStep < 0) {
    currentStep = 0
    showCurrentStep()
  }

  // Section info code starts here
  // checking if field is empty
  const isRequired = (value) => (value === '' ? false : true)

  // Validating Email
  const isEmailValid = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  // Validating Phone Number
  const isPhoneNumberValid = (number) => {
    const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
    return re.test(number)
  }

  // Checking if entered username is valid or not
  const checkUsername = () => {
    let valid = false
    if (!isRequired(username.value.trim())) {
      showError(username, 'This field is required')
    } else {
      showSuccess(username)
      valid = true
    }
    return valid
  }

  // Checking if entered Email is valid or not
  const checkEmail = () => {
    let valid = false
    if (!isRequired(email.value.trim())) {
      showError(email, 'This field is required')
    } else if (!isEmailValid(email.value.trim())) {
      showError(email, 'Email is not valid')
    } else {
      showSuccess(email)
      valid = true
    }
    return valid
  }

  // Checking if entered Phone Number is valid or not
  const checkPhoneNumber = () => {
    let valid = false
    if (!isRequired(number.value.trim())) {
      showError(number, 'This field is required')
    } else if (!isPhoneNumberValid(number.value.trim())) {
      showError(number, 'Phone Number is not valid')
    } else {
      showSuccess(number)
      valid = true
    }
    return valid
  }

  // Show error based on user input
  const showError = (input, message) => {
    const formField = input.parentElement
    formField.classList.remove('success')
    formField.classList.add('fail')
    const error = formField.querySelector('small')
    error.textContent = message
  }

  // Show success based on user input
  const showSuccess = (input) => {
    const formField = input.parentElement
    formField.classList.remove('fail')
    formField.classList.add('success')
    const error = formField.querySelector('small')
    error.textContent = ''
  }
  // End of section info

  // Section Plan starts here
  // Rendering cards to the planArticle based on month and year
  const monthlyDisplayCards = (arr) => {
    let cards = arr.map((card) => {
      return `
        <div class="allPlans" data-plan>
        <img src= ${card.img} alt="" class="img">
        <div class="planItems">
        <h2>${card.category}</h2>
        <span class="value">${card.month}</span>
        </div>
        </div>
        `
    })
    cards = cards.join('')
    planArticle.innerHTML = cards
  }

  const yearlyDisplayCards = (arr) => {
    let cards = arr.map((card) => {
      return `
        <div class="allPlans" data-plan>
        <img src= ${card.img} alt="" class="img">
        <div class="planItems">
        <h2>${card.category}</h2>
        <span class="value">${card.year}</span> </br>
        <span class="discount">${card.discount}</span>
        </div>
        </div>
        </div>
        `
    })
    cards = cards.join('')
    planArticle.innerHTML = cards
  }

  // Show active plan before selection
  const activePlan = () => {
    const allPlans = [...document.querySelectorAll('.allPlans')]
    allPlans[0].classList.add('onPlanActive')
  }

  // click event on selecting plan
  const selectPlan = () => {
    const allPlans = [...document.querySelectorAll('.allPlans')]
    allPlans.forEach((plan) => {
      plan.addEventListener('click', (e) => {
        allPlans.forEach((plan) => plan.classList.remove('onPlanActive'))
        if (e.currentTarget.matches('[data-plan]')) {
          plan.classList.add('onPlanActive')
        }
      })
    })
  }

  // when toggle switch is clicked
  let checkbox = document.querySelector('input[type="checkbox"]')
  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      payPer[1].classList.add('myPlanActive')
      payPer[0].classList.remove('myPlanActive')
      yearlyDisplayCards(planPack)
      activePlan()
      selectPlan()
      selectedYear(addOnsPack)
    } else {
      payPer[0].classList.add('myPlanActive')
      payPer[1].classList.remove('myPlanActive')
      monthlyDisplayCards(planPack)
      activePlan()
      selectPlan()
      selectedMonth(addOnsPack)
    }
  })

  // Section addOns starts here
  // Rendering items to addArticle
  const selectedMonth = (arr) => {
    let products = arr.map((item) => {
      return `
        <div class="items">
        <div class="item">
        <label class="box">
          <input type="checkbox">
          <span class="mark"></span>
        </label>
        <div class="content">
        <h2>${item.name}</h2>
        <p>${item.desc}</p>
      </div>
      </div>
        <span class="price">${item.month}</span>
      </div>
        `
    })
    products = products.join('')
    addArticle.innerHTML = products
  }

  const selectedYear = (arr) => {
    let products = arr.map((item) => {
      return `
          <div class="items">
          <div class="item">
          <label class="box">
            <input type="checkbox">
            <span class="mark"></span>
          </label>
          <div class="content">
          <h2>${item.name}</h2>
          <p>${item.desc}</p>
        </div>
        </div>
          <span class="price">${item.year}</span>
        </div>
          `
    })
    products = products.join('')
    addArticle.innerHTML = products
  }

  // when checkbox is selected show active
  const getCheckBox = () => {
    const items = document.querySelectorAll('.items')
    items.forEach((item) => {
      item.addEventListener('click', (e) => {
        const target = e.currentTarget
        let checkboxItem = target.querySelector('input[type="checkbox"]')
        target.classList.toggle('onActive')
        // check if checkbox is checked
        if (target.classList.contains('onActive')) {
          return (checkboxItem.checked = true)
        } else {
          return (checkboxItem.checked = false)
        }
      })
    })
  }

  // section Summary starts here
  const finishingUpCard = () => {
    const amount = document.querySelector('.amount')
    const allPlans = [...document.querySelectorAll('.allPlans')]
    allPlans.forEach((plan) => {
      if (plan.classList.contains('onPlanActive')) {
        let text = plan.children[1].children[1].innerText.includes('mo')
          ? '(Monthly)'
          : '(Yearly)'
        let duration = plan.children[1].children[1].innerText.includes('mo')
          ? '(per Month)'
          : '(per Year)'
        cardName.textContent = plan.children[1].children[0].innerText + text
        amount.textContent = plan.children[1].children[1].innerText
        onTotal.textContent = 'Total' + duration
      }
    })
  }

  // Rendering card Items
  const selectedAddOnsCard = () => {
    const items = document.querySelectorAll('.items')
    let addOnsArr = []
    items.forEach((item) => {
      const name = item.querySelector('h2').textContent
      const price = item.querySelector('.price').textContent
      if (item.classList.contains('onActive')) {
        addOnsArr.push({ name, price })
      }
    })
    let cardItems = addOnsArr.map((item) => {
      return `
    <p>${item.name}</p>
    <div class="cost">${item.price}</div>
  `
    })
    cardItems = cardItems.join('')
    summaryCard.innerHTML = cardItems
  }

  // store total amount on selection
  const renderTotal = () => {
    let amount = document.querySelector('.amount').textContent
    let value = parseInt(amount.match(/\d+/g))
    let costs = document.querySelectorAll('.cost')
    let costArray = []
    costs.forEach((cost) => {
      costArray.push(parseInt(cost.textContent.match(/\d+/g)))
    })
    let finalCost = costArray.reduce((a, b) => a + b, 0) + value
    let dur = amount.includes('mo') ? 'mo' : 'yo'
    rate.textContent = '+$' + finalCost + '/' + dur
  }

  // if change is clicked go to step 2
  change.addEventListener('click', () => {
    currentStep -= 2
  })

  const showPages = (page) => {
    // let incrementor
    if (page.matches('[data-next]')) {
      // incrementor = 1
      currentStep += 1
    } else if (page.matches('[data-back]')) {
      // incrementor = -1
      currentStep -= 1
    }
    // if (incrementor === null) return
    // const inputs = [username, email, number]
    // const allValid = inputs.every((input) => input.value !== '')
    // checkUsername()
    // checkEmail()
    // checkPhoneNumber()
    // if (allValid) {
    //   currentStep += incrementor
    //   showCurrentStep()
    // }
    const inputs = [username, email, number]
    const allValid = inputs.every((input) => input.value !== '')
    checkUsername()
    checkEmail()
    checkPhoneNumber()
    if (allValid) {
      showCurrentStep()
    }
  }

  form.addEventListener('click', (e) => {
    // aside section
    let step = e.target
    showPages(step)
    // plan section
    selectPlan()
    // addOn section
    getCheckBox()
    //summary section
    finishingUpCard()
    selectedAddOnsCard()
    renderTotal()
  })

  // Show active when content loaded
  window.addEventListener('DOMContentLoaded', () => {
    payPer[0].classList.add('myPlanActive')
    monthlyDisplayCards(planPack)
    selectedMonth(addOnsPack)
    activePlan()
  })
})
