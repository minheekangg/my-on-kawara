document.addEventListener('DOMContentLoaded', () =>{
    console.log('DOM has been loaded')
    console.table(pics)

    const giftList = document.querySelector("#image-list")
    
    showPics = pics => {
        giftList.innerHTML = pics.map(p=> {
            return `<div id="image-card">
            <div id="overlap-container">
            <img data=${p.id} src=${p.image} />
            <div id="day-layover">${p.day}</div>
            </div>
                <button>Edit</button>
            </div>`
        }).join('')
    }
    showPics(pics)

})