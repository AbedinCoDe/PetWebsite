

const fetchCategory = async () => {
    const url = "https://openapi.programming-hero.com/api/peddy/categories"
    const res = await fetch(url)
    const data = await res.json()
    displayCategory(data.categories)
}


const displayCategory = (data) => {
    const getPetCategory = document.querySelector('.petCategory');

    data.forEach(element => {
        const newHtml = document.createElement('div');
        newHtml.innerHTML = `
            <div class="mb-10">
                <button class="flex justify-center items-center gap-5 border border-[#0e798154] px-14 py-7 cursor-pointer">
                    <img class="w-12" src=${element.category_icon} > 
                    <h2 class="text-2xl">${element.category}</h2>
                </button>
            </div>
        `
        getPetCategory.appendChild(newHtml)
    });
}






fetchCategory()