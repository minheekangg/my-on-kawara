class DOMController{
    constructor(){
        this.newDayForm = document.getElementById('add-button')
        console.log(this.newDayForm)
        this.newDayForm.addEventListener('click', this.handleAddDay.bind(this))
    }

    handleAddDay(event){
        const today = new Date()
        console.log(event, today)

    }
}