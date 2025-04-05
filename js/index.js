

const fetchCategory = async () => {
    const url = "https://openapi.programming-hero.com/api/peddy/categories"
    const res = await fetch(url)
    const data = await res.json()
    displayCategory(data.categories)
    
}


const clearButtonStyle = () => {
    const clearButton = document.getElementsByClassName('btn_Active_Style');
    for(let btn of clearButton){
        btn.classList.remove('active');
    }
}


const likedPet = async (categoryName, id) => {

    fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`)
    .then((res) => res.json())
    .then(data => {
        clearButtonStyle();
        const activeButton = document.getElementById(`btn-${id}`)
        activeButton.classList.add('active');

        displayPetCategory(data.data)
    })
}

 

const displayCategory = (data) => {
    const getPetCategory = document.querySelector('.petCategory');
    // console.log(data)
    data.forEach(element => {
        const newHtml = document.createElement('div');
        
        newHtml.innerHTML = `
            <div class="mb-10">
                <button id="btn-${element.id}" onclick="likedPet('${element.category}', ${element.id})" class="flex justify-center items-center gap-5 border border-[#0e798154] px-14 py-7 cursor-pointer btn_Active_Style">
                    <img class="w-12 h-12" src=${element.category_icon} > 
                    <h2 class="text-2xl">${element.category}</h2>
                </button>
            </div>
        `
        getPetCategory.appendChild(newHtml)
    });
}



const fetchPetCategory = async () => {
    const url = "https://openapi.programming-hero.com/api/peddy/pets"
    const res = await fetch(url)
    const data = await res.json()
    
    displayPetCategory(data.pets)
}

const sortedFunction = async() => {
    const spinner = document.getElementById('overlay-spinner');
    spinner.classList.remove('hidden');
    
    try{
        const url = "https://openapi.programming-hero.com/api/peddy/pets"
        const res = await fetch(url)
        const data = await res.json()

        const getDataByPrice = data.pets;
        
        let sortedPets = getDataByPrice.sort((a, b) => b.price - a.price )

        displayPetCategory(sortedPets)
        
    }catch(err){
        console.error("Error Fetching Pets: ", err);
    }finally{
        spinner.classList.add('hidden');
    }
}

const fetchPetDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/peddy/pet/${id}`
    const res = await fetch(url)
    const data = await res.json()
    loadPetDetails(data.petData)
}


const loadPetDetails = (element) => {
    const getModalBody = document.querySelector('.modal-box');
    getModalBody.innerHTML = `
        <div>
            <figure>
                <img class="w-full" src=${element.image}
                    alt="Shoes" />
            </figure>
            <div class="mt-5 grid grid-cols-2">
                <span class="flex items-center text-[#808080f1]"><img class="w-6 mr-2"
                        src="https://img.icons8.com/?size=100&id=41162&format=png&color=000000"
                        alt="">Breed: ${
                            element.breed === undefined ? `No Breed` : `${element.breed}`
                        }</span>
                <span class="flex items-center text-[#808080f1]"><img class="w-6 mr-2"
                        src="https://img.icons8.com/?size=100&id=O4nOoRjqFf8k&format=png&color=000000"
                        alt="">Birth: ${element.date_of_birth} </span>
                <span class="flex items-center text-[#808080f1]"><img class="w-6 mr-2"
                        src="https://img.icons8.com/?size=100&id=d7ShKrOXVPLz&format=png&color=000000"
                        alt="">Gender: ${element.gender}</span>
                <span class="flex items-center text-[#808080f1]"><img class="w-6 mr-2"
                        src="https://img.icons8.com/?size=100&id=m0I9X3xiNNU1&format=png&color=000000"
                        alt="">Price: ${element.price}</span>
                <span class="flex items-center text-[#808080f1]"><img class="w-6 mr-2"
                        src="https://img.icons8.com/?size=100&id=m0I9X3xiNNU1&format=png&color=000000"
                        alt="">Vaccinated Status: ${element.vaccinated_status}</span>
                        </div>
            <div class="border-b-1 border-[#8080807e] mt-6"></div>

            <div class="">
                    <h3 class="text-xl font-medium mt-5 mb-5">Details Information</h3>    
                    <p>${element.pet_details}</P>
            </div>

            <div class="mt-4">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn w-full">Cancel</button>
                </form>
            </div>
        </div>
    `


    document.getElementById("petDetails").click();
}



const addToGalary = (img) => {
    const getGalaryBody = document.querySelector('.likedItem');
    const newHtml = document.createElement('div');
    newHtml.innerHTML += `
        <div class="">
            <img class="w-40 h-40 object-cover rounded-xl" src=${img}>
        </div>
    `
    getGalaryBody.appendChild(newHtml);
}

const adopted = (btn) => {
    btn.innerText = "Adopted";
    btn.style.backgroundColor = "green";
    btn.style.color = "white";
}



const displayPetCategory = (element) => {
    const getCategoryitemContainer = document.querySelector('.categoryItem');
    getCategoryitemContainer.innerHTML = "";

    if(element.length === 0){
        getCategoryitemContainer.innerHTML = `
            <div class="w-11/12 flex flex-col gap-5 p-20 text-center justify-center items-center mx-auto">
                <img src="images/error.webp">
                <h2 class="text-2xl font-bold">No Information Available</h2>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
                its layout. The point of using Lorem Ipsum is that it has a.</p>
            </div>
        `
        getCategoryitemContainer.classList.remove('grid');
    }else{
        getCategoryitemContainer.classList.add('grid');
    }

    element.forEach((element) => {
        const createDiv = document.createElement('div');
        createDiv.innerHTML = `
        <div class="w-80 h-[420px] p-3">
            <div class="p-3 bg-base-100 shadow-sm">
                <figure>
                    <img src=${element.image}
                        alt="Shoes" />
                </figure>
                <div class="p-3">
                    <h2 class="card-title">${element.pet_name}</h2>
                    <span class="flex items-center"><img class="w-6 mr-2"
                            src="https://img.icons8.com/?size=100&id=41162&format=png&color=000000"
                            alt="">Breed: ${element.breed === undefined ? `No Breed` : `${element.breed}`}</span>
                    <span class="flex items-center"><img class="w-6 mr-2"
                            src="https://img.icons8.com/?size=100&id=O4nOoRjqFf8k&format=png&color=000000"
                            alt="">Birth: ${element.date_of_birth === null ? `No Birth Date` : `${element.date_of_birth}`} </span>
                    <span class="flex items-center"><img class="w-6 mr-2"
                            src="https://img.icons8.com/?size=100&id=d7ShKrOXVPLz&format=png&color=000000"
                            alt="">Gender: ${element.gender}</span>
                    <span class="flex items-center"><img class="w-6 mr-2"
                            src="https://img.icons8.com/?size=100&id=m0I9X3xiNNU1&format=png&color=000000"
                            alt="">Price: ${element.price === null ? `No Price` : `${element.price}`}</span>
                    <div class="card-actions justify-between mt-3">
                        <button onclick="addToGalary('${element.image}')" class="btn bg-white"><img class="w-7"
                                src="https://img.icons8.com/?size=100&id=114150&format=png&color=000000"
                                alt=""></button>
                        <button id="adopted" onclick="adopted(this)" class="btn text-[#0E7A81]">Adopt</button>
                        <button onclick="fetchPetDetails(${element.petId})" class="btn text-[#0E7A81]">Details</button>
                    </div>
                </div>
            </div>
        </div>
        `
        getCategoryitemContainer.appendChild(createDiv);
    })
}








fetchPetCategory()


fetchCategory()