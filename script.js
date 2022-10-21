const formulario = document.querySelector('.formSearch');
formulario.addEventListener('submit', pegaSubmit)

function pegaSubmit(e) {
    e.preventDefault()
    let usuario = e.target.inputSearchUser.value

    if (usuario != '') {
        user(usuario)
        reposUser(usuario)
    }

}


async function user(usuario) {
    const response = await fetch(`https://api.github.com/users/${usuario}`)
    const user = await response.json()
    const titulo = document.querySelector('#titulo-repositorio')
    const dados = document.querySelector('.dados')


    if (response.status === 200 && user.public_repos > 0) {
        dados.style.display = 'flex'
        titulo.innerHTML = `Repositórios!`

        return montaLayoutUser(user)

    } else if (response.status === 200 && user.public_repos === 0) {
        dados.style.display = 'flex'
        titulo.innerHTML = `Repositório do usuário está vazio!`

        return montaLayoutUser(user)

    } else {
        dados.style.display = 'none'
        titulo.innerHTML = `usuário ${usuario} não foi encontrado!`
    }


}

async function reposUser(user) {
    const response = await fetch(`https://api.github.com/users/${user}/repos`)
    const repos = await response.json()
    renderizaRepositorios(repos)
}

async function montaLayoutUser(user) {
    const img = user.avatar_url
    const imgUser = document.querySelector('#imgUser');
    const nomeUser = document.querySelector('#nomeUser');
    const bioUser = document.querySelector('#bio');

    imgUser.src = img
    nomeUser.innerHTML = user.name
    bioUser.innerHTML = user.bio



}


async function renderizaRepositorios(repositorios) {

    const listaRepositorios = document.querySelector('.lista-repositorios')
    const sectionUserDados = document.querySelector('.user-dados')
    const main = document.querySelector('main')

    sectionUserDados.style.display = 'flex'
    main.style.height = '100%'
    listaRepositorios.innerHTML = ''
    repositorios.map(repositorio => {
        return listaRepositorios.innerHTML +=
            `<li><a href="${repositorio.html_url}">${repositorio.name}</a></li> <br>`
    })


}




