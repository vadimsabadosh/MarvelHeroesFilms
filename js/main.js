window.addEventListener('DOMContentLoaded', function () {  
    'use strict';

    const cardList = document.querySelector('.cards-wrap');
    const selectName = document.querySelector('select[id="name"]');
    const selectFilms = document.querySelector('select[id="films"]');
    const selectStatus = document.querySelector('select[id="status"]');
    const selectGender = document.querySelector('select[id="gender"]');
    const form = document.querySelector('#filter-form');

    //Запрос в наш json
    const getData = (callback) => {

        const request  = new XMLHttpRequest();

        request.open('GET', 'database/dbHeroes.json');

        request.addEventListener('readystatechange', () => {
            if(request.readyState !== 4) return;
            if(request.status === 200){
                const response = JSON.parse(request.responseText);

                callback(response);
            }else{
                new Error(request.statusText)
            }
        });

        request.send();

    };
    const proection = (props, item) => Object.keys(item)
    .filter(key  => props.includes(key))
    .reduce((newItem, key) => {
        newItem[key] = item[key]
        return newItem;
    }, {});


    getData(data => {
        const newData = data.map(item => 
            proection(['gender', 'name', 'status', 'movies', 'photo', 'actors'], item));
            generateCards(newData);
            generateSelects(newData);
            filter(newData);
    });


    // Объект со ссылками на фильмы
    const filmsData = {
        'Ant-Man': 'https://rezka.ag/films/fiction/10735-chelovek-muravey-2015.html',
        'Ant-Man and the Wasp': 'https://rezka.ag/films/action/28155-chelovek-muravey-i-osa-2018.html',
        'Avengers: Age of Ultron':'https://rezka.ag/films/fiction/9316-mstiteli-era-altrona-2015.html',
        'Avengers: Endgame' : 'https://rezka.ag/films/fiction/30651-mstiteli-final-2019.html',
        'Avengers: Infinity War': 'https://rezka.ag/films/fiction/27480-mstiteli-voyna-beskonechnosti-2018.html',
        'Black Panther': 'https://rezka.ag/films/fiction/26605-chernaya-pantera-2018.html',
        'Captain America: Civil War' : 'https://rezka.ag/films/fiction/12251-pervyy-mstitel-protivostoyanie-2016.html',
        'Captain America: The First Avenger': 'https://rezka.ag/films/fiction/530-pervyy-mstitel-2011.html',
        'Captain America: The Winter Soldier': 'https://rezka.ag/films/fiction/1603-pervyy-mstitel-drugaya-voyna-2014.html',
        'Captain Marvel': 'https://rezka.ag/films/fiction/30219-kapitan-marvel-2019.html',
        'Doctor Strange': 'https://rezka.ag/films/fantasy/12891-doktor-strendzh-2016.html',
        'Guardians of the Galaxy': 'https://rezka.ag/films/fiction/2031-strazhi-galaktiki-2014.html',
        'Guardians of the Galaxy Vol. 2': 'https://rezka.ag/films/fiction/22867-strazhi-galaktiki-2-2017.html',
        'Iron Man' : 'https://rezka.ag/films/action/242-zheleznyy-chelovek-2008.html',
        'Iron Man 2' : 'https://rezka.ag/films/action/243-zheleznyy-chelovek-2-2010.html',
        'Iron Man 3': 'https://rezka.ag/films/fiction/343-zheleznyy-chelovek-3-2013.html',
        'Spider-Man: Far From Home': 'https://rezka.ag/films/action/31377-chelovek-pauk-vdali-ot-doma-2019.html',
        'Spider-Man: Homecoming': 'https://rezka.ag/films/fiction/23757-chelovek-pauk-vozvraschenie-domoy-2017.html',
        'The Avengers': 'https://rezka.ag/films/fantasy/169-mstiteli-2012.html',
        'The Incredible Hulk': 'https://rezka.ag/films/action/754-neveroyatnyy-halk-2008.html',
        'Thor': 'https://rezka.ag/films/fantasy/88-tor-2011.html',
        'Thor: Ragnarok': 'https://rezka.ag/films/action/25923-tor-ragnarek-2017.html',
        'Thor: The Dark World': 'https://rezka.ag/films/fantasy/1036-tor-2-carstvo-tmy-2013.html'
    }
    ///Генерация карточек
    const generateCards = (data) => {
        
        const threeBounce = document.createElement('div');
        threeBounce.classList.add('sk-three-bounce');
        cardList.append(threeBounce);
        const bounce = document.createElement('div');
        bounce.classList.add('sk-child');
        const bounce2 = bounce.cloneNode(true);
        const bounce3 = bounce.cloneNode(true);
        bounce.classList.add('sk-bounce-1');
        bounce2.classList.add('sk-bounce-2');
        bounce3.classList.add('sk-bounce-3');
        threeBounce.append(bounce);
        threeBounce.append(bounce2);
        threeBounce.append(bounce3);

        const card = document.querySelector('.card');
        if(cardList.contains(card) || cardList.contains(threeBounce)){
            cardList.innerHTML = '';
            cardList.append(threeBounce);
        }else{
            cardList.append(threeBounce);
        }
        
        setTimeout(() => {
            
            cardList.innerHTML = '';
        
            data.forEach(item => {
                const {name, actors, photo, movies, status} = item;
                
                    cardList.insertAdjacentHTML('beforeend', `
                        <div class="card">
                            <img src="./database/${photo}" alt="" class="card-img">
                            <h4>Имя: <span class="card-name">${name}</span></h4>
                            <p>Настоящее имя: <span class="card-realName">${actors}</span></p>
                            <p>Фильмы: <span class="card-films">${movies ? movies.join(', ') : 'Нет'}</span></p>
                            <p>Статус: <span class="card-status">${status === 'alive' ? 'Живой' : 'Мертв'}</span></p>
                        </div>
                    `);
            });
            
        }, 2000);
        
    };


    //Генерация списков
    const generateSelects = (data) => {

        let moviesArr = [];
        
        data.forEach(item => {
            const {name, movies} = item;
            
            moviesArr =  moviesArr.concat(movies);
            selectName.insertAdjacentHTML('beforeend', `<option value="${name}">${name}</option>`);

        });
        const newMovies = [...new Set(moviesArr)];

        newMovies.sort().forEach(item => {

            if(item !== undefined){

                selectFilms.insertAdjacentHTML('beforeend', `<option value="${item}">${item}</option>`);

            };

        });

    };

    //Фильтрация героев

    const filter = (data) => {
        form.addEventListener('change', () => {

            const valName = selectName.options[selectName.selectedIndex].value;
            const valFilm = selectFilms.options[selectFilms.selectedIndex].value;
            const valStatus = selectStatus.options[selectStatus.selectedIndex].value;
            const valGender = selectGender.options[selectGender.selectedIndex].value;
            let array = []; //Сюда будут попадать герои которые подходят по фильтру
            
            if(valName === '' && valFilm === '' && valStatus === '' && valGender === ''){
                    selectName.disabled = false;
                    selectFilms.disabled = false;
                    selectStatus.disabled = false;
                    selectGender.disabled = false;
                 // Если все селекты пустые то рендерим все карточки
                generateCards(data);
            }else if(valName){
                selectFilms.disabled = true;
                selectStatus.disabled = true;
                selectGender.disabled = true;

                //Если выбрали имя героя то проверяем во всем файле его наличие, пушим в пустой массив и выводим на экран
                data.forEach(item => {
                    if(valName === item.name){
                        array.push(item);
                        generateCards(array);
                    }
                });
                
                
            }else if(valFilm){
                selectName.disabled = true;
                selectStatus.disabled = true;
                selectGender.disabled = true;
                //Если выбрали фильм то проверяем во всем файле которые герои в нем снимаются, пушим их в пустой массив и выводим на экран
                data.forEach(item => {
                    if(item.movies){
                        const movies = item.movies;
                        movies.forEach(movie => {
                            if(valFilm === movie){
                                array.push(item);
                                generateCards(array);
                            }
                        });
                    }
                });
            }else if(valStatus){
                selectFilms.disabled = true;
                selectName.disabled = true;
                selectGender.disabled = true;
                //Если выбрали статус героя то проверяем во всем файле у кого есть его наличие, пушим героев в пустой массив и выводим на экран
                data.forEach(item => {
                    if(valStatus === item.status){
                        array.push(item);
                        generateCards(array);
                    }
                });
            }else if(valGender){
                selectFilms.disabled = true;
                selectStatus.disabled = true;
                selectName.disabled = true;
                //Если выбрали пол героя то проверяем во всем файле у кого есть его наличие, пушим героев пустой массив и выводим на экран
                data.forEach(item => {
                    if(valGender === item.gender){
                        array.push(item);
                        generateCards(array);
                    }
                });
            }
        });
    }


    const modal = (card) => {
        
        const body = document.querySelector('body');
        const img = card.querySelector('img').src;
        const cardName = card.querySelector('.card-name').textContent;
        const cardRealName = card.querySelector('.card-realName').textContent;
        const cardFilms = card.querySelector('.card-films').textContent;
        const cardStatus = card.querySelector('.card-status').textContent;
        const modalOverlay = document.createElement('section');
        modalOverlay.classList.add('overlay');

        body.style.overflow = 'hidden';
        modalOverlay.style.opacity = 0;
        modalOverlay.style.display = 'block';

        function fadeIn() {
            let val = parseFloat(modalOverlay.style.opacity);
            if (!((val += .20) > 1)) {
                modalOverlay.style.opacity = val;
                requestAnimationFrame(fadeIn);
            }
        };
        fadeIn();

        modalOverlay.innerHTML =  `
            <div class="container">
                <div class="modal-card">
                    <div class="close-modal">&times</div>
                    <img class="modal-img" src="${img}" alt="">
                    <div class="content">
                        <h4>Имя: <span class="card-name">${cardName}</span></h4>
                        <p>Настоящее имя: <span class="card-realName">${cardRealName}</span></p>
                        <p>Фильмы: <span class="card-films">${cardFilms}</span></p>
                        <p>Статус: <span class="card-status">${cardStatus}</span></p>
                        <div class="wonna_movie">
                            <h4 class="wonna_movie_header">Хотите посмотреть фильм с участием этого героя?</h4>
                            <div class="btn-wrap">
                                <button class="btn btn-yes"><img src="./img/yes.png" alt=""></button>
                                <button class="btn btn-no"><img src="./img/no.png" alt=""></button>
                            </div>
                            <ul class="movies-list">
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;

        body.append(modalOverlay);

        const closebtn = document.querySelector('.close-modal');
        closebtn.addEventListener('click', () => {
            modalOverlay.style.opacity = '';
            modalOverlay.style.display = '';
            modalOverlay.innerHTML = '';
            body.style.overflow = '';
            body.removeChild(modalOverlay);
        });

        const moviesList = document.querySelector('.movies-list');
        
        const moviesArr = cardFilms.split(', ');
        moviesArr.forEach(item => {
            for(let key in filmsData){
                if(item === key){
                    const moviesLi = document.createElement('li');
                    moviesLi.innerHTML = `<a href="${filmsData[key]}" target="_blank" class="movies-list-item">${item}</a>`;
                    moviesList.append(moviesLi);
                }
            }
        });

        const wonnaMovie = document.querySelector('.wonna_movie');
        
        wonnaMovie.addEventListener('click', (e) => {
            let target = e.target;
            console.log("~ target", target);
            
            if(target.closest('.btn-no')){
                wonnaMovie.style.display = 'none';
            }else if(target.closest('.btn-yes')){
                moviesList.style.display = 'block';
            }
            
        });
        
    }
    cardList.addEventListener('click', e => {
        let target = e.target.closest('.card');
        if(target){
            modal(target);
        }
    });
    
});


