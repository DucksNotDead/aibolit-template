const getEl = (id) => document.getElementById(id)

const getNode = (el, node) => el.querySelector(node)

const dataAccess = (e) => {
    e.preventDefault()
    const id = e.target.id.value
    const pass = e.target.pass.value
    setTimeout(() => {
        if (id === 'zachet' && pass === 'avtomatom') e.target.innerHTML = "<strong style='color: dodgerblue'>ДАННЫЕ УСПЕШНО ПОЛУЧЕНЫ. МЫ СКОРО С ВАМИ СВЯЖЕМСЯ.<br>С УВАЖЕНИЕМ, AI BOLIT DIGITAL</strong>"
        else {
            e.target.innerHTML = "<strong style='color: crimson'>ОШИБКА ДОСТУПА. ERR7386</strong>"
            setTimeout(() => {
                e.target.innerHTML = "<strong style='color: crimson'>ПОИСК ОБЬЕКТА /</strong>"
                setTimeout(() => {
                    e.target.innerHTML = "<strong style='color: crimson'>ПОИСК ОБЬЕКТА //</strong>"
                    setTimeout(() => {
                        e.target.innerHTML = "<strong style='color: crimson'>ПОИСК ОБЬЕКТА ///</strong>"
                        setTimeout(() => {
                            e.target.innerHTML = "<strong style='color: crimson'>ПОИСК ОБЬЕКТА ////</strong>"
                            setTimeout(() => {
                                e.target.innerHTML = "<strong style='color: crimson'>ОБЪЕКТ НАЙДЕН /////</strong>"
                                setTimeout(() => {
                                    e.target.innerHTML = "<strong style='color: crimson'>ДОСТУП ЗАПРЕЩЁН. ПРЕДУПРЕЖДЕНИЕ: БЫЛА СОВЕРШЕННА ПОПЫТКА КРАЖИ ДАННЫХ КОРПОРАЦИИ</strong>"
                                }, 250)
                            }, 75)
                        }, 2000)
                    }, 700)
                }, 700)
            }, 1200)
        }
    }, 1500)
}

const toUpperFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const getSections = () => {
    const nodes = getEl('page').childNodes
    const sections = []
    for (let i = 0; i < nodes.length; i++) {
        const el = nodes[i]
        if (el.nodeType === 1) {
            sections.push({
                id: el.id,
                element: el,
                title: getNode(el, 'h2')?.innerText,
            })
        }
    }
    return sections
}

const scrollIntoSection = (id) => {
    location.href = '#' + id
    if (getEl('burger-checkbox').checked) toggleMenu(false)
}

const addToList = (value, listId, upperCase=true) => {
    const list = getEl(listId)
    const item = document.createElement('li')
    const title = !value.title? 'ДОМАШНЯЯ' : value.title.split(' ').length > 1? value.title.split(' ')[1] : value.title
    item.innerText = upperCase? title.toUpperCase() : toUpperFirst(title.toLowerCase())
    item.addEventListener('click', () => scrollIntoSection(value.id))
    list.append(item)
}

const toggleMenu = (e) => {
    const navStyle = getEl('navigation')?.style
    if (e && e.target.checked) {
        navStyle.height = getEl('headerMenuList').clientHeight + 'px'
        navStyle.marginTop = '30px'
    }
    else {
        navStyle.height = 0
        navStyle.marginTop = 0
        if (!e) getEl('burger-checkbox').checked = false
    }
}

const doParallax = (sections) => {
    sections.forEach(section => {
        if (section.id !== 'home') {
            section.element.style.backgroundPositionY = window.scrollY/20 + 'px'
        }
    })
}

window.onload = () => {

    const burger = getEl('burger-checkbox')
    burger.addEventListener('change', toggleMenu)

    const sections = getSections()
    sections.forEach(section => {
        addToList(section, 'headerMenuList')
        addToList(section, 'footerMenuList', false)
    })

    window.onscroll = () => {
        if (burger.checked) toggleMenu(false)
        doParallax(sections)
    }

    getEl('accessForm').onsubmit = (e) => dataAccess(e)

}