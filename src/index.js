document.addEventListener('DOMContentLoaded', () =>{
    console.log('DOM has been loaded')
    console.table(pics)

    const giftList = document.querySelector("#image-list")
    
    showPics = pics => {
        giftList.innerHTML = pics.map(p=> {

            return `<div id="image-card">
            <div id="overlap-single">
                <p >${p.day}</p>
                </div>
                        <div id="overlap-container">
                <img data=${p.id} src=${p.image} />
                <div>${p.day}</div>
                <button>Edit</button>
                </div>
            </div>`

        }).join('')
    }
    showPics(pics)

})